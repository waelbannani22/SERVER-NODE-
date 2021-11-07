const express = require("express");
const Volunteer = require("./volunteer");
const userModel = require("./volunteer");
const Recruiter=require("./recruiter")
const Call =require("./call");
const Review = require("./review");
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

//¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤CALL¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤

//create Call
app.post("/create_call",(req,res)=>{
  var call = new Call({
      name:req.get("name"),
      city:req.get("city"),
      lat:req.get("lat"),
      lng:req.get("lng"),
      photo:req.get("photo"),
      dateBegin:req.get("dateBegin"),
      description:req.get("description"),
      recruiter:req.get("recruiter"),
      rating:req.get("rating"),
      ageGroup:req.get("ageGroup"),
      category:req.get("category")

  })

  call.save().then(()=>{
    if (call.isNew == false){
      console.log("saved data")
      res.send("saved data")
    }else{
      console.log("failed to save call")
    }
  })
})

//fetch call
app.get("/calls",(req,res)=>{
  Call.find({}).then((DBitems)=>{
    res.send(DBitems)
  })
})
//remove call
app.post("/delete_call",(req,res)=>{
  Call.findOneAndRemove({
    _id: req.get("id")
  },(err)=>{
    console.log("deleted")
  }
  )
  res.send("deleted!")
})
//update call
app.post("/update_call",(req,res)=>{
  Call.findOneAndUpdate({
      id:req.get("id")
  },{
    name:req.get("name"),
    city:req.get("city"),
    lat:req.get("lat"),
    lng:req.get("lng"),
    photo:req.get("photo"),
    dateBegin:req.get("dateBegin"),
    description:req.get("description"),
    recruiter:req.get("recruiter"),
    rating:req.get("rating"),
    ageGroup:req.get("ageGroup"),
    category:req.get("category")

  },(err)=>{
      console.log("failed to update call "+err)
  })
  res.send(" call updated")
})

//¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤Review¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤

//create review
app.post("/create_review",(req,res)=>{
  var review = new Review({
      reviewerName:req.get("reviewerName"),
      rating:req.get("rating"),
      date:req.get("date"),
      reviewDescription:req.get("reviewDescription"),
      

  })

  review.save().then(()=>{
    if (review.isNew == false){
      console.log("saved data")
      res.send("saved data")
    }else{
      console.log("failed to save review")
    }
  })
})

//fetch call
app.get("/Reviews",(req,res)=>{
  Review.find({}).then((DBitems)=>{
    res.send(DBitems)
  })
})
//remove call
app.post("/delete_review",(req,res)=>{
  Review.findOneAndRemove({
    _id: req.get("id")
  },(err)=>{
    console.log("deleted")
  }
  )
  res.send("deleted!")
})
//update call
app.post("/update_review",(req,res)=>{
  Review.findOneAndUpdate({
      id:req.get("id")
  },{
    reviewerName:req.get("reviewerName"),
      rating:req.get("rating"),
      date:req.get("date"),
      reviewDescription:req.get("reviewDescription"),

  },(err)=>{
      console.log("failed to update review "+err)
  })
  res.send(" review updated")
})

//export
  module.exports = app;