const Course = require('../models/Course');

class SiteController {
    //[GET]
    index(req, res) {
        res.json({
            name: 'test',
        });
    }
    //[GET/search]
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
