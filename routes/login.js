
const express = require('express');
const router = express();
const bcrypt = require('bcrypt'); //hashovani hesla
const db = require('../database');


const passport = require('passport')

const checkValid = require('express-validator');//kontroluje heslo a email hodne ulehci praci
const { getUser } = require('./getUserName');

let handleLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
      //zkontroluje zda uzivatel existuje
      let user = await findUserByEmail(email);
      if (user) {
          //overi heslo
          await bcrypt.compare(password, user.user_password).then((isMatch) => {
              if (isMatch) {
                  console.log(user)
                  resolve(user);
                  console.log('great success')
              } else {
                  reject(`Zadané heslo není správně`);
              }
          });
      } else {
          reject(`Tento email "${email}" neexistuje`);
      }
  });
};

//najde uzivatele podle emailu
let findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    try {
      db.query(
        'SELECT * FROM `users` WHERE `user_email` = ?',
        [email], 
        function (err, rows) {
          if (err) {
            reject(err);
          }
          if (rows && rows.length > 0) {
            let user = rows[0];
            resolve(user);
          } else {
            resolve(null); 
          }
        }
      );
    } catch (err) {
      reject(err);
    }
  });
};
//najde uzivatele podle id
let findUserById = (id) => {
  return new Promise((resolve, reject) => {
      try {
          db.query(
              ' SELECT * FROM `users` WHERE `user_id` = ?  ', id,
              function(err, rows) {
                  if (err) {
                      reject(err)
                  }
                  let user = rows[0];
                  resolve(user);
              }
          );
      } catch (err) {
          reject(err);
      }
  });
};
//porovnani hesel
let comparePassword = (password, userObject) => {
  return new Promise(async (resolve, reject) => {
      try {
          await bcrypt.compare(password, userObject.user_password).then((isMatch) => {
              if (isMatch) {
                  resolve(true);
              } else {
                  resolve(`Zadané heslo není správně`);
              }
          });
      } catch (e) {
          reject(e);
      }
  });
};

let loginAction = async(req, res) => {
  let errorsArr = [];
  //zkontroluje validatory
  let validationErrors = checkValid.validationResult(req);
  
  if (!validationErrors.isEmpty()) {
    let errors = Object.values(validationErrors.mapped());
    errors.forEach((item) => {
      errorsArr.push(item.msg);
    });
    req.flash("errors", errorsArr);
    return res.redirect("/");
  }

  try {
    // počká až skončí hanleLogin
    let user = await handleLogin(req.body.loginMail, req.body.loginPass);

    // Pokud handleLogin nmá errory přesměruje na "/prehled"
    return res.redirect("/prehled");
  } catch (err) {
    // Pokud jsou errory vratí zpátky na "/login"
    req.flash("errors", err);
    
    return res.redirect("/login");
  }
}


//podle toho jak authentikace skončí tak to přesměruje
router.post('/', passport.authenticate("local", {
  successRedirect: "/prehled",
  failureRedirect: "/login",
  successFlash: true,
  failureFlash: true
}), loginAction);

module.exports = {
  router: router,
  findUserByEmail: findUserByEmail,
  comparePassword: comparePassword,
  findUserById:findUserById
}
