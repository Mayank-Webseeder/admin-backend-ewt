const express = require("express");
const router = express.Router();
// const upload=require("../middleware/upload")

// Import the uploadImage function
const {
  createBlog,
  allBlogs,
  updateBlog,
  deleteBlog,
  singleBlog,

} = require("../controllers/blogController");

// Define a route for image upload
// router.post('/upload-image', upload.single('image'), uploadImage);
router.get("/all-blogs", allBlogs); //all-blogs
router.post("/create-blog", createBlog); //create-blogs
router.get("/single-blog/:id", singleBlog); //update-blogs
router.patch("/update-blog/:id", updateBlog); //update-blogs
router.delete("/delete-blog/:id", deleteBlog); //delete-blogs
module.exports = router;
