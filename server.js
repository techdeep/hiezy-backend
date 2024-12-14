require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const port = process.env.PORT
const app = express();
const cors = require('cors')

// Routing components
const aibotrouter = require("./src/services/ai_service/ai_router")
const interviewRouter = require("./src/services/interview_scheduling_service/interview_details_router")
const authenticationRouter = require("./src/services/authentication/authentication_router")
//databse connection
mongoose.connect(process.env.MONGODB_STRING);

mongoose.connection.once("open", () => {
  console.log("connected with database..");
});

app.use(cors())
//middleware
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

//routing
app.use("/", (req,res)=>{
 res.send( "Welcome to hiezy")
})
app.use("/app/ai",  aibotrouter)
app.use("/app/candidate",  interviewRouter)
app.use("/", authenticationRouter)
//listning
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});