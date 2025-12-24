import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log("Server running on port " + port);
});

app.get("/", (req, res) => {
  res.render("index.ejs", { posts });
});

app.post("/create", (req, res) => {
  createPost(req);
  //console.log(posts);
  res.render("index.ejs", { posts });
});

let posts = [];
let count = 0;

function createPost(req) {
  count++;
  let post = {
    id: count,
    message: req.body["message"],
  };
  posts.push(post);
}

app.post("/delete", (req, res) => {
  var index = Number(req.body.id);
  deletePost(index);
  res.render("index.ejs", { posts });
});

function deletePost(id) {
  posts = posts.filter((post) => post.id !== id);
  
}

app.post("/edit", (req, res) => {
  var index = Number(req.body.id);
  var newMessage = req.body["newMessage"];
  editPost(index, newMessage);
  res.render("index.ejs", { posts });
});

function editPost(id, newMessage) {
  posts = posts.map((post) => {
    if (post.id == id) {
      post.message = newMessage;
    }
    return post;
  });
}
