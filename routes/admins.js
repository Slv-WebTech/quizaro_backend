var express = require("express");
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");

router.post("/saveadmins", upload.single("image"), function (req, res, next) {
  console.log(req.body);
  console.log(req.file);
  pool.query(
    "insert into admins(fname,email,password,mobile,details,address,state,city,country,pincode,youtubeurl,twitterurl,facebookurl,linkedinurl,image)  values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
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
  pool.query("update admins set email=?,password=? where adminid=?", [req.body.email, req.body.password, req.body.adminid], function (error, result) {
    if (error) {
      console.log(error);
      res.status(500).json({ result: false });
    } else {
      res.status(200).json({ result: true });
    }
  });
});

router.post("/deletedata", function (req, res, next) {
  console.log(req.body);
  pool.query("delete  from admins where adminid=?", [req.body.adminid], function (error, result) {
    if (error) {
      console.log(error);
      res.status(500).json({ result: false });
    } else {
      res.status(200).json({ result: true });
    }
  });
  npm;
});
router.get("/alladmins", function (req, res, next) {
  pool.query("select * from admins", function (error, result) {
    if (error) {
      res.status(500).json({ result: [] });
    } else {
      res.status(200).json({ result: result });
    }
  });
});
router.get("/totaladmins", function (req, res, next) {
  // pool.query("select count(*) from admins", function (error, result) {
  pool.query("select adminid from admins order by adminid", function (error, result) {
    if (error) {
      res.status(500).json({ result: [] });
    } else {
      res.status(200).json({ result: result });
    }
  });
});

module.exports = router;
