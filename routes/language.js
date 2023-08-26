var express = require("express");
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");

router.post("/savelanguage", function (req, res, next) {
  console.log(req.body);
  pool.query("insert into language (languagename,region)  values(?,?)", [req.body.language, req.body.region], function (error, result) {
    if (error) {
      console.log(error);
      res.status(500).json({ result: false });
    } else {
      res.status(200).json({ result: true });
    }
  });
});
router.get("/alllanguages", function (req, res, next) {
  pool.query("select * from language", function (error, result) {
    if (error) {
      res.status(500).json({ result: [] });
    } else {
      res.status(200).json({ result: result });
    }
  });
});

module.exports = router;
