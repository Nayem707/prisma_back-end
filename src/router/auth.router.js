const express = require('express');
const router = express.Router();

const {
  createAdmin,
  loginAdmin,
  logOutAdmin,
} = require('../controller/auth.controller');

router.route('/create').post(createAdmin);
router.route('/login').post(loginAdmin);
router.route('/logout').post(logOutAdmin);

module.exports = router;
