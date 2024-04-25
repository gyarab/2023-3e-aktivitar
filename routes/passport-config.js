//strategie passport config je local, protože používáme vlastní db
const LocalStrategy  = require('passport-local').Strategy
const passport = require('passport')
const loginService = require('./login')

//inicializace
function initialize(){
    passport.use(new LocalStrategy({
        usernameField: 'loginMail',
        passwordField: 'loginPass',
        passReqToCallback: true
    },
    async (req, email, password, done) => {
        try {
            await loginService.findUserByEmail(email).then(async (user) => {
                if (!user) {
                    //pokud nenajde usera napise email neexistuje
                    return done(null, false, req.flash("errors", `This user email "${email}" doesn't exist`));
                }
                if (user) {
                    //poorvná helsa
                    let match = await loginService.comparePassword(password, user);
                    if (match === true) {
                        return done(null, user, null)
                    } else {
                        return done(null, false, req.flash("errors", match)
                        )
                    }
                }
            });
        } catch (err) {
            console.log(err);
            return done(null, false, { message: err });
        }
    }));

    //
    passport.serializeUser((user, done) => {
        //vrati usera s userID
       return done(null, user.user_id);
    });

    passport.deserializeUser((id, done) => {
        loginService.findUserById(id)
        .then((user) => {
        if (!user) {
            //když nenajde usera vrati zpravu
            return done(null, false, { message: 'User not found' });
        }
      
        return done(null, user);
        })
        .catch((error) => {
      
        return done(error, null);
        });
    });
};


module.exports = {initialize:initialize}