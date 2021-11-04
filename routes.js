const express = require("express");
const Volunteer = require("./volunteer");
const userModel = require("./volunteer");
const Recruiter=require("./recruiter")
const app = express();



app.post("/add_user", async (request, response) => {
    const user = new userModel(request.body);
  
    try {
      await user.save();
      response.send(user);
    } catch (error) {
      response.status(500).send(error);
    }
});

app.get("/users", async (request, response) => {
    const users = await Volunteer.find({});
  
    try {
      response.send(users);
    } catch (error) {
      response.status(500).send(error);
    }
  });


  //create volunteer
  app.post("/create_volunteer",(req,res)=>{
    var volunteer = new Volunteer({
        name:req.get("name"),
        lastname:req.get("lastname"),
        email:req.get("email"),
        password:req.get("password"),
        photo:req.get("photo"),
        memberDate:req.get("memberDate"),
        age:req.get("age"),
        description:req.get("description")

    })

    volunteer.save().then(()=>{
      if (volunteer.isNew == false){
        console.log("saved data")
        res.send("saved data")
      }else{
        console.log("failed to save data")
      }
    })
  })

  //fetch a volunteer

  app.get("/volunteers",(req,res)=>{
    Volunteer.find({}).then((DBitems)=>{
      res.send(DBitems)
    })
  })

  //remove voluntteer

  app.post("/delete_volunteer",(req,res)=>{
    Volunteer.findOneAndRemove({
      _id: req.get("id")
    },(err)=>{
      console.log("failed")
    }
    )
    res.send("deleted!")
  })
  //update volunteer

  app.post("/update_volunteer",(req,res)=>{
    Volunteer.findOneAndUpdate({
        _id:req.get("id")
    },{
      name:req.get("name"),
      lastname:req.get("lastname"),
      email:req.get("email"),
      password:req.get("password"),
      photo:req.get("photo"),
      memberDate:req.get("memberDate"),
      age:req.get("age"),
      description:req.get("description")
    },(err)=>{
        console.log("failed to update"+err)
    })
    res.send("updated")
  })
//¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤RECRUITER¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤

//create recruiter
app.post("/create_recruiter",(req,res)=>{
  var recruiter = new Recruiter({
      name:req.get("name"),
      
      email:req.get("email"),
      password:req.get("password"),
      photo:req.get("photo"),
      
      description:req.get("description"),
      oraganisation:req.get("oraganisation"),
      phone:req.get("phone")

  })

  recruiter.save().then(()=>{
    if (recruiter.isNew == false){
      console.log("saved data")
      res.send("saved data")
    }else{
      console.log("failed to save data")
    }
  })
})

//fetch recruiter
app.get("/recruiters",(req,res)=>{
  Recruiter.find({}).then((DBitems)=>{
    res.send(DBitems)
  })
})
//remove recruiter
app.post("/delete_recruiter",(req,res)=>{
  Recruiter.findOneAndRemove({
    _id: req.get("id")
  },(err)=>{
    console.log("deleted")
  }
  )
  res.send("deleted!")
})
//update recruiter
app.post("/update_recruiter",(req,res)=>{
  Recruiter.findOneAndUpdate({
      id:req.get("id")
  },{
    name:req.get("name"),      
    email:req.get("email"),
    password:req.get("password"),
    photo:req.get("photo"),
    description:req.get("description"),
    oraganisation:req.get("oraganisation"),
    phone:req.get("phone")

  },(err)=>{
      console.log("failed to update recruiter "+err)
  })
  res.send(" recruiter updated")
})



//export
  module.exports = app;