const express = require('express');
const router = express.Router();
const Users = require('../models/Users')

router.use(express.json())
router.use(express.urlencoded({extended:true}))

router.get("/getAllUsers", (req,res)=>{
    // const users = Users.find();
    const users = Users.find({age: {$gt : 25}});
    users.then((allU)=>{
        res.send({result: allU})
    }).catch((e)=>{
        res.send({message:e.message})
    })
})

// router.post("/postUser", function(req,res){
//     console.log("posted")
//     res.send({user:['Jaawwad'],message:"success"})
// })

// router.post('/addUser', (req,res)=>{
//     const user = req.body;
//     console.log(user, "user")
//     const newUser = new Users(user)
//     newUser.save().then(()=>{
//         res.send({message:"User Added"})
//     }).catch((e)=>{
//         res.send({message: e.message})
//     })
// })
// router.post('/getUser', (req,res)=>{
//     const email = req.body.email;
//     const users = Users.find({email,age: {$gt : req.body.age, $lt: req.body.age2}});
//     users.then((allU)=>{
//         console.log(allU)
//         res.send({result: allU})
//     }).catch((e)=>{
//         res.send({message:e.message})
//     })
// })
router.post('/getUser', (req,res)=>{
    const name = req.body.name;
    // console.log(name)
    const users = Users.find({name: {$regex: req.body.name}});

    users.then((allU)=>{
        console.log(allU, "Searched")
        res.send({result: allU})
    }).catch((e)=>{
        res.send({message:e.message})
    })
})
module.exports = router