const express = require("express");
const router = express.Router();
const userController = require("../controllers/usercontroller");
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post("/register", jsonParser, userController.registerNewUser);
router.post("/login",jsonParser, userController.loginUser);
router.post("/isrecommended",jsonParser, userController.isRecommended);
router.post("/genres",jsonParser, userController.genres);
router.post("/categories",jsonParser, userController.categories);
router.post("/groups",jsonParser, userController.groups);
router.post("/setrecommended",jsonParser, userController.setRecommended);
router.post("/retrieveall",jsonParser, userController.retrieveAll);
router.post("/addwatchlist",jsonParser, userController.addWatchList);
router.post("/getwatchlist",jsonParser, userController.getWatchList);
router.post("/removewatchlist",jsonParser, userController.removeWatchList);

module.exports = router;