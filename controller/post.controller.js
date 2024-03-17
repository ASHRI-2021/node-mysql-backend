const models = require("../models");
const Validator = require("fastest-validator");

const v = new Validator();

function savePost(req, res) {
  const post = {
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    content: req.body.content,
    categoryId: req.body.categoryId,
    userId: req.body.userId,
  };

  const schema = {
    title: { type: "string", optional: false, max: "100" },
    content: { type: "string", optional: false, max: "500" },
    categoryId: { type: "number", optional: false },
  };

  const validationResponse = v.validate(post, schema);

  if (validationResponse !== true) {
    return res.status(400).json({
      statusCode: 400,
      message: "Validation failed!",
      errors: validationResponse,
    });
  }

  models.Post.create(req.body)
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Successfully added to database",
        statusCode: 201,
        data: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Something went wrong",
        statusCode: 500,
        data: null,
      });
    });
}

function getPost(req, res) {
  const id = req.params.id;
  models.Post.findByPk(id)
    .then((result) => {
      if (result) res.status(200).json(result);
      else
        res.status(404).json({
          message: "Post not found!",
          statusCode: 404,
          isSuccuss: false,
        });
    })
    .catch((error) => {
      res.status(500).json({
        statusCode: 500,
        message: "Something went wrong!",
        isSuccuss: false,
      });
    });
}

function getAllPosts(req, res) {
  models.Post.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        statusCode: 500,
        message: "Something went wrong!",
      });
    });
}

function updatePost(req, res) {
  const id = req.params.id;
  const updatedPost = {
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    content: req.body.content,
    categoryId: req.body.categoryId,
  };
  const userId = 1;

  const updateSchema = {
    title: {type: 'string', max: '100'},
    content: { type: 'string', max:'500' },
    categoryId: { type: 'number'},
  }

  const updateValidationResponse = v.validate(updatedPost, updateSchema);

  if(updateValidationResponse !== true) {
    return res.status(400).json({
      statusCode: 400,
      message: "Validation failed!",
      error: updateValidationResponse
    })
  }

  models.Post.update(updatedPost, {
    where: {
      id: id,
      userId: userId,
    },
  })
    .then((result) => {
      res.status(200).json({
        statusCode: 200,
        message: "Data updated successfully!",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "something went wrong!",
        statusCode: 500,
      });
    });
}

function deletePost(req, res) {
  const id = req.params.id;
  const userId = 1;

  models.Post.destroy({
    where: {
      id: id,
      userId: userId,
    },
  })
    .then((result) => {
      res.status(200).json({
        statusCode: 200,
        message: "Post deleted successfully!",
      });
    })
    .catch((error) => {
      res.status(500).json({
        statusCode: 500,
        message: "Something went wrong!",
      });
    });
}

module.exports = {
  savePost: savePost,
  getPost: getPost,
  getAllPosts: getAllPosts,
  updatePost: updatePost,
  deletePost: deletePost,
};
