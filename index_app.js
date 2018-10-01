const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const session = require("express-session");
const cfenv = require('cfenv');
const SelfServiceManager = require("bluemix-appid").SelfServiceManager;
const WebAppStrategy = require("bluemix-appid").WebAppStrategy;
const ApiStrategy = require("bluemix-appid").APIStrategy;
const userProfileManager = require("ibmcloud-appid").UserProfileManager;

const app = express();
userProfileManager.init();

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

const webAppStrategy = new WebAppStrategy({
	tenantId: "01b9184b-952b-4876-9d90-ce1c952d7be4",
	clientId: "c427a463-f0d4-4e7a-a155-4cf93c2b021f",
	secret: "MDY1YjY3YmQtZTQxNy00MTEyLWJhNDEtNmE3ZDZmOGQyN2Rh",
	oauthServerUrl: "https://appid-oauth.eu-gb.bluemix.net/oauth/v3/01b9184b-952b-4876-9d90-ce1c952d7be4",
	redirectUri: "http://localhost:3000" + CALLBACK_URL
});
const apiStr = new ApiStrategy({
    oauthServerUrl: "https://appid-oauth.eu-gb.bluemix.net/oauth/v3/01b9184b-952b-4876-9d90-ce1c952d7be4",
}) 
const selfServiceManager = new SelfServiceManager({
	tenantId: '01b9184b-952b-4876-9d90-ce1c952d7be4',
	iamApiKey: 'ezPPYbpd0JOpMhpB9JzaGYrPYVq4PLdrwXkwHGmM90HF',
	oauthServerUrl: 'https://appid-oauth.eu-gb.bluemix.net/oauth/v3/01b9184b-952b-4876-9d90-ce1c952d7be4',
	managementUrl: 'https://appid-management.eu-gb.bluemix.net/management/v4/01b9184b-952b-4876-9d90-ce1c952d7be4'});


//var RedisStore = require('connect-redis')(session);
app.set('view engine', 'ejs');
app.use(session({
	secret: "123456",
	resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// Configure express application to use passportjs
app.use(passport.initialize());
app.use(passport.session());

passport.use(apiStr);
passport.use(webAppStrategy);
passport.serializeUser(function(user, cb) {
    cb(null, user);
});
passport.deserializeUser(function(obj, cb) {
	cb(null, obj);
});


app.post("/login", passport.authenticate(WebAppStrategy.STRATEGY_NAME, {
	successRedirect: CALLBACK_URL,
	failureRedirect: ROP_LOGIN_PAGE_URL,
	failureFlash : true // allow flash messages
}));


app.post('/refreshToken', (req, res) => {
	if(req.session[WebAppStrategy.AUTH_CONTEXT]) {
		res.send('its ok');
	} else {
		webAppStrategy.refreshTokens(req, req.body.refreshToken).finally(function() {
			console.log(req.session.APPID_AUTH_CONTEXT);
			console.log(req.session.APPID_AUTH_CONTEXT.accessToken);
			console.log(req.session.APPID_AUTH_CONTEXT.identityToken);
			console.log(req.session.APPID_AUTH_CONTEXT.refreshToken);
			
			res.send({accessToken: req.session.APPID_AUTH_CONTEXT.accessToken,
				identityToken: req.session.APPID_AUTH_CONTEXT.identityToken,
				refreshToken: req.session.APPID_AUTH_CONTEXT.refreshToken});
		});
	}
	
});

app.get(CALLBACK_URL,  (req, res) => {
    console.log(req.session.APPID_AUTH_CONTEXT);
    console.log(req.session.APPID_AUTH_CONTEXT.accessToken);
	console.log(req.session.APPID_AUTH_CONTEXT.identityToken);
	console.log(req.session.APPID_AUTH_CONTEXT.refreshToken);
    
	res.send({accessToken: req.session.APPID_AUTH_CONTEXT.accessToken,
		identityToken: req.session.APPID_AUTH_CONTEXT.identityToken,
		refreshToken: req.session.APPID_AUTH_CONTEXT.refreshToken});
});

app.get(LOGOUT_URL, function(req, res){
	WebAppStrategy.logout(req);
	req.logout();
	res.send('Logout Done');	
});

app.get("/protected", passport.authenticate(ApiStrategy.STRATEGY_NAME, {session: false}), function(req, res) {
    console.log("/protected");
	res.json(req.user);
});

app.post("/getUserDetails", passport.authenticate(ApiStrategy.STRATEGY_NAME, {session: false}), (req, res) => {
	userProfileManager.userProfilesServerUrl
});



/****Un-used API*** 
 * 
// Explicit login endpoint. Will always redirect browser to login widget due to {forceLogin: true}.
// If forceLogin is set to false redirect to login widget will not occur of already authenticated users.
app.get(LOGIN_URL, passport.authenticate(WebAppStrategy.STRATEGY_NAME, {
	successRedirect: LANDING_PAGE_URL,
	forceLogin: true
}));

app.get(ROP_LOGIN_PAGE_URL, function(req, res) {
	// render the page and pass in any flash data if it exists
	res.render("login.ejs", { message: req.flash('error') });
});

// Explicit sign up endpoint. Will always redirect browser to sign up widget screen.
// default value - false
app.get(SIGN_UP_URL, passport.authenticate(WebAppStrategy.STRATEGY_NAME, {
	successRedirect: LANDING_PAGE_URL,
	show: WebAppStrategy.SIGN_UP
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

 * 
*/

var port = process.env.PORT || 3000;

app.listen(port, function(){
	//logger.info("Listening on http://localhost:" + port + "/web-app-sample.html");
});