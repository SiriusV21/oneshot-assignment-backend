const express = require('express');
const College = require('../models/college');

const router = express.Router();

router.get('/', async (res, req) => {
    const college = await College.findOne({ _id : req.college.id})
    res.json(college);
})

module.exports = router;