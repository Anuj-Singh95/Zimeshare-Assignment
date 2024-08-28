const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");

const app = express();
app.use(express.json());
const port = 5000;

// Configure CORS options
const corsOptions = {
  //   origin: "https://full-stack-assignment-frontend.vercel.app",
  //   credentials: true, // Allow cookies
};

app.use(cors(corsOptions));

mongoose
  .connect(
    "mongodb+srv://anujsinghjee1:J9AdPeEaVPDxQPwh@zimeshare.rvyjy.mongodb.net/?retryWrites=true&w=majority&appName=Zimeshare"
  )
  .then((data) => {
    console.log(`Mongodb Connected with Server : ${data.connection.host}`);
  })
  .catch((err) => {
    console.log("some errrrrror" + err);
  });

const Schema = mongoose.Schema;
const productSchema = new Schema({});
const Product = mongoose.model("Product", productSchema);

app.get("/", async (req, res) => {
  try {
    const data = await Product.find({});
    res.status(200).json({
      success: "true",
      products: data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: "false",
      message: "Error fetching " + err.message,
    });
  }
});

app.get("/search", async (req, res) => {
  try {
    const keyword = req.query.q
      ? {
          $or: [{ title: { $regex: req.query.q, $options: "i" } }],
        }
      : {};

    const data = await Product.find(keyword);
    //   res.send(post);
    res.status(200).json({
      success: "true",
      products: data,
    });
  } catch (error) {
    res.status(500).json({
      success: "false",
      message: "Error fetching " + error.message,
    });
  }
});

app.listen(port, () => {
  console.log("Server is running on " + port);
});
