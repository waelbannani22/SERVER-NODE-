const express = require('express');
const Volunteer = require("../entities/volunteer");
const userModel = require("../entities/volunteer");
const Recruiter=require("../entities/recruiter")
const Call =require("../entities/call");
const Review = require("../entities/review");
const Ranking =require("../entities/ranking");
const Notificationn = require("../entities/notification");
const app = express();
const jwt = require('jsonwebtoken')
const Token = require("../entities/token");
const sendEmail = require("../util/sendmail");
const Joi = require("joi");
const crypto = require("crypto");
const auth = require("../util/middleware")

app.use(express.json()) 
var bcrypt = require('bcrypt')
var Crypto = require('crypto-js');
const { cryptPassword } = require('./cryptage');
const { User } = require('../entities/user');
const findbymail = require('../util/findbymail');
var salt =10
//
app.post("/userapi",(req,res)=>{
  var volunteer = new User({
      name:req.body.name,
     
      email:req.body.email,
      password:req.body.password,
     
  })

  volunteer.save().then(()=>{
    if (volunteer.isNew == false){
      console.log("saved data")
      res.send("saved data")
    }else{
      console.log("failed to save data")
    }
  })
});
//
app.post("/resetpassword", async (req, res) => {
  try {
      const schema = Joi.object({ email: Joi.string().email().required() });
      const { error } = schema.validate(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      const user = await Volunteer.findOne({ email: req.body.email });
      if (!user)
          return res.status(400).send("user with given email doesn't exist");

      let token = await Token.findOne({ userId: user._id });
      if (!token) {
          token = await new Token({
              userId: user._id,
              token: crypto.randomBytes(32).toString("hex"),
          }).save();
      }

      //const link = `${process.env.BASE_URL}/resetpassword/${user._id}/${token.token}`;
      //await sendEmail(user.email, "Password reset", link);

      res.send({token:token.token,user:user._id});
  } catch (error) {
      res.send("An error occured");
      console.log(error);
  }
});
//
function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}

