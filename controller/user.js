const User = require("../models/user.js");


module.exports.signupForm =  (req,res) =>{
    res.render("users/signup.ejs");
}

module.exports.signinForm = async(req,res) => {
    try{
      let {username,email,password} = req.body;
      let newUser = new User({username,email});
      let registeredUser = await User.register(newUser,password);
      console.log(registeredUser);
      req.login(registeredUser,(err) => {
        if(err){
          return next(err);
        }
        req.flash("success", "Welcome to WanderLust..!");
        res.redirect("/listings");
      });
     
    }catch(error){
      req.flash("error",error.message);
      res.redirect("/signup");
    }
  
}

module.exports.loginForm =  (req,res) => {
    res.render("users/login.ejs");
}

module.exports.login = async(req,res) =>{
    req.flash("success" , "Welcome back to WanderLust");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logout =  (req,res,next) =>{
    req.logOut((err) => {
      if(err){
        return next(err);
      }
      req.flash("success", "You are logged out..!");
      res.redirect("/listings");
    });
  }