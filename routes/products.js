const express = require('express')
const db = require('../database/database')
const hash = require('../helpers/hash')
const token = require('../helpers/token')

router = express.Router()

router.get('/',token.authenticate,(req,res)=>{
    try{
        db.query(`select * from products order by id desc`, async (error,data)=>{
            if(error){
                res.status(200).json({error:error})
            } 
            else{
                res.status(200).json({success:true,data:data})
            } 
        })
    } catch (error){
        res.status(200).json({error:error})
    }
});

router.post('/add',token.authenticate,(req,res)=>{
    let {name,quantity,category} = req.body
    try{
        db.query(`insert into products (name,quantity,category,created_at)values('${name}','${quantity}','${category}','${Date.now()}')`, async (error,data)=>{
            if(error){
                res.status(200).json({error:error})
            } 
            else{
                res.status(200).json({success:true})
            } 
        })
    } catch (error){
        res.status(200).json({error:error})
    }
})

router.post('/update',token.authenticate,(req,res)=>{
    let {id,name,quantity,category,updated_at} = req.body
    try{
        db.query(`select id,updated_at from products where id='${id}' and updated_at='${updated_at}'`,(error,timeStampData)=>{
            if(error) {
                res.status(200).json({error:error})
            } else {
                if(timeStampData.length>0) {
                    db.query(`update products set name='${name}', quantity='${quantity}' , category='${category}' , updated_at='${Date.now()}' where id ='${id}'`, async (error,data)=>{
                        if(error){
                            res.status(200).json({error:error})
                        } 
                        else{
                            res.status(200).json({success:true})
                        } 
                    })
                } else {
                    res.status(200).json({error:'data not in sync'})
                }
            }
        })
        
    } catch (error){
        res.status(200).json({error:error})
    }
})

router.post('/delete',token.authenticate,(req,res)=>{
    let {id} = req.body
    try{
        db.query(`delete from products where id ='${id}'`, async (error,data)=>{
            if(error){
                res.status(200).json({error:error})
            } 
            else{
                res.status(200).json({success:true})
            } 
        })
    } catch (error){
        res.status(200).json({error:error})
    }
})

module.exports = router