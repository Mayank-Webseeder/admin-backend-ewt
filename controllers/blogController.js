const Blog = require("../Models/blogModel");
const cloudinary = require("../Cloudinary/cloudinary");

//Create blogs
module.exports.createBlog = async (req, res) => {
  try {
    console.log(req.files);
    const file = req.files.image;
    console.log(file);
    cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
      const { name, content } = req.body;
      console.log(result);
      //validation
      if (!name || !content) {
        return res.status(400).send({
          success: false,
          message: "please provide all fields",
        });
      }
      const image = result.url;
      const newBlog = new Blog({ name, content, image });
      await newBlog.save();
      return res.status(201).send({
        success: true,
        message: "Blog Created!",
        newBlog,
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error while creating blog",
      error,
    });
  }
};

//   try {
//     console.log(req.body);
//     const file = req.body.image;
//     console.log(file);
//     cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).send({
//           success: false,
//           message: "Error uploading the image to Cloudinary",
//           error: err,
//         });
//       }

//       const { name, content } = req.body;

//       // Validation
//       if (!name || !content) {
//         return res.status(400).send({
//           success: false,
//           message: "Please provide all fields",
//         });
//       }

//       const blogDetails = await Blog.create({
//         name,
//         content,
//         image: result.secure_url, // Use 'secure_url' for the image URL
//       });

//       res.status(201).send({
//         success: true,
//         message: "Blog Created!",
//         newBlog: blogDetails,
//       });
//       console.log(blogDetails);
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(400).send({
//       success: false,
//       message: "Error while creating blog",
//       error: error,
//     });
//   }
// };

//Update Blogs
// module.exports.updateBlog = async (req, res) => {
//   try {
//     const { name, content, image } = req.body;
//     const updatedBlog = await Blog.findByIdAndUpdate(
//       req.params.id,
//       { name, content, image },
//       { new: true }
//     );
//     if (!updatedBlog) {
//       return res.status(404).json({ error: "Blog not found" });
//     }
//     res.json(updatedBlog);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

module.exports.updateBlog = async (req, res) => {
  try {
    const file = req.files.image;

    const { previousImageUrl } = req.body;

    const getPublicId = async (imageURL) =>
      imageURL.split("/").pop().split(".")[0];
    const publicId = await getPublicId(previousImageUrl);

    cloudinary.uploader.upload(
      file.tempFilePath,
      {
        public_id: publicId,
        invalidate: true,
      },
      async (err, result) => {
        const { name, content } = req.body;
        console.log(result);
        //validation
        if (!name || !content) {
          return res.status(400).send({
            success: false,
            message: "please provide all fields",
          });
        }
        const image = result.url;
        const updatedBlog = await Blog.findByIdAndUpdate(
          req.params.id,
          {
            name,
            content,
            image,
          },
          { new: true }
        );
        if (!updatedBlog) {
          return res.status(404).json({ error: "Blog not found" });
        }
        res.json(updatedBlog);
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error while creating blog",
      error,
    });
  }
};

// DELETE blog
module.exports.deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const deletedBlog = await Blog.findByIdAndDelete(blogId);
    if (!deletedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res
      .status(200)
      .json({ message: "Blog deleted successfully", Blog: deletedBlog });
    console.log("deletedBlog");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

//All Blogs
module.exports.allBlogs = async (req, res) => {
  try {
    const allBlogs = await Blog.find();
    res.status(200).json(allBlogs);
  } catch (error) {
    res.status(500).json({ error: "An error occureed" });
  }
};

//single Blogs
module.exports.singleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const singleBlog = await Blog.findOne({ _id: id });
    res.status(200).json(singleBlog);
  } catch (error) {
    res.status(500).json({ error: "An error occureed" });
  }
};