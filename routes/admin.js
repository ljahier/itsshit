const express = require('express')
const sha256 = require('sha256')

const router = express.Router()

router.get('/admin', (req, res) => {
    res.render('admin')
    res.end()
})

// add routes for connect to admin and add routes /admin/school/post/id to delete update and show

module.exports = router