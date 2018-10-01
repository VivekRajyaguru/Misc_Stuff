const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();

const SelfServiceManager = require("bluemix-appid").SelfServiceManager;
const WebAppStrategy = require("bluemix-appid").WebAppStrategy;

// Below URLs will be used for App ID OAuth flows
const LANDING_PAGE_URL = "/web-app-sample.html";
const LOGIN_URL = "/ibm/bluemix/appid/login";
const SIGN_UP_URL = "/ibm/bluemix/appid/sign_up";
const CHANGE_PASSWORD_URL = "/ibm/bluemix/appid/change_password";
const CHANGE_DETAILS_URL = "/ibm/bluemix/appid/change_details";
const FORGOT_PASSWORD_URL = "/ibm/bluemix/appid/forgot_password";
const LOGIN_ANON_URL = "/ibm/bluemix/appid/loginanon";
const CALLBACK_URL = "/ibm/bluemix/appid/callback";
const LOGOUT_URL = "/ibm/bluemix/appid/logout";
const ROP_LOGIN_PAGE_URL = "/ibm/bluemix/appid/rop/login";

let webAppStrategy = new WebAppStrategy({
	tenantId: "01b9184b-952b-4876-9d90-ce1c952d7be4",
	clientId: "c427a463-f0d4-4e7a-a155-4cf93c2b021f",
	secret: "MDY1YjY3YmQtZTQxNy00MTEyLWJhNDEtNmE3ZDZmOGQyN2Rh",
	oauthServerUrl: "https://appid-oauth.eu-gb.bluemix.net/oauth/v3/01b9184b-952b-4876-9d90-ce1c952d7be4",
	redirectUri: "http://localhost:3000" + CALLBACK_URL
});

app.set('view engine', 'ejs');
app.use(session({
	secret: "123456",
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(express.static(__dirname ));
// Configure express application to use passportjs
app.use(passport.initialize());
app.use(passport.session());

passport.use(webAppStrategy);
passport.serializeUser(function(user, cb) {
	cb(null, user);
});
passport.deserializeUser(function(obj, cb) {
	cb(null, obj);
});


// Explicit login endpoint. Will always redirect browser to login widget due to {forceLogin: true}.
// If forceLogin is set to false redirect to login widget will not occur of already authenticated users.
app.get(LOGIN_URL, passport.authenticate(WebAppStrategy.STRATEGY_NAME, {
	successRedirect: LANDING_PAGE_URL,
	forceLogin: true
}));

// Explicit forgot password endpoint. Will always redirect browser to forgot password widget screen.
app.get(FORGOT_PASSWORD_URL, passport.authenticate(WebAppStrategy.STRATEGY_NAME, {
	successRedirect: LANDING_PAGE_URL,
	show: WebAppStrategy.FORGOT_PASSWORD
}));

// Explicit change details endpoint. Will always redirect browser to change details widget screen.
app.get(CHANGE_DETAILS_URL, passport.authenticate(WebAppStrategy.STRATEGY_NAME, {
	successRedirect: LANDING_PAGE_URL,
	show: WebAppStrategy.CHANGE_DETAILS
}));

// Explicit change password endpoint. Will always redirect browser to change password widget screen.
app.get(CHANGE_PASSWORD_URL, passport.authenticate(WebAppStrategy.STRATEGY_NAME, {
	successRedirect: LANDING_PAGE_URL,
	show: WebAppStrategy.CHANGE_PASSWORD
}));

// Explicit sign up endpoint. Will always redirect browser to sign up widget screen.
// default value - false
app.get(SIGN_UP_URL, passport.authenticate(WebAppStrategy.STRATEGY_NAME, {
	successRedirect: LANDING_PAGE_URL,
	show: WebAppStrategy.SIGN_UP
}));



// Callback to finish the authorization process. Will retrieve access and identity tokens/
// from App ID service and redirect to either (in below order)
// 1. the original URL of the request that triggered authentication, as persisted in HTTP session under WebAppStrategy.ORIGINAL_URL key.
// 2. successRedirect as specified in passport.authenticate(name, {successRedirect: "...."}) invocation
// 3. application root ("/")
app.get(CALLBACK_URL,  (req, res) => {
    console.log(req.session.APPID_AUTH_CONTEXT);
    console.log(req.session.APPID_AUTH_CONTEXT.accessToken);
    console.log(req.session.APPID_AUTH_CONTEXT.identityToken);
    
    res.send({accessToken: req.session.APPID_AUTH_CONTEXT.accessToken, identityToken: req.session.APPID_AUTH_CONTEXT.identityToken});
});

// Logout endpoint. Clears authentication information from session
app.get(LOGOUT_URL, function(req, res){
	WebAppStrategy.logout(req);
	res.redirect(LANDING_PAGE_URL);
});

function storeRefreshTokenInCookie(req, res, next) {
	const refreshToken = req.session[WebAppStrategy.AUTH_CONTEXT].refreshToken;
	if (refreshToken) {
		/* An example of storing user's refresh-token in a cookie with expiration of a month */
		res.cookie("refreshToken", refreshToken, {maxAge: 1000 * 60 * 60 * 24 * 30 /* 30 days */});
	}
	next();
}

function isLoggedIn(req) {
	return req.session[WebAppStrategy.AUTH_CONTEXT];
}

// Protected area. If current user is not authenticated - redirect to the login widget will be returned.
// In case user is authenticated - a page with current user information will be returned.
app.get("/protected", function tryToRefreshTokenIfNotLoggedIn(req, res, next) {
	if (isLoggedIn(req)) {
		return next();
	}

	webAppStrategy.refreshTokens(req, req.cookies.refreshToken).finally(function() {
		next();
	});
}, passport.authenticate(WebAppStrategy.STRATEGY_NAME), storeRefreshTokenInCookie, function(req, res) {
	// logger.debug("/protected");
	res.json(req.user);
});

app.post("/rop/login/submit", bodyParser.urlencoded({extended: false}), passport.authenticate(WebAppStrategy.STRATEGY_NAME, {
	successRedirect: CALLBACK_URL,
	failureRedirect: ROP_LOGIN_PAGE_URL,
	failureFlash : true // allow flash messages
}));

app.get(ROP_LOGIN_PAGE_URL, function(req, res) {
	// render the page and pass in any flash data if it exists
	res.render("login.ejs", { message: req.flash('error') });
});

var port = process.env.PORT || 3000;

app.listen(port, function(){
	//logger.info("Listening on http://localhost:" + port + "/web-app-sample.html");
});