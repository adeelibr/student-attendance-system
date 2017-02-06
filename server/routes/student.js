const express = require('express');
const router = express.Router();

const stdFunc = require('../controllers/student');

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router
  .post('/', stdFunc.create)
  .get('/all', stdFunc.get);

module.exports = router;
