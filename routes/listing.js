const  express = require("express");
const router = express.Router();
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema , reviewSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const {isLoggedIn ,isOwner,validateListing} = require("../middlewear.js");

const listingController = require("../controller/listing.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage});


// index route : 

router.get("/" , wrapAsync(listingController.index));


// New route :

router.get("/new",isLoggedIn, listingController.renderForm );
// show route :

router.get("/:id",wrapAsync( listingController.showListing));


// create route :

 router.post("/", isLoggedIn 
        ,upload.single("listing[image]"),validateListing ,
        wrapAsync(listingController.createLising));

// router.post("/", upload.single('listing[image]'),(req,res) => {
//     res.send(req.file);
// })

// edit route:
router.get("/:id/edit" , isLoggedIn, isOwner, wrapAsync(listingController.renderEdit));

// update route :

router.put("/:id", isLoggedIn, isOwner, upload.single("listing[image]"),validateListing  ,wrapAsync(listingController.updateListing));

// delete route :

router.delete("/:id",isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

module.exports = router;