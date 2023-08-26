var express = require("express");
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");

router.post("/saveinstitute", upload.single("icon"), function (req, res, next) {
  console.log(req.body);
  console.log(req.file);
  pool.query(
    "insert into institute (institutename,description,icon)  values(?,?,?)",
    [req.body.institutename, req.body.description, req.myfilename],
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
    "update institute set institutename=?,description=? where instituteid=?",
    [req.body.institutename, req.body.description, req.body.instituteid],
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
  pool.query("delete  from institute where instituteid=?", [req.body.instituteid], function (error, result) {
    if (error) {
      console.log(error);
      res.status(500).json({ result: false });
    } else {
      res.status(200).json({ result: true });
    }
  });
});
router.get("/allinstitutes", function (req, res, next) {
  pool.query("select * from institute", function (error, result) {
    if (error) {
      res.status(500).json({ result: [] });
    } else {
      res.status(200).json({ result: result });
    }
  });
});
router.get("/totalinstitutes", function (req, res, next) {

  pool.query("select instituteid from institute order by instituteid", function (error, result) {
    if (error) {
      res.status(500).json({ result: [] });
    } else {
      res.status(200).json({ result: result });
    }
  });
});

module.exports = router;
