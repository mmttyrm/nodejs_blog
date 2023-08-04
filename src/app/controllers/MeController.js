const mongoose = require('mongoose');
const Courses = require('../models/Course');

const { multipleMongooseToObject } = require('../../util/mongoose');
const { query } = require('express');
class meController {
  // [GET] /me/stored/courses
  storedCourses(req, res, next) {
    Promise.all([
      Courses.find({}),
      Courses.countDocumentsWithDeleted({ deleted: true }),
    ])
      .then(([courses, countDeletedCount]) => {
        res.render('me/stored-courses', {
          courses: multipleMongooseToObject(courses),
          countDeletedCount,
        });
      })
      .catch(next);
  }

  // [GET] /me/trash/courses
  trashCourses(req, res, next) {
    Courses.findWithDeleted({ deleted: true })
      .then((courses) => {
        res.render('me/trash-courses', {
          courses: multipleMongooseToObject(courses),
        });
      })
      .catch(next);
  }
}

module.exports = new meController();
