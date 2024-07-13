const  express = require("express");
const router = express.Router({mergeParams:true});
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { isLoggedIn,isReviewAuthor,validateReview} = require("../middlewear.js");
const reviewController = require("../controller/review.js");




// Review POST Route :

router.post("/",isLoggedIn, validateReview, wrapAsync(reviewController.createReview));
 
 // Review delete route:
 
 router.delete("/:reviewId",isLoggedIn,isReviewAuthor , wrapAsync(reviewController.destroyReview));

 module.exports = router;