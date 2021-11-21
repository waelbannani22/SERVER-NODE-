app.post('/login1', (req, res) => {
    console.log("heloo")
    const email = req.body.email 
    //console.log(username)
    const password = req.body.password
     Volunteer.find({}).then((DBitemss)=>{
        
       
    const authUser = DBitemss.find(user => user.email == email  && user.password == password)
    console.log("userr"+authUser)
    if(authUser) {
      // generate a token 
      const token = jwt.sign({email: email}, "SECRET")
      if(token) {
        res.json({token: token})
      } else {
        res.json({message: "Authentication Failed", success: false})
      }
    } else {
       res.json({message: "Authentication Failed", success: false})
    }
     })
    //console.log(users)
    //const authUser = (users.find(user => user.username.toLowerCase()  == username.toLowerCase()  && user.password == password))
   
    
  })