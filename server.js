const express = require("express")
const app = express()
const lastSix = require('./routes/getLastSix')
const activities = require('./routes/getActivities');
const bodySetting = require('./routes/getBodySetting')

if(process.env.NODE_ENV !== 'production'){
   require('dotenv').config()
 }

//abych mohl pouzit app.delete() -> logout
const methodOverride = require('method-override')
const flash = require('express-flash')
const session = require('express-session')
const passport = require('passport')

//vezme jmeno slozky, kde mame nase vsechny staticke soubory
app.use(express.static('public'));



//express nam defaultne nedovoli jit do body, musime to povolit 
app.use(express.urlencoded({extended: true}))


//kdyz chceme renderovat html stranku, musime mit view-engine, to je to ejs
// npm i ejs
// stahnout extensions = EJS language support
app.set('view engine','ejs')

//tohle je pro logout
app.use(flash())
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'))

// aby byl user nickname v levem hornim rohu
async function nameOfLoadedUser(){
   const loadName = require("./routes/getUserName");
   var user_username = await loadName.getUser()
   //console.log(user_username)
   return user_username
}

//počet notifikací(žádostí)
async function lengthNoti(){
   let loadReq = require("./routes/handleRequests")
   let arrReq = await loadReq.loadRequest();
   return arrReq.length 
}

//status kody
app.get("/statusCode",(req,res)=>{
    res.status(404).json({message:"Error"})
    console.log("Nelze najit cesta")
})


//zobrazí úvodní stránku
app.get("/",(req,res)=>{
   console.log("rendering file")
   res.render("mainpage", { text: "world" })
})

//zobrazí register
 app.get("/register", checkNotAuthenticated, (req,res)=>{
   res.render("register", {errors: req.flash("errors")})
 })

 //zobrazí login
 app.get("/login", checkNotAuthenticated, (req,res)=>{
   res.render("login", {errors: req.flash("errors")})
 })

