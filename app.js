const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require("body-parser");
const port = 8008;
const app = express();

const modules = require('./my-modules/modules');

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'hbs');

app.engine('hbs', exphbs.engine({
    extname: 'hbs',
    layoutsDir: __dirname + "/views/layouts",
    defaultLayout: 'index'
}))

app.get("/", (req, res) => {
    res.render('blog', {
        blogNav: true
    })
});

app.get("/blog", (req, res) => {
    res.render('blog', {
        blogNav: true
    })
});

app.get("/login", (req, res) => {
    res.render('login', {
        loginNav: true
    })
});

app.post("/login", function (req, res) {
    var username = req.body.uname1;
    var password = req.body.pwd1;

    if (username && password) {

        if(modules.spCheck(username)){
            var userErrorMsg = "Your UserName can't have special characters or spaces!";
            res.render('login', { loginNav: true, UserErrorMsg: userErrorMsg, UserName: username, Password: password });
            }
         else {
            res.render('dashboard', {UserName: username, Password: password});
        }
    } 
    else if (!username && !password){
        var ErrorMsg = "Please enter your username and password!";
        res.render('login', { loginNav: true, ErrorMsg: ErrorMsg});
    }
    
    else {
        if(!username){
            var userErrorMsg = "Please enter your username!";
            res.render('login', { loginNav: true, UserErrorMsg: userErrorMsg, Password: password });
        }

        if(!password){
            var pwdErrorMsg = "Please enter your password!";
            res.render('login', { loginNav: true, PwdErrorMsg: pwdErrorMsg, UserName: username});
        }

    } 
});

app.get("/article", (req, res) => {
    res.render('read_more', {
        articleNav: true
    })
});

app.get("/register", (req, res) => {
    res.render('register', {
        registerNav: true
    })
});

app.post("/register", function (req, res) {
    var fname = req.body.fname1;
    var lname = req.body.lname1;
    var username = req.body.uname2;
    var email = req.body.email1;
    var phone = req.body.phonenum;
    var password = req.body.pwd2;

    var nameErr;
    var unameErr;
    var emailErr;
    var numErr;
    var passErr;


    var registerData = {
        fname: fname,
        lname: lname,
        username: username,
        email: email,
        phone: phone,
        password: password
    }



    var nullErr;
    var keys = Object.keys(registerData);

    // null check
    keys.forEach(key => {
        var value = registerData[key];
        if(!value){
            nullErr = "Please fill out all the fields!";
        }

    })

        keys.forEach(key => {
            var value = registerData[key];
            switch(key){
                case 'fname', 'lname':
                    if(modules.spCheck(value)){
                        nameErr = "Names can not have special characters!";
                    }
                break;
    
                case 'username':
                    if (modules.spCheck(value)){
                        unameErr = "UserNames can not have special characters!";
                    }
                break;
    
                case 'email':
                    if(!(modules.emailCheck(value))){
                        emailErr = "Email is invalid!";
                    }
                break;
    
                case 'phone':
                    if(!modules.phoneCheck(value)){
                        numErr = "Phone number can not have anything but numbers!";
                    }
                break;
    
                case 'password':
                    if(!modules.pwdCheck(value)){
                        passErr = "Password must include at least 1 of the following: uppercase letter, lowercase letter, number and special character";
                    }
                break;
            }
        })

        var Errs = {
            nameErr: nameErr,
            unameErr: unameErr,
            emailErr: emailErr,
            numErr: numErr,
            passErr: passErr
        }
        let falses = 0;
        Object.keys(Errs).forEach(key => {
            if(Errs[key]){
                falses = falses + 1;
            }
        })
        if (falses > 0){

            res.render('register', {registerNav: true, RegData: registerData, Errs: Errs, nullErr});    
        }else{
            res.render('dashboard', {UserName: username});
        }  



});

app.get("*", (req, res) => {
    res.render('404')
});

app.listen(port, ()=>{
    console.log(`LISTENING ON http://localhost:${port}`);
});