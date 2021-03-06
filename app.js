var express 	= require("express"),
	app 		= express(),
	BodyPareser = require("body-parser"),
	mongoose 	= require("mongoose"),
	flash		= require("connect-flash"),
	Campground 	= require("./models/campground"),
	seedDB 		= require("./seeds"),
	Comment		= require("./models/comment"),
	User 		= require("./models/user"),
	passport	= require("passport"),
	LocalStrategy = require("passport-local"),
	methodOverride= require("method-override") ;

var commentRoutes 	 = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes  	 = require("./routes/index");

// seedDB();
// mongoose.connect("mongodb://localhost:27017/yelp_camp", {
// 	useUnifiedTopology: true,
// 	useNewUrlParser: true,
// 	useFindAndModify: false
// });

// mongodb+srv://Ankur:<pass>@cluster-raixn.mongodb.net/<yelp_camp>?retryWrites=true&w=majority
mongoose.connect("mongodb+srv://Ankur:pass@cluster-raixn.mongodb.net/yelp_camp?retryWrites=true&w=majority", {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useFindAndModify: false
});

app.use(BodyPareser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//Passport config
app.use(require("express-session")({
	secret: "Secret page",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use(indexRoutes);
app.use( "/campgrounds", campgroundRoutes);
app.use( "/campgrounds/:id/comments", commentRoutes);


//server
app.listen( process.env.PORT || 3000, process.env.ID, function(){
	console.log("YelpCamp server has started");
});
