const mongoose = require('mongoose');
const Courses = require('../models/Course');

const { multipleMongooseToObject } = require('../../util/mongoose');
const { query } = require('express');
class meController {
  // [GET] /me/stored/courses
  storedCourses(req, res, next) {
    Courses.find({})
      .then((courses) => {
        res.render('me/stored-courses', {
          courses: multipleMongooseToObject(courses),
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
