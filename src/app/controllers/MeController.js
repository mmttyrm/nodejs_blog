const mongoose = require('mongoose');
const Courses = require('../models/Course');

const { mongooseToObject } = require('../../util/mongoose');
const { query } = require('express');
const Course = require('../models/Course');
class meController {
  // [GET] /me/stored/courses
  storedCourses(req, res, next) {
    res.render('me/stored-courses');
  }
}

module.exports = new meController();
