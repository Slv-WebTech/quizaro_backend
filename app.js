var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var coursesRouter = require("./routes/courses");
var studentsRouter = require("./routes/students");
var instructorsRouter = require("./routes/instructors");
var adminsRouter = require("./routes/admins");
var adminloginRouter = require("./routes/adminlogin");
var streamRouter = require("./routes/stream");
var certificationRouter = require("./routes/certification");
var instituteRouter = require("./routes/institute");
var languageRouter = require("./routes/language");
var combocourseRouter = require("./routes/combocourse");
var videoRouter = require("./routes/videos");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/courses", coursesRouter);
app.use("/students", studentsRouter);
app.use("/instructors", instructorsRouter);
app.use("/admins", adminsRouter);
app.use("/adminlogin", adminloginRouter);
app.use("/stream", streamRouter);
app.use("/certification", certificationRouter);
app.use("/institute", instituteRouter);
app.use("/language", languageRouter);
app.use("/combocourse", combocourseRouter);
app.use("/videos", videoRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
