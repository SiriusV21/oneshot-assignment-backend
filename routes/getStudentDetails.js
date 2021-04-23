const express = require('express');
const Student = require('../models/student');

const router = express.Router();

router.get('/', async (res, req) => {
    const student = await Student.findById(req.student.id);
    res.send(student);
})

module.exports = router;