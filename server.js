const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app=express();
mongoose.connect(`mongodb://admin:admin123@ds127736.mlab.com:27736/api`);

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var Item =new mongoose.Schema({
    name:String,
    description:String,
    categories:Array,
    price:Number
  }
);

var User=new mongoose.Schema({
  name:String,
  username:String,
  password:String
});

var Category=new mongoose.Schema({
    category_id:Number,
    category_name:String
});

var Item=mongoose.model('Products',Item);
var Category=mongoose.model('Category',Category );
var User=new mongoose.model('User',User);


app.get('',(req,res)=>{
  User.find({},function (err,result) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(result);
    }
  })
});

app.get('/category',(req,res)=>{
  Category.find({},function (err,result) {
    if (err) {
      res.send(err);
    }
    else {
      res.json(result);
    }
  })
});

app.post('/category/delete/:id',(req,res)=>{
    Category.findOneAndRemove({category_id:req.params.id},function (err) {
      if (err) {
        console.log(err);
      }
      console.log("Success deleted");
    })
})

app.get('/category/:id',(req,res)=>{
  Category.findOne({category_id:req.params.id},function (err,result) {
    if (err) {
      res.send(err);
      console.log(err);
    }
    else {
      console.log(result);
      res.json(result);
    }
  })
})

app.post('/category/:id',(req,res)=>{
  Category.findOneAndUpdate({category_id:req.params.id},{category_name:req.body.category_name},function (err) {
    if (err) {
        console.log(err);
    }
    console.log("Succes"+req.body.category_name);
  });
})

app.post('/category',(req,res)=>{
    console.log(req.body);
    var Item=Category({category_id:req.body.category_id,category_name:req.body.category_name}).save(function (err){
        if (err) {
          console.log(err);
        }
        console.log("Success");
    })
});

app.get('/products',(req,res)=>{
  Item.find({},function (err,result){
    if (err) {
      console.log(err);
    }
    else {
      res.send(result);
    }
  })
})

const port=5000;

app.listen(port,()=> {
  console.log(`server started on ${port}`);
});