//zobrazí přehled
 app.get("/prehled", checkAuthenticated, async (req,res)=>{
   console.log("Prehled was loaded")
   
   //zjisti username a jmeno usera
   const nameUser = await nameOfLoadedUser();
   //posledních šest aktivit
   var arrLastSix = await lastSix.getLastSix();

   //informace pro graf
   const {getDBInfo} = require("./routes/dataGraph");

   //když uživatel přidá aktivitu, tak získejj data pro graf jinak null
   if(arrLastSix.length > 0){
      var lastActivityGraph = await getDBInfo(arrLastSix[0].activ_name)
   }else{
      var lastActivityGraph = [null]
   }
   const dataBody = await bodySetting.getBodySetting();
   //vypocet BMI, zaokrouhleni na dve des. cisla
   var BMI = (dataBody[0].weight/(dataBody[0].height/100)**2);
   BMI = BMI.toFixed(2);
   try {
       //query je asynchroni to muze zpusobit problemy a trvat dlouho => nezobrazi se graf 
      res.format({
         //vzhled
         html: async () => {
           res.render('prehled', {name: nameUser[0], username: nameUser[1], BMI: BMI,notificationsCount: await lengthNoti()}); // Render HTML 
         },
         //posle json soubor 
         json: () => {
          //sem krystofe tech poslednich sest
          res.json({lastSixData:arrLastSix,
            lastActivG: lastActivityGraph
         });
         }
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
   //get last six activities, do res se ulozi 6 poslednich aktivit 
    console.log("SEST POSLEDNICH AKTIVIT");   
})

//zobrazí statistiky
app.get("/statistiky", checkAuthenticated, async(req,res)=>{
   const {getDBInfo} = require("./routes/dataGraph");
   const {getActivName} = require("./routes/getActivityNames")
   const nameUser = await nameOfLoadedUser()
   //jmena všech aktvit
   const activityName = await getActivName()
  
   let activNames = []
   let info = {
      sportG: [],
      foodG: [],
      sleepG:[]
   }
   //pokud daný typ má uživatel přidaný
   //načtou se data pro graf
   if(activityName.cal.length > 0){
      info.foodG.push(await getDBInfo(activityName.cal))
   }
   if(activityName.sleep.length > 0){
      info.sleepG.push(await getDBInfo(activityName.sleep))
   }
   activityName.sport.forEach(element => {
      activNames.push(element)
   });
  
   //pro každé sportovní aktivitu se vytvoří data
   for(let i = 0; i < activNames.length; i++) {
      info.sportG.push(await getDBInfo(activNames[i]))
   }
   //pošle data prohlížeči
   res.format({
      html: async () => {
         res.render("statistiky",  {name: nameUser[0], username: nameUser[1], notificationsCount: await lengthNoti()})
      },
      json: () => {   
        res.json({
         nameAllActiv: activNames,  
         data: info
      }) 
      }
   }); 
})


const {getActivities} = require('./routes/getActivities');

app.get("/historie", checkAuthenticated, async(req,res)=>{
   console.log("Historie was loaded")
   const nameUser = await nameOfLoadedUser()

   var typ_activ = req.query.activtype;

   var arrActiv = await getActivities(typ_activ);
   try {
      //query je asynchroni to muze zpusobit problemy a trvat dlouho => nezobrazi se graf 
     res.format({
        html: async () => {
           res.render('historie', {name: nameUser[0], username: nameUser[1], notificationsCount: await lengthNoti()}); 
       },
        json: () => {
         res.json(arrActiv);
        }
     });
   } catch (err) {
     console.error(err);
     res.status(500).send('Server Error');
   }
})

let savedURL = require("./routes/lastURL")
app.get("/pridatZaznam", checkAuthenticated, async(req,res)=>{ 
   console.log("popupstrankja was loaded")

   const dataBody = await bodySetting.getBodySetting();
   //vypocet BMI, zaokrouhleni na dve des. cisla
   var BMI = (dataBody[0].weight/(dataBody[0].height/100)**2);
   BMI = BMI.toFixed(2);

   const nameUser = await nameOfLoadedUser()

   //Musime ulozit minule url aby fungovalo vraceni nazpatek
   const previousUrl = req.header('Referer') || '/';
   const urlParts = previousUrl.split('/');
   //najdeme vsechny moznosti jak by cesta zpet mohla skoncit
   if (urlParts[urlParts.length - 1] != "pridatZaznam" && 
   urlParts[urlParts.length - 1] != "" && 
    urlParts[urlParts.length - 1] != "pridatZaznam?activtype=sport" && 
    urlParts[urlParts.length - 1] != "pridatZaznam?activtype=call" && 
    urlParts[urlParts.length - 1] != "pridatZaznam?activtype=sleep" && 
    urlParts[urlParts.length - 1] != "pridatZaznam?activtype=book") {
      const lastUrlPart = urlParts[urlParts.length - 1];
      savedURL.setURL(lastUrlPart);
   }if (urlParts[urlParts.length - 1] == "historie" || 
   urlParts[urlParts.length - 1] == "" || 
    urlParts[urlParts.length - 1] == "historie?activtype=sport" || 
    urlParts[urlParts.length - 1] == "historie?activtype=call" || 
    urlParts[urlParts.length - 1] == "historie?activtype=sleep" || 
    urlParts[urlParts.length - 1] == "historie?activtype=book") {
      const lastUrlPart = 'historie';
      savedURL.setURL(lastUrlPart);
   }
   //render popup se vsemi nutnymi promennymi
   res.render("popup",  {name: nameUser[0], username: nameUser[1],BMI: BMI, lastUrlPart: savedURL.getURL(), notificationsCount: await lengthNoti(), pridatSebe:null, heightOutput: dataBody[0].height, weightOutput: dataBody[0].weight,ageOutput: dataBody[0].age})
})
app.get("/zmenaZaznam", checkAuthenticated, async(req,res)=>{ 
   console.log("zmenaPopUp was loaded")
   var log_id = req.query.id;
   const nameUser = await nameOfLoadedUser()

   //aktivita podle id
   var aktivita = await activities.getActivByLogId(log_id);
   console.log(aktivita);
   try {
      //query je asynchroni to muze zpusobit problemy a trvat dlouho => nezobrazi se graf 
     res.format({
        html: async () => {
         res.render("zmenaZaznamuPopUp",  {name: nameUser[0], username: nameUser[1], lastUrlPart: 'historie', notificationsCount: await lengthNoti()})
      },
        json: () => {
         res.json(aktivita);
        }
     });
   } catch (err) {
     console.error(err);
     res.status(500).send('Server Error');
   }
})


//zobrazi pratele
app.get("/pratele", checkAuthenticated, async(req,res)=>{
   console.log("Pratele was loaded")
   const nameUser = await nameOfLoadedUser()
   const searchService = require("./routes/addFriends")
   const friendReqDB = require("./routes/handleRequests")
   const showFriends = require("./routes/showMyFriends")
   try {
      res.format({
         html: async () => {
           res.render('pratele', {name: nameUser[0], username: nameUser[1], pridatSebe:null, notificationsCount: await lengthNoti()}); // Render HTML 
         },
         json: async () => {
            const searchTerm = req.query.term;
            //vzhledávání
            const suggestions = await searchService.search(searchTerm);
            //žádosti
            const friendReq = await friendReqDB.loadRequest();
            //kamarádi
            const myFriends = await showFriends.showMyFriends()
           res.json({
            friends:myFriends,
            request:friendReq,
            search:suggestions
         }); 
         }
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
})


app.get("/nastaveni", checkAuthenticated,async(req,res)=>{
   console.log("Nastaveni was loaded")
   const nameUser = await nameOfLoadedUser()

    //dostanu jakou ma uzivatel vysku, vahu a vek
   //pokud tyto informace jeste nezadal, tak se vrati no data,no data,no data
   const dataBody = await bodySetting.getBodySetting();

   //vypocet BMI, zaokrouhleni na dve des. cisla
   var BMI = (dataBody[0].weight/(dataBody[0].height/100)**2);
   BMI = BMI.toFixed(2);
   res.render("nastaveni",  {name: nameUser[0], username: nameUser[1],heightOutput: dataBody[0].height, weightOutput: dataBody[0].weight,ageOutput: dataBody[0].age, BMI: BMI, notificationsCount: await lengthNoti()})
  

})

app.get('/profile',  checkAuthenticated,async(req,res)=>{
   const nameUser = await nameOfLoadedUser()
   const user_profile = require('./routes/profileFunctions');
   //BIO 
   const bio = await user_profile.getUserBio();

   var bioRespond;

   if(bio==null){
      bioRespond = "Co se vám honí hlavou";
   }else{
      bioRespond = bio[0].bio; //nacteme bio
   } 
   
   res.render('profile', {name: nameUser[0], username: nameUser[1], bio: bioRespond, notificationsCount: await lengthNoti()}); // Render HTML 
})

const user_profile = require('./routes/profileFunctions');
app.get('/friendProfile', async(req,res)=>{

   const nameUser = await nameOfLoadedUser()
   
   //Friend username
   const friendName = req.query.friendName.replace(/,/g,'#');
   
   //BIO jestli bio neexistuje tak napis ze neni
   const bio = await user_profile.getFriendBio(friendName);
   
   var bioRespond;
   
   if(bio==null){
     bioRespond = "Tento uživatel nemá vytvořené bio";
   }else{
     bioRespond = bio[0].bio;
   } 
   
   //LASTSIX
   var arrFriendsLastSix = await lastSix.getFriendsLastSix(friendName);

   //graf
   const {getDBInfo} = require("./routes/dataGraph");
   var lastActivityGraph = await getDBInfo(arrFriendsLastSix[0].activ_name)
   
   try {
      //query je asynchroni to muze zpusobit problemy a trvat dlouho => nezobrazi se graf 
     res.format({
        html: async () => {
           res.render('friendProfile', {name: nameUser[0], username: nameUser[1], bio: bioRespond, friendName: friendName, notificationsCount: await lengthNoti()}); // Render HTML
       },
        json: () => {
         res.json({lastSixData:arrFriendsLastSix,
            lastActivG: lastActivityGraph});
        }
     });
   } catch (err) {
     console.error(err);
     res.status(500).send('Server Error');
   }
       
   })


//register
const registerRouter = require("./routes/register")
app.use('/register', registerRouter)

//nastaveni
const nastaveniRouter = require("./routes/nastaveni")
app.use('/nastaveni', nastaveniRouter)

const profileRouter = require("./routes/profile")
app.use('/profile', profileRouter)



const pridatZRouter = require("./routes/pridatZaznam")
app.use('/pridatZaznam', pridatZRouter)

const zmenaZRouter = require("./routes/zmenaZaznam")
app.use('/zmenaZaznam', zmenaZRouter)




//kontroluje jestli je nekdo prihlasen
const localPass = require('./routes/passport-config')
localPass.initialize();
//login
const loginRouter = require("./routes/login")
app.use('/login', loginRouter.router)

//friends
const addFRouter = require("./routes/addFriends")
app.use('/pratele', addFRouter.router)

//odhlášní
app.delete('/logout', (req, res) => {
   req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
   });
});

//kontroluuje jestli uzivatel je prihlasen nebo ne
function checkAuthenticated(req, res, next) {
   const userName = require('./routes/userID')
   if (!req.isAuthenticated()) {
     return res.redirect('/login');
   }
   userName.setUser(req.user.user_id)
   next();
 }
 
 // Tohle se ještě musí přidat na post register a post login
 function checkNotAuthenticated(req, res, next) {
   if (req.isAuthenticated()) {
     return res.redirect('/prehled');
   }
   next();
 }
//vrati url - da se napsat i do users.js a bude platit jen tam, tady plati vesmes vsude
function logger(req, res, next){
    console.log(req.originalUrl)
    next()
}

//app posloucha na portu 
app.listen(3000)
