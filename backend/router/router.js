const express=require('express');
const {authentication}=require('./authentication')
const {features}=require('./features')
const router=express.Router();

router.use('/v1',authentication)
router.use('/v2',features)

module.exports={router}