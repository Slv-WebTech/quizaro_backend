var express = require("express");
var router = express.Router();
var pool = require("./pool");

router.post("/chkadminlogin", function (req, res, next) {
  pool.query("select * from admins where email=? and password=?", [req.body.email, req.body.password], function (error, result) {
    if (error) {
      console.log(error);
      res.status(500).json({ result: false });
    } else {
      if (result.length == 0) {
        res.status(200).json({ result: false });
      } else {
        res.status(200).json({ result: true, data: result });
      } 
    }
  });
});
module.exports = router;
