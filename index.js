const express = require("express");
require("./services/passport");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
require("./models/User");
require("./models/Asset");
require("./models/Status");
require("./models/Brand");
require("./models/AssetType");
require("./models/Location");
require("./models/Branch");
require("./services/passport")(passport);
//require("./services/mongoImport")();
//test
mongoose.connect(keys.mongoURI);
const app = new express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    secret: "work hard",
    resave: true,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

require("./routes/mainRoute")(app, passport);
require("./routes/assetRoutes")(app);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
