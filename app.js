const express = require("express");
const PORT = process.env.PORT || 4001;
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
require('dotenv').config();

//configure database and mongoose
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
})
.then(() => console.log('connected to db'))
.catch(err => console.log(err))
// db configuaration ends here

//registering cors
app.use(cors());

//configure body parser


//configure body-parser ends here
app.use(morgan("dev")); // configire morgan

const userRoutes = require("./routers/index");
app.use("/user", userRoutes);

app.use(express.static(__dirname + "/views/"))
app.get("*" , (req,res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});