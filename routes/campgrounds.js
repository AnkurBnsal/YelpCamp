var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

router.get("/",function(req,res){
	
	Campground.find({},function(err,allcampgrounds){
		if(err){ console.log("Something went wrong") }
		else{
			res.render("campgrounds/index", {arr:allcampgrounds});
		}
	});
});


//add camp
router.post("/", middleware.isLoggedIn, function(req,res){
	// res.send("You hit the post route");
	
	req.body.campground.author = {
		id: req.user._id ,
		username: req.user.username
	};
	
	req.body.campground.booking = {
    	start: req.body.campground.start,
    	end: req.body.campground.end
  	};
	req.body.campground.tags = req.body.campground.tags.split(",") ;
	
	Campground.create( req.body.campground , function(err,newcamp){
		if(err){ console.log(err); }
		else{ res.redirect("/campgrounds"); }
	});
});

// NEW
router.get("/new", middleware.isLoggedIn,  function(req,res){
	res.render("campgrounds/new");
});

// SHOW
router.get("/:id",function(req,res){
	
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err){ console.log(err); }
		else{ res.render("campgrounds/show", {Campground: foundCampground } ); }
	});
});

// EDIT
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req,res){
		
	Campground.findById(req.params.id, function(err,foundCampground){
		res.render("campgrounds/edit",{campground: foundCampground});
	});
});

// UPDATE
router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){
	
	req.body.campground.booking = {
    	start: req.body.campground.start,
    	end: req.body.campground.end
  	};
	req.body.campground.tags = req.body.campground.tags.split(",") ;
	
	Campground.findByIdAndUpdate( req.params.id, req.body.campground, function(err, updatedCamp){
		if(err){
			res.redirect("/campgrounds");
		}
		else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	});	
});

// DESTROY
router.delete("/:id", middleware.checkCampgroundOwnership,  function(req,res){
	
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){ res.redirect("/campgrounds"); }
		else{
			req.flash("success","Campground deleted..");
			res.redirect("/campgrounds"); 
		}
	});
});

module.exports = router;