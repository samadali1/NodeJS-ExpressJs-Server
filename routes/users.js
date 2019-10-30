const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const CreatePost = require('../models/Post');
const volunteer = require('../models/volunteer');
const comment = require('../models/comment');
const verifyToken = require('../middlewares/verifyToken');
const mongoose = require('mongoose');

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

// fetch('/users/signup', {
//     method: 'POST', 
//     body: JSON.stringify({
// 		email:'',
// 		password:'',
// 		name:'',
// 		bloodgroup:'',
// 	}), 
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })

router.post("/signup", (req, res) => {
    const user = new Users(req.body);
    user.save().then(newUser => {
        res.send({ message: 'User added successfully' })
    }).catch(err => {
        res.status(500).send(err)
    });
})

// fetch('/users/login', {
//     method: 'POST', 
//     body: JSON.stringify({
// 		email:'',
// 		password:'',
// 	}), 
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await Users.findOne({ email })

    if (!user) {
        return res.send({ message: "We didn't found this user!" });
    }

    const isAuthenticated = await user.comparePassword(password);

    if (!isAuthenticated) {
        return res.send({ message: "Invalid Password!" });
    }

    const token = await user.generateToken();
    res.header("x-auth", token);
    res.send(user)
})

// fetch('/users/logout', {
//     method: 'POST', 
//     headers: {
//       'Content-Type': 'application/json',
// 		  'x-auth' : ''
//     }
//   })

router.post("/logout", (req, res) => {
    const token = req.header("x-auth");

    Users.removeToken(token)
        .then(() => res.send({ message: "Token Removed Successfully" }))
        .catch(err => res.send(err))
})

// fetch('/users/createPost', {
//     method: 'POST', 
//     body: JSON.stringify({
// 		unitsRequired: *,
// 		urgency:'',
// 		bloodgroup:'',
// 		country:'',
// 		state:'',
// 		city:'',
// 		hospital:'',
// 		relationWithPatient: '',
// 		contactNo: ***********,
// 		additionalInstruction: '',
// 		userId:'',
// 		userName:''
// 	}), 
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })


router.post("/createPost", (req, res) => {
    const post = req.body;
    post.postedTime = Date.now();
    const postData = new CreatePost(post);
    postData.save().then(() => {
        res.send({ message: 'Post has been created!' })
    }).catch(err => {
        res.status(500).send(err.message)
    });
})

// fetch('/users/allPosts')

router.get('/allPosts', (req, res) => {
    const allPosts = CreatePost.find().then((data) => {
        res.send(data)
    }).catch(err => {
        res.status(500).send(err.message)
    });
})


// fetch('/users/myRequests', {
//     method: 'POST', 
//     body: JSON.stringify({
// 		id:''
// 	}), 
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })

router.post('/myRequests', (req, res) => {
    const myRequests = CreatePost.find({ userId: req.body.id }).then((data) => {
        res.send(data)
    }).catch(err => {
        res.status(500).send(err.message)
    });
})

// fetch('/users/makeVolunteer', {
//     method: 'POST', 
//     body: JSON.stringify({
// 		postId:'',
// 		userId:'',
// 		name: '',
// 		bloodgroup:'',
// 		status:''
// 	}), 
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })

router.post("/makeVolunteer", (req, res) => {
    const post = CreatePost.find({ _id: req.body.postId }).then((data) => {
        const vs = data[0].volunteers;
        vs.push(req.body)
        CreatePost.updateOne({ _id: req.body.postId }, { 'volunteers': vs }).then(() => {
            res.send({ message: 'Done!' })
        }).catch(err => {
            res.status(500).send(err.message)
        });
    })
})

// fetch('/users/postComment', {
//     method: 'POST', 
//     body: JSON.stringify({
// 		postId:'',
// 		userId:'',
// 		name: '',
// 		comment:''
// 	}), 
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })

router.post("/postComment", (req, res) => {
    const postC = req.body;
    postC.postedTime = Date.now();
    const post = CreatePost.find({ _id: req.body.postId }).then((data) => {
        const cs = data[0].comments;
        cs.push(postC)
        CreatePost.updateOne({ _id: req.body.postId }, { 'comments': cs }).then((udata) => {
            data.comments = cs
            res.send(data)
        }).catch(err => {
            res.status(500).send(err)
        });
    })
})

// fetch('/users/getComments', {
//     method: 'POST', 
//     body: JSON.stringify({
// 		postId:'',
// 	}), 
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })

router.post('/getComments', (req, res) => {
    const post = CreatePost.find({ _id: req.body.postId }).then((data) => {
        res.send(data[0].comments)
    }).catch(err => {
        res.status(500).send(err.message)
    });
})

// fetch('/users/getVolunteers', {
//     method: 'POST', 
//     body: JSON.stringify({
// 		postId:'5daf34c09fc4440328b03e18',
// 	}), 
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })

router.post('/getVolunteers', (req, res) => {
    const post = CreatePost.find({ _id: req.body.postId }).then((data) => {
        res.send(data[0].volunteers)
    }).catch(err => {
        res.status(500).send(err.message)
    });
})

// fetch('/users/updateVolunteer', {
//     method: 'POST', 
//     body: JSON.stringify({
// 		postId:'',
// 		userId:'',
// 	}), 
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })

router.post('/updateVolunteer', (req, res) => {
    const post = CreatePost.find({_id:req.body.postId}).then((data) => {
        const vs = data[0].volunteers;
        var donated = 0;
        for(var i = 0; i<vs.length; i++ ){
            if(vs[i].userId===req.body.userId){
                vs[i].status = "Donated";
                CreatePost.updateOne({ _id: req.body.postId }, { 'volunteers': vs }).catch(err => {
                    res.status(500).send(err.message)
                }); 
            }
            if(vs[i].status==="Donated"){
                donated++;
            }
        }
        if(donated>=data[0].unitsRequired){
            CreatePost.updateOne({ _id: req.body.postId }, { 'status': 'Fulfilled' }).then((uData)=>{
                data.status = "Fullfilled";
                res.send(data)
            })
        }else{
            res.send(data)
        }
    }).catch(err => {
        res.status(500).send(err.message)
    });
})


module.exports = router