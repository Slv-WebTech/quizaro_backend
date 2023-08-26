var express = require("express");
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");

router.post("/saveinstructors", upload.single("image"), function (req, res, next) {
  console.log(req.body);
  console.log(req.file);
  pool.query(
    "insert into instructor(fname,email,password,mobile,details,address,state,city,country,pincode,youtubeurl,twitterurl,facebookurl,linkedinurl,image)  values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      req.body.fname,
      req.body.email,
      req.body.password,
      req.body.mobile,
      req.body.details,
      req.body.address,
      req.body.state,
      req.body.city,
      req.body.country,
      req.body.pincode,
      req.body.youtubeurl,
      req.body.twitterurl,
      req.body.facebookurl,
      req.body.linkedinurl,
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

router.post("/editdata", function (req, res, next) {
  console.log(req.body);
  pool.query(
    "update instructor set courseid=?,accesstill=?,status=?,pending=? where instructorid=?",
    [req.body.courseid,  req.body.accesstill, req.body.status,req.body.pending, req.body.instructorid],
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

router.post("/deletedata", function (req, res, next) {
  console.log(req.body);
  pool.query("delete  from instructor where instructorid=?", [req.body.instructorid], function (error, result) {
    if (error) {
      console.log(error);
      res.status(500).json({ result: false });
    } else {
      res.status(200).json({ result: true });
    }
  });
});
router.get("/allinstructors", function (req, res, next) {
  pool.query("select * from instructor", function (error, result) {
    if (error) {
      res.status(500).json({ result: [] });
    } else {
      res.status(200).json({ result: result });
    }
  });
});
router.get("/totalinstructors", function (req, res, next) {
  pool.query("select instructorid from instructor order by instructorid", function (error, result) {
    if (error) {
      res.status(500).json({ result: [] });
    } else {
      res.status(200).json({ result: result });
    }
  });
});

module.exports = router;
