const mongoose = require('mongoose');
const Courses = require('../models/Course');

const { mongooseToObject } = require('../../util/mongoose');
const { query } = require('express');
const Course = require('../models/Course');
class CourseController {
  //[GET/course/:slug]
  show(req, res, next) {
    Courses.findOne({ slug: req.params.slug })
      .then((course) => {
        res.render('courses/show', { course: mongooseToObject(course) });
      })
      .catch(next);
  }

  // [GET] /courses/create
  create(req, res, next) {
    res.render('courses/create');
  }

  // [POST] /courses/store
  store(req, res, next) {
    // res.json(req.body);
    const formData = req.body;
    formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
    const course = new Course(formData);
    course.save();
    res.send('Course Saved!!!');
  }

  // [GET] /courses/:id/create
  edit(req, res, next) {
    Courses.findById(req.params.id)
      .then((course) =>
        res.render('courses/edit', {
          course: mongooseToObject(course),
        })
      )
      .catch(next);
  }

  // [PUT] /courses/:id
  update(req, res, next) {
    Courses.updateOne(
      { _id: req.params.id },
      {
        ...req.body,
        image: `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`,
      }
    )
      .then(() => res.redirect('/me/stored/courses'))
      .catch(next);
  }
  // [DELETE] /courses/:id
  destroy(req, res, next) {
    Courses.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }
}

module.exports = new CourseController();
