const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();

const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("connected!");
  })
  .catch(err => {
    console.log(err);
  });

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

app.use(
  session({
    secret: "secret squirell",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true
  })
);

// In app.js make sure you serve static react files:

app.use(express.static(path.join(__dirname, "build")));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const authRouter = require("./routes/authRoutes");
app.use("/api/auth", authRouter);

const uploadRoute = require("./routes/uploadRoute");
const protectedRoute = require("./routes/protectedRoute");
app.use("/api/upload", protectedRoute, uploadRoute);

const usersRouter = require("./routes/usersRoute");
app.use("/api/users", usersRouter);

const placesRouter = require("./routes/placesRoute");
app.use("/api", protectedRoute, placesRouter);

const getFavouritePlaces = require("./routes/getFavouritePlaces");
app.use("/api/getFavouritePlaces", protectedRoute, getFavouritePlaces);
const yelpProxy = require("./routes/yelpProxy");
app.use("/yelpProxy", yelpProxy);

// After all your other routes add the following code to always serve your react app.

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
