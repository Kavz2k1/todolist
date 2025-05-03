
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/todo").then(()=>
console.log("DB sucess"))
.catch(()=>console.log("DB failed"))
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
    res.status(500).send("Error deleting activity is activated");
     });
    });
    
app.listen(5000, function(){
    console.log("Server started at 5000...")
});

