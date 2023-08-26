var express = require("express");
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");

router.post("/savestudents", upload.single("image"), function (req, res, next) {
  console.log(req.body);
  console.log(req.file);
  pool.query(
    "insert into students(fname,email,password,mobile,details,collegename,year,address,state,city,country,pincode,youtubeurl,twitterurl,facebookurl,linkedinurl,image)  values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      req.body.fname,
      req.body.email,
      req.body.password,
      req.body.mobile,
      req.body.details,
      req.body.collegename,
      req.body.year,
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
    "update students set courseid=?,instructorid=?,due=?,accesstill=?,offer=?,status=?,enrollment=? where studentid=?",
    [
      req.body.courseid,
      req.body.instructorid,
      req.body.due,
      req.body.accesstill,
      req.body.offer,
      req.body.status,
      req.body.enrollment,
      req.body.studentid,
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

router.post("/deletedata", function (req, res, next) {
  console.log(req.body);
  pool.query("delete  from students where studentid=?", [req.body.studentid], function (error, result) {
    if (error) {
      console.log(error);
      res.status(500).json({ result: false });
    } else {
      res.status(200).json({ result: true });
    }
  });
});

router.get("/allstudents", function (req, res, next) {
  pool.query("select * from students", function (error, result) {
    if (error) {
      res.status(500).json({ result: [] });
    } else {
      res.status(200).json({ result: result });
      
    }
  });
});
router.get("/totalstudents", function (req, res, next) {
  pool.query("select studentid from students order by studentid", function (error, result) {
    if (error) {
      res.status(500).json({ result: [] });
    } else {
      res.status(200).json({ result: result });
    }
  });
});

module.exports = router;
