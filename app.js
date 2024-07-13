const  express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8080;
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const Localstratergy = require("passport-local");
const User = require("./models/user.js");


const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const MONGO_URL ='mongodb://127.0.0.1:27017/wanderlust';


main().then( (res) => {
    console.log("connected to db");
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.engine('ejs' , ejsMate);
app.use(express.static(path.join(__dirname,"public")));


const sessionOption = {
    secret : "mysupersecret",
    resave: false,
    saveUninitialized:true,
    cookie : {
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly:true,
    },
};

// app.get("/" , (req,res) => {
//     res.send("working");
// });

app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new Localstratergy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// app.get("/demouser", async (req,res) => {
//     let fakeUser = new User({
//         email:"ld@gmail.com",
//         username:"ld-student",
//     });

//     let regiUsr = await User.register(fakeUser , "ldsyud");
//     res.send(regiUsr);
// });


app.use("/listings" , listingRouter);
app.use("/listings/:id/reviews" ,reviewRouter);
app.use("/" ,userRouter);


app.all("*" , (res,req,next) => {
    next(new ExpressError(404,"page not found!"));
})


app.use((err,req,res,next) => {
    let{statusCode = 500 ,message = "something went wrong!"} = err;
    res.render("error.ejs", {message});
    // res.send("something went wrong!");
});


app.listen(port , () => {
    console.log(`app is listining on port ${port}`);
})
