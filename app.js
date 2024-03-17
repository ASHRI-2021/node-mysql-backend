const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const usersRoute = require("./routes/users");
const postsRoute = require("./routes/posts");
const imageRoute = require("./routes/image");

app.use(bodyParser.json())

app.use("/users", usersRoute);
app.use("/posts", postsRoute);
app.use("/image", imageRoute);

module.exports = app;
