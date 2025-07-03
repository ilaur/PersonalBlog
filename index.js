import express from "express";

const app = express();
const port = 3000;
const posts = [];

function Post(title, category, description) {
  this.title = title;
  this.category = category;
  this.description = description;
  this.date = new Date().toLocaleDateString();
}

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { data: posts });
});

app.get("/add", (req, res) => {
  res.render("blog-post.ejs");
});

app.get("/post", (req, res) => {
  const id = parseInt(req.query.index, 10);
  res.render("post-view.ejs", { data: posts[id], index: id });
});

app.post("/add", (req, res) => {
  const body = req.body;
  posts.push(new Post(body.title, body.category, body.description));
  res.redirect("/");
});

app.get("/edit", (req, res) => {
  const id = parseInt(req.query.index, 10);
  res.render("post-edit.ejs", { data: posts[id], index: id });
});

app.get("/cancel", (req, res) => {
  res.redirect("/");
});

app.post("/save", (req, res) => {
  const id = parseInt(req.query.index, 10);
  const body = req.body;
  posts[id] = new Post(body.title, body.category, body.description);
  res.redirect("/");
});

app.get("/delete", (req, res) => {
  const id = parseInt(req.query.index, 10);
  posts.splice(id, 1);
  res.redirect("/");
});

app.listen(port, (error) => {
  if (error) throw error;
  console.log(`Service started and listens on port ${port}.`);
});
