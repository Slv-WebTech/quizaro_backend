var express = require("express");
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");

router.post("/savestream", upload.single("icon"), function (req, res, next) {
  console.log(req.body);
  console.log(req.file);
  pool.query("insert into stream(streamname,icon)  values(?,?)", [req.body.stream, req.myfilename], function (error, result) {
    if (error) {
      console.log(error);
      res.status(500).json({ result: false });
    } else {
      res.status(200).json({ result: true });
    }
  });
});
router.post("/editdata", function (req, res, next) {
  console.log(req.body);
  pool.query(
    "update stream set streamname=? where streamid=?",
    [req.body.streamname, req.body.streamid],
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
  pool.query("delete  from stream where streamid=?", [req.body.streamid], function (error, result) {
    if (error) {
      console.log(error);
      res.status(500).json({ result: false });
    } else {
      res.status(200).json({ result: true });
    }
  });
});
router.get("/allstreams", function (req, res, next) {
  pool.query("select * from stream", function (error, result) {
    if (error) {
      res.status(500).json({ result: [] });
    } else {
      res.status(200).json({ result: result });
    }
  });
});
router.get("/totalstreams", function (req, res, next) {

  pool.query("select streamid from stream order by streamid", function (error, result) {
    if (error) {
      res.status(500).json({ result: [] });
    } else {
      res.status(200).json({ result: result });
    }
  });
});

module.exports = router;
