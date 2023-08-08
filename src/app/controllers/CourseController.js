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

    req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
    const course = new Course(req.body);
    course
      .save()
      .then(() => res.redirect('/me/stored/courses'))
      .catch((error) => {});
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
    Courses.delete({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }

  // [DELETE] /courses/:id/force
  forceDestroy(req, res, next) {
    Courses.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }
  // [PATCH] /courses/:id/restore
  restore(req, res, next) {
    Courses.restore({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }

  // [POST] /courses/handle-form-action
  handleFormAction(req, res, next) {
    switch (req.body.action) {
      case 'delete':
        Courses.delete({ _id: { $in: req.body.coursesIds } })
          .then(() => res.redirect('back'))
          .catch(next);
        break;
      case 'restore':
        // res.json(req.body);
        Courses.restore({ _id: { $in: req.body.coursesIds } })
          .then(() => res.redirect('back'))
          .catch(next);
        break;
      case 'forceDestroy':
        res.json(req.body);
        // Courses.deleteOne({ _id: { $in: req.body.coursesIds } })
        //   .then(() => res.redirect('back'))
        //   .catch(next);
        break;
      default:
        res.json({ message: 'Action is invalid' });
    }
  }
}

module.exports = new CourseController();
