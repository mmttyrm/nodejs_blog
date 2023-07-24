const Courses = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');
class CourseController {
    //[GET/course/:slug]
    show(req, res, next) {
        Courses.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render('courses/show');
            })
            .catch(next);
    }
}

module.exports = new CourseController();
