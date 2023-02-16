const express = require('express')
const db = require('../database/database')
const hash = require('../helpers/hash')
const token = require('../helpers/token')

router = express.Router()

router.get('/token',token.authenticate,(req,res)=>{
   
    try{
        res.status(200).json({success:true})
    } catch (error){
        res.status(200).json({error:error})
    }
})

router.post('/',(req,res)=>{
    let {username,password} = req.body
    try{
        db.query(`select * from users where username ='${username}'`, async (error,data)=>{
            if(error){
                res.status(200).json({error:error})
            } 
            else{
                
                if (data.length>0 && data[0].password && await hash.decrypt(password,data[0].password)) {
                    let accessToken = token.create({username:data[0].username})
                    let responseData = {
                        username:data[0].username,
                        level:data[0].level,
                        accessToken:accessToken
                    }
                    res.status(200).json({data:responseData})
                }
                else{
                    res.status(200).json({error:"Invalid user"})
                }
            } 
        })
    } catch (error){
        res.status(200).json({error:error})
    }
})
router.post('/register',(req,res)=>{
    let {username,password,level} = req.body
    try{
        db.query(`select * from users where username ='${username}'`, async (error,data)=>{
            if(error){
                res.status(200).json({error:error})
            } 
            else{
                
                if (data.length>0) {
                    res.status(200).json({error:'username already exist!'})
                }
                else{
                    let hashPassword = hash.encrypt(password)
                    db.query(`insert into users (username,password,level) values ('${username}','${hashPassword}','${level}')`,(error,data)=>{
                        if(error){
                            res.status(200).json({error:error})
                        } else {
                            res.status(200).json({success:true})
                        }
                    })
                }
            } 
        })
    } catch (error){
        res.status(200).json({error:error})
    }
})

module.exports = router