const express = require('express');
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require('dotenv');
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const multer = require("multer");
const path = require("path");

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO_URL,
    {useNewUrlParser: true, useUnifiedTopology:true},()=>{
    console.log("💾 Connected to database")
})


app.use(cors());
app.use("/images",express.static(path.join(__dirname,"public/images")))
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  });

app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/posts",postRoute);
app.use("/api/conversations",conversationRoute);
app.use("/api/messages",messageRoute);




app.listen(5000,()=>{
    console.log("🚀 Server running ")
})