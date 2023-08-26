var express = require("express");
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");

router.post("/savecourses", upload.single("icon"), function (req, res, next) {
  console.log(req.body);
  console.log(req.file);
  pool.query(
    "insert into courses (stream,coursename,certification,instructorname,language,institute,title,slug,subtitle,description,tag,coursetag,paid,featured,requirements,url,status,duration,instructorrevenue,price,offerprice,offeravailable,assignment,certificate,icon)  values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      req.body.stream,
      req.body.coursename,
      req.body.certification,
      req.body.instructorname,
      req.body.language,
      req.body.institute,
      req.body.title,
      req.body.slug,
      req.body.subtitle,
      req.body.description,
      req.body.tag,
      req.body.coursetag,
      req.body.paid,
      req.body.featured,
      req.body.requirements,
      req.body.url,
      req.body.status,
      req.body.duration,
      req.body.instructorrevenue,
      req.body.price,
      req.body.offerprice,
      req.body.offeravailable,
      req.body.assignment,
      req.body.certificate,
      req.myfilename,
    ],
    function (error, result) {
      if (error) {
        console.log(error);
        res.status(500).json({ result: false });
      } else {
        res.status(200).json({ result: true });
      }
    }
  );
});
router.get("/allcourses", function (req, res, next) {
  pool.query("select * from courses", function (error, result) {
    if (error) {
      res.status(500).json({ result: [] });
    } else {
      res.status(200).json({ result: result });
    }
  });
});
router.get("/totalcourses", function (req, res, next) {
  // pool.query("select count(*) from admins", function (error, result) {
  pool.query("select courseid from courses order by courseid", function (error, result) {
    if (error) {
      res.status(500).json({ result: [] });
    } else {
      res.status(200).json({ result: result });
    }
  });
});

module.exports = router;
