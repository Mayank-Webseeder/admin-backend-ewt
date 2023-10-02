// const Post = require('../Models/blogModel')
// const User = require("../Models/UserModel");
// const cloudinary = require('../Cloudinary/cloudinary');
// const router = require('express').Router()

// router.get('/posts' , async(req,res)=>{
//     try{
//         const posts = await Post.find() 
//         res.status(200).json(posts)

//     }catch(e){
//         return res.status(400).send(e.message)
//     }
// })


// router.post("/posts", async (req, res) => {
//     try {
//       const file = req.files;
//       console.log(file);
//       cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {

//         const IsUser = await User.findOne({_id: req.user})
//         console.log("user" + IsUser)
        
//           let date = new Date;
//           let finalDate = date + "";
//           let today = finalDate.split(" ").splice(1, 3).join(" ");
//           let time = finalDate.split(" ").splice(4, 1).join(" ");
  
//           const { title, description} = req.body;
      
//           const user = await Post.create({
//             title,
//             image: result.url,
//             description,
//             author: IsUser.name,
//             date: today,
//             time: time
//           });
//           res.send(user);
//         })
//       } catch (e) {
//         console.log(e)
//       }
//   });

// router.get("/" ,(req,res)=>{
//     res.json({
//         "Message":"404 not found"
//     })
// })

// module.exports = router