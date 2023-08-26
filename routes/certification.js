var express = require("express");
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");

router.post("/savecertification", upload.single("icon"), function (req, res, next) {
  console.log(req.body);
  console.log(req.file);
  pool.query(
    "insert into certification (certificationname,certifiedby,validtill,validationcredential,description,url,icon)  values(?,?,?,?,?,?,?)",
    [req.body.certificationname, req.body.certifiedby, req.body.validtill, req.body.credential, req.body.description, req.body.url, req.myfilename],
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
    "update certification set certificationname=?,certifiedby=?,validtill=?,validationcredential=?,description=?,url=? where certificationid=?",
    [
      req.body.certificationname,
      req.body.certifiedby,
      req.body.validtill,
      req.body.validationcredential,
      req.body.description,
      req.body.url,
      req.body.certificationid,
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
  pool.query("delete from certification where certificationid=?", [req.body.certificationid], function (error, result) {
    if (error) {
      console.log(error);
      res.status(500).json({ result: false });
    } else {
      res.status(200).json({ result: true });
    }
  });
});
router.get("/allcertifications", function (req, res, next) {
  pool.query("select * from certification", function (error, result) {
    if (error) {
      res.status(500).json({ result: [] });
    } else {
      res.status(200).json({ result: result });
    }
  });
});
router.get("/totalcertifications", function (req, res, next) {

  pool.query("select certificationid from certification order by certificationid", function (error, result) {
    if (error) {
      res.status(500).json({ result: [] });
    } else {
      res.status(200).json({ result: result });
    }
  });
});

module.exports = router;
