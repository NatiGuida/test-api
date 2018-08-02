var express = require("express");
var router = express.Router();

const apiController = require("../controllers/apiController");

router.get("/api/items", apiController.search);
router.get("/api/items/:id", apiController.product);
router.get("/api/items/:id/description", apiController.description);

module.exports = router;