//console.log(makeid(5));
app.post("/sendmail", async (req, res) => {
  try {
      const schema = Joi.object({ email: Joi.string().email().required() });
      const { error } = schema.validate(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      const user = await Volunteer.findOne({ email: req.body.email });
      if (!user)
          return res.status(400).send("user with given email doesn't exist");

      let token = await Token.findOne({ userId: user._id });
      if (!token) {
          token = await new Token({
              userId: user._id,
              token: crypto.randomBytes(32).toString("hex"),
          }).save();
      }

      //const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;
      
      var code = makeid(5)
      await sendEmail(user.email, "Password reset", code);
      res.json({code:code,id : user._id})
      
  } catch (error) {
      res.send("An error occured");
      console.log(error);
  }
});
//

app.post("/h/:codesent/",  (req, res) => {
  try {
    
      console.log(req.params.codesent)
      console.log(req.body.password)
      if (req.body.password === req.params.codesent){
        return res.status(200).send("match")
      }else{
        return res.status(400).send("invalid code")
      }
      
  } catch (error) {
      res.send("An error occured");
      console.log(error);
  }
});
//
app.post("/g/:userId/",async(req,res)=>{
  
  try {
    const schema = Joi.object({ password: Joi.string().required() });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await Volunteer.findById(req.params.userId);
    if (!user) return res.status(400).send("invalid link or expired");

    
   
    user.password = req.body.password;
    bcrypt.genSalt(salt,function(err,salt){
      bcrypt.hash(user.password,salt,async function(err,hash){
        user.password = hash
           await user.save();
      })});
  

    res.send("password reset sucessfully.");
} catch (error) {
    res.send("An error occured");
    console.log(error);
}
    
  
    
    
})
app.post("/:userId/:token", async (req, res) => {
  try {
      const schema = Joi.object({ password: Joi.string().required() });
      const { error } = schema.validate(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      const user = await Volunteer.findById(req.params.userId);
      if (!user) return res.status(400).send("invalid link or expired");

      const token = await Token.findOne({
          userId: user._id,
          token: req.params.token,
      });
      if (!token) return res.status(400).send("Invalid link or expired");

      user.password = req.body.password;
      bcrypt.genSalt(salt,function(err,salt){
        bcrypt.hash(user.password,salt,async function(err,hash){
          user.password = hash
             await user.save();
        })});
      await token.delete();

      res.send("password reset sucessfully.");
  } catch (error) {
      res.send("An error occured");
      console.log(error);
  }
});
//

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
        username:req.body.username,
        lastname:req.body.lastname,
        email:req.body.email,
        password:req.body.password,
        photo:req.body.photo,
        memberDate:req.body.memberDate,
        age:req.body.age,
        description:req.body.description

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

  app.post("/volunteers",auth,(req,res)=>{
    const token = req.body.token
    const email = req.body.email
   Volunteer.find({}).then((DBitemss)=>{
      
     
      const authUser = DBitemss.find(user => user.email == email)
      if(authUser){
        res.send(authUser)
      }
      else{
        res.send("failed to find user")
      }
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

  app.post("/update_volunteer",auth,(req,res)=>{
    Volunteer.findByIdAndUpdate({
        _id:req.body.id,
        token :req.body.token,
      
       
    },{
      token :req.body.token,
      username :req.body.username,
      lastname :req.body.lastname,
      

    },(err)=>{
        console.log("failed to update"+err)
        //res.send("failed to update")
    })
    res.send("updated")
    //console.log(_id)
   
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

//¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤Notifcation¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤

//create notification
app.post("/create_notification",(req,res)=>{
  var notification = new Notificationn({
      date:req.get("date"),
      nameExperience:req.get("nameExperience"),
      volunteerId:req.get("volunteerId"),
      type:req.get("type"),
      

  })

  notification.save().then(()=>{
    if (notification.isNew == false){
      console.log("saved data")
      res.send("saved data")
    }else{
      console.log("failed to save notification")
    }
  })
})

//fetch noti
app.get("/Notifications",(req,res)=>{
  Notificationn.find({}).then((DBitems)=>{
    res.send(DBitems)
  })
})
//remove noti
app.post("/delete_notification",(req,res)=>{
  Notificationn.findOneAndRemove({
    _id: req.get("id")
  },(err)=>{
    console.log("deleted notification")
  }
  )
  res.send("deleted!")
})
//update notififcation
app.post("/update_notification",(req,res)=>{
  Notificationn.findOneAndUpdate({
      id:req.get("id")
  },{
    date:req.get("date"),
    nameExperience:req.get("nameExperience"),
    volunteerId:req.get("volunteerId"),
    type:req.get("type"),

  },(err)=>{
      console.log("failed to update notification "+err)
  })
  res.send(" notification updated")
})

//¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤RANKING¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤

//create ranking
app.post("/create_ranking",(req,res)=>{
  var ranking = new  Ranking({
      volunteerName:req.get("volunteerName"),
      amount:req.get("amount"),
      charityName:req.get("charityName"),
      
      

  })

  ranking.save().then(()=>{
    if (ranking.isNew == false){
      console.log("saved data")
      res.send("saved data")
    }else{
      console.log("failed to save ranking")
    }
  })
})

//fetch ranking
app.get("/Rankings",(req,res)=>{
  Ranking.find({}).then((DBitems)=>{
    res.send(DBitems)
  })
})
//remove ranking
app.post("/delete_ranking",(req,res)=>{
  Ranking.findOneAndRemove({
    _id: req.get("id")
  },(err)=>{
    console.log("deleted ranking")
  }
  )
  res.send("deleted!")
})
//update ranking
app.post("/update_notification",(req,res)=>{
  Ranking.findOneAndUpdate({
      id:req.get("id")
  },{
    volunteerName:req.get("volunteerName"),
    amount:req.get("amount"),
    charityName:req.get("charityName"),

  },(err)=>{
      console.log("failed to update ranking "+err)
  })
  res.send(" ranking updated")
})
//tri par amount

//*****************************************LOGIN */
const users = [
  {username: 'wael', password: 'test123'}
]
app.post('/login', (req, res) => {
  console.log("heloo")
  const email = req.body.email 
  //console.log(username)
  const password = req.body.password
   Volunteer.find({}).then((DBitemss)=>{
      
     
  const authUser = DBitemss.find(user => user.email == email  )
  if (authUser){
    console.log("userr"+authUser)
    bcrypt.compare(password,authUser.password,function(err,result){
      if (result == true){
        if(authUser) {
          // generate a token 
          const token = jwt.sign({email: email}, "SECRET")
          if(token) {
            authUser.token = token 
            res.json({token: token,user:authUser})
            console.log(token)
          } else {
            res.json({message: "Authentication Failed", success: false})
          }
        } else {
           res.json({message: "Authentication Failed", success: false})
        }
      }else{
        res.send("password isn't correct")
      }
    
       })
  }else{
    res.send("no email found")
  }
  
 
  })
 
  //console.log(users)
  //const authUser = (users.find(user => user.username.toLowerCase()  == username.toLowerCase()  && user.password == password))
 
  
})
//***********************Signup */
app.post('/Signup',(req,res)=>{
  const username = req.body.username
  const lastname = req.body.lastname
  const email = req.body.email
  var passwordE = req.body.password
  const photo = req.body.photo
  const memberDate = req.body.memberDate
  const age = req.body.age
  const description = req.body.description

  //console.log(email)

  Volunteer.find({}).then((DBitem)=>{
   //console.log(DBitem)
      // const validator = DBitem.find(user => user.email != email)
      const db = DBitem.find(user => user.email == email)
      console.log(db)
      //var crypted = Crypto.MD5(password)
      //console.log(crypted)
      var pass = ""
      bcrypt.genSalt(salt,function(err,salt){
        bcrypt.hash(passwordE,salt,function(err,hash){
          
          console.log("hash"+hash)
          if  (!db){   
       
       

            console.log("mail defini "+ email)
            //console.log("base "+DBitem.find(user => user.email != null).email)
    
            var volunteer = new Volunteer({
              username:req.body.username,
              lastname:req.body.lastname,
              email:req.body.email,
              password:hash,
              photo:req.body.photo,
              memberDate:req.body.memberDate,
              age:req.body.age,
              description:req.body.description
    
      
          })
          console.log(volunteer)
          volunteer.save().then(()=>{
            if (volunteer.isNew == false){
              console.log("saved data")
              //res.send("SignUp completed")
              res.json({user:volunteer})
            }else{
              console.log("failed to save data")
              res.send("failed to save")
            }
          })
    
            
          }else {
            console.log("mail defini "+ email)
            console.log("mail already exists")
            res.send("mail already in use")
      
          }
        })
      })
      //console.log(passwordE)


  })

})
 module.exports = app;