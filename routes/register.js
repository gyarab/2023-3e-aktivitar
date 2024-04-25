var express = require('express');
var router = express();
var bcrypt = require('bcrypt'); //hashovani hesla
var db=require('../database');
const { v4: uuidv4 } = require('uuid');

const checkValid = require('express-validator')

//validace registru
let validateRegister = [
  checkValid.check("email", "Nevalidní email").isEmail().trim(),

  checkValid.check("password", "Nevhodné heslo. Heslo musí obsahovat alespoň 6 znaků")
  .isLength({ min: 6 }),
];
//aby se mohlo vice uzivatelu jmenovat stejnym jmenem a mohli jsme je rozlisit, tak ke kazdemu jmenu generujeme unikatni string kod
function generateUniqueString() {
  const uuid = uuidv4(); // Generate UUID
  const uniqueString = uuid.replace(/-/g, '').substring(0, 5); 
  return uniqueString;
}

router.post('/', validateRegister, async(req, res) => {
  //ulozi data z textfieldu, pouzivaji se pri insertu do DB 
  try{
    inputData ={
        email: req.body.registerMail,
        name: req.body.firstName,
        password: req.body.registerPass,
        confirm_password: req.body.repeatedPass
    }
  }catch{
    console.log('chybicka')
  }  
  //presvedcime se, ze email jeste neexistuje, jestli neexistuje, nove vytvoreny ucet ulozime do DB 
  var sql='SELECT user_email FROM users WHERE user_email = ?';
  var value = inputData.email;

  //musime osetrit podminky pro validni zadani emailu
  db.query(sql, value, async function (err, result, fields) {
    if(err) throw err
    if(result.length>=1){
      var msg = inputData.email+ " je již registrován!";
      req.flash("errors", msg);
      return res.redirect('/register')
    }else if(inputData.name.includes('#')){
      var msg ="Jméno nesmí obsahovat '#'";
      req.flash("errors", msg);
      return res.redirect('/register')
    }else if(inputData.password.length < 6){
      var msg ="Nevhodné heslo. Heslo musí být alespoň 6 znaků dlouhé";
      req.flash("errors", msg);
      return res.redirect('/register')
    }else if(inputData.confirm_password != inputData.password){
      var msg ="Hesla se neshodují";
      req.flash("errors", msg);
      return res.redirect('/register')

    }else{
      //zahesuje hesla
      const hashPassword = await bcrypt.hash(inputData.password, 10)
      // ulozime data nove vytvoreneho uctu do DB
      const uniqueString = generateUniqueString();
      var sql = "INSERT INTO users (user_nickname,user_email,user_username,user_password) VALUES ('"+inputData.name+"','"+inputData.email+"','"+inputData.name+"#"+uniqueString+"','"+hashPassword+"')";
      db.query(sql, function (err, data) {
        if (err) throw err;
      });
      var msg ="Registrace byla úspěšná";
      req.flash("errors", msg);
      //pouspěšné registraci přesměruj na login
      res.redirect("/login")
    }
  }) 
});

module.exports = router;