const models = require("../models");
const bcrpytjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Validator = require("fastest-validator");

const v = new Validator();

function signUp(req, res) {
  models.User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((result) => {
      if (result) {
        res.status(409).json({
          statusCode: 409,
          message: "User already exists!",
        });
      } else {
        bcrpytjs.genSalt(10, (error, salt) => {
          bcrpytjs.hash(req.body.password, salt, (error, hash) => {
            const user = {
              name: req.body.name,
              email: req.body.email,
              password: hash,
            };

            const userSchema = {
              name: { type: "string", optional: false, max: "100" },
              email: { type: "email", optional: false },
              password: { type: "string", optional: false },
            };

            const userValidatorResponse = v.validate(user, userSchema);

            if (userValidatorResponse !== true) {
              return res.status(400).json({
                statusCode: 400,
                message: "Validation error!",
                error: userValidatorResponse,
              });
            }

            models.User.create(user)
              .then((result) => {
                res.status(201).json({
                  statusCode: 201,
                  isSuccess: true,
                  message: "User added successfully!",
                  data: result,
                });
              })
              .catch((error) => {
                res.status(500).json({
                  statusCode: 500,
                  isSuccess: false,
                  message: "Something went wrong!",
                  data: error,
                });
              });
          });
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        statusCode: 500,
        message: "Something went wrong!",
      });
    });
}

function login(req, res) {
  models.User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user === null) {
        res.status(401).json({
          statusCode: 401,
          message: "Invalid credentials!",
        });
      }
      else {
        bcrpytjs
          .compare(req.body.password, user.password, (error, result)=> {
            if(result) {
              const token = jwt.sign({
                email: user.email,
                userId: user.id
              }, process.env.AUTH_KEY, (error, token)=>{
                res.status(200).json({
                  statusCode: 200,
                  message: "Authentication successful !",
                  token: token
                });
              });
            }
            else {
              res.status(401).json({
                statusCode: 401,
                message: "Invalid password or credentials!",
              });
            }
          })
      }
    })
    .catch((error) => {
      res.status(401).json({
        statusCode: 401,
        message: "Invalid credentials!",
      });
    });
}

module.exports = {
  signUp: signUp,
  login: login,
};
