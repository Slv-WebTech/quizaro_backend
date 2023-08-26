var express = require("express");
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");

router.post("/coursevideo", upload.single("icon"), function (req, res, next) {
  console.log(req.body);
  console.log(req.file);
  pool.query(
    "insert into video(streamid,courseid,instructorid,language,title,description,duration,url,icon)  values(?,?,?,?,?,?,?,?,?)",
    [
      req.body.streamid,
      req.body.courseid,
      req.body.instructorid,
      req.body.language,
      req.body.title,
      req.body.description,
      req.body.duration,
      req.body.url,
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

router.get("/allvideos", function (req, res, next) {
  pool.query("select * from video", function (error, result) {
    if (error) {
      res.status(500).json({ result: [] });
    } else {
      res.status(200).json({ result: result });
    }
  });
});

module.exports = router;
