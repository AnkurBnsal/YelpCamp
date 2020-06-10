
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");


function seedDB(){
	
// 	//remove all
	Campground.findByIdAndRemove( "5ed73e1cad2c2204426852ca" ,function(err){
// 		if(err){ console.log("there is an error"); }
// 		console.log("removed");
		
// 		//add
// 		for(var i=0;i<data.length;i++){
// 			Campground.create(data[i],function(err,campground){
// 				if(err){console.log(err);}
// 				else{
// 					console.log("new CG created");
				
// 					Comment.create(
// 					{
// 						text: "This place is great, but I wish there was internet",
// 						author: "Homer"
// 					}, function(err, comment){
// 						if(err){
// 							console.log(err);
// 						} else {
// 							campground.comments.push(comment);
// 							campground.save();
// 							console.log("Created new comment");
// 						}
// 					});
// 				}
// 			});
// 		}
	});	
}

module.exports = seedDB;