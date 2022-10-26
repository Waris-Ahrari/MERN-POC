const User = require('../models/auth.model')
const expressJwt = require('express-jwt')
const _ = require('lodash')
const fetch = require('node-fetch')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const { errorHandler } = require('../helpers/dbErrorHandling')
// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey = process.env.MAIL_KEY

exports.registerController = (req, res) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);
  console.log(name, email, password)

  console.log(errors)
  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0]

    return res.status(422).json({
      error: firstError
    })
  } else {
    User.findOne({
      email
    }).exec((err, user) => {
      // If user exists
      if (user) {
        console.log('Error Email taken')
        return res.status(400).json({
          error: "Email is taken"
        })
      }
      else {
        const user = new User({
          name,
          email,
          password
        });

        user.save((err, user) => {
          if (err) {
            console.log('Saving Error')
            console.log('Save error', errorHandler(err));
            return res.status(401).json({
              errors: errorHandler(err)
            });
          } else {
            console.log('Success')
            return res.json({
              success: true,
              message: user,
              message: 'Signup success'
            });
          }
        });
      }
    })



  }
}
exports.adminMiddleware = (req, res, next) => {
  User.findById({
    _id: req.user._id
  }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User not found'
      });
    }

    if (user.role !== 'admin') {
      return res.status(400).json({
        error: 'Admin resource. Access denied.'
      });
    }

    req.profile = user;
    next();
  });
};

exports.signinController = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError
    });
  } else {
    // check if user exist
    User.findOne({
      email
    }).exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          errors: 'User with that email does not exist. Please signup'
        });
      }
      // authenticate
      if (!user.authenticate(password)) {
        return res.status(400).json({
          errors: 'Email and password do not match'
        });
      }
      // generate a token and send to client
      const token = jwt.sign(
        {
          _id: user._id
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '1d'
        }
      );

      const { _id, name, email, role } = user;
      console.log("Login Success", user);
      return res.json({
        token,
        user: {
          _id,
          name,
          email,
          role
        }
      });
    });
  }
};





exports.requireSignin = (req, res, next) => {

  const token = expressJwt({
    secret: process.env.JWT_SECRET // req.user._id
  });
  console.log("Sign in check done")
  next();
  
  // res.json({})

}
