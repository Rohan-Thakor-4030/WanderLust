const  express = require("express");
const router = express.Router();
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema , reviewSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const {isLoggedIn ,isOwner,validateListing} = require("../middlewear.js");

const listingController = require("../controller/listing.js");


// index route : 

router.get("/" , wrapAsync(listingController.index));


// New route :

router.get("/new",isLoggedIn, listingController.renderForm );
// show route :

router.get("/:id",wrapAsync( listingController.showListing));


// create route :

router.post("/",validateListing , isLoggedIn,wrapAsync(listingController.createLising));

// edit route:
router.get("/:id/edit" , isLoggedIn, isOwner, wrapAsync(listingController.renderEdit));

// update route :

router.put("/:id", isLoggedIn, isOwner,validateListing  ,wrapAsync(listingController.updateListing));

// delete route :

router.delete("/:id",isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

module.exports = router;