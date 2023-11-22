const router = require("express").Router();

router.use('/events',require('./events'));
router.use('/suggestions',require('./suggestions'));

module.exports = router;