// require("dotenv").config()
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const port = 4000;
// file
const connect = require("./Database/db.js");
const fileUpload = require("express-fileupload");

//db
connect();

// router
const userRouter = require("./Routes/userRoutes.js");
const blogRoutes = require("./Routes/blogRoutes.js");
const contactFormRoutes = require("./Routes/contactFormRoutes.js");
const aboutRoutes = require("./Routes/aboutRoutes.js");
const newsRoutes = require("./Routes/newsRoutes.js");
const contactPageRoutes = require("./Routes/contactPageRoutes.js");

//middleware
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(bodyParser.json());
app.use(fileUpload({ useTempFiles: true }));
app.use(morgan("dev"));

//Routes
app.use("/api", contactFormRoutes);
app.use("/api", aboutRoutes);
app.use("/auth", userRouter);
app.use("/blog", blogRoutes);
app.use("/api", newsRoutes);
app.use("/api", contactPageRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "the server is working",
  });
});

// app.listen(port, () => console.log(`server started on port ${port}`));

export default app;
