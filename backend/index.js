
const express = require("express");

require("dotenv").config();
const mongoose = require("mongoose")

const app = express();
const cors = require("cors");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch(err => console.log("Error connecting to DB:", err));


app.use(cors({
 origin: "https://todolist-fgne.vercel.app",
methods: ["POST", "GET", "DELETE"], 
credentials: true
}));

app.use(express.json());

// mongoose.connect("mongodb+srv://rajkaviya121:rajkaviya2@cluster0.v7anyu3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>
// console.log("DB sucess"))
// .catch(()=>console.log("DB failed"))


//to connect with connection create model
const Activity = mongoose.model("Activity",{name:String}, "act")

// const act = ["Wake up at 4", "Take a shower"];

    app.get("/actlist", (req, res) => {
        console.log("GET /actlist called")
       Activity.find().then(function(retdata){
        console.log(retdata)
        res.send(retdata)
       })
      
    });


app.post("/addact", function(req,res){
    var newact = req.body.newact

    const newactivity = new Activity(
        {
            name:newact
        }
    );
    newactivity.save().then ( () =>  Activity.find().then(data => res.send(data)))
    // Activity.find().then((data) => res.send(data));

    // act.push(newact);
    // res.send({act})
})

app.delete("/deleteact/:id", function(req, res) {
    const idToDelete = req.params.id;
    
    Activity.findByIdAndDelete(idToDelete)
    .then(() => {
    // Send updated list after deletion
    Activity.find().then(data => {
    res.send(data);
    });
    })
    .catch(err => {
console.error("Delete error:", err);
    res.status(500).send("Error deleting activity");
     });
    });
    
app.listen(5000, function(){
    console.log("Server started at 5000...")
});

