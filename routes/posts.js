const express = require('express');
const router = express.Router();

// router.get("/getAllPosts", (req,res)=>{
//     res.send({posts:[],message:"Success"})
// })

router.post("/postPost", function(req,res){
    
    res.send({post:['post'],message:"success"})
})


module.exports = router