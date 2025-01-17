const Listing = require("../models/listing.js");


module.exports.index=async (req,res) => {
    const allListing = await Listing.find({});
    res.render("listings/index" , {allListing});
}

module.exports.renderForm = (req,res) => {
    res.render("listings/new.ejs");
}

module.exports.showListing = async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",populate: {
        path:"author",
    },
}).populate("owner");
    if(!listing){
        req.flash("error" , "Listing you requested for does not exist..!");
        res.redirect("/listings"); 
    }
    console.log(listing);
    res.render("listings/show.ejs" , {listing});
}

module.exports.createLising =  async (req,res ,next) => {
    let url = req.file.path;
    let filename = req.file.filename; 
    let listing = req.body.listing;
    let newlisting = new Listing(listing);
    newlisting.owner = req.user._id;
    newlisting.image = {url,filename};
    await newlisting.save();
    req.flash("success" , "New Listing Created ..!");
    res.redirect("/listings");
}

module.exports.renderEdit = async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error" , "Listing you requested for does not exist..!");
        res.redirect("/listings"); 
    }
    let originalUrlImage = listing.image.url;
    originalUrlImage = originalUrlImage.replace("/upload" , "/upload/w_250");
    res.render("listings/edit.ejs" , {listing , originalUrlImage});
}

module.exports.updateListing = async (req,res) => {
    
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id , {...req.body.listing});
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url,filename};
        await listing.save();
    }
    req.flash("success" , "Listing Updated ..!");
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async(req,res) => {
    let {id} = req.params;
    let deletedlist = await Listing.findByIdAndDelete(id);
    req.flash("success" , " Listing Deleteed ..!");
    console.log(deletedlist);
    res.redirect("/listings");
}