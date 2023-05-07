const express = require('express')
const jwt = require("jsonwebtoken");
const Router = require("express").Router;
const router = new express.Router();
const User = require("../models/user");
const { SECRET_KEY } = require("../config");

const ExpressError = require("../expressError");



router.get('/', (req, res, next) => {
    res.send("APP IS WORKING!!!")
  })
/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/
router.post('/login', async (req, res, next) =>{
    try{
        let {username, password} = req.body;
        debugger;
        if (await User.authenticate(username, password)){
            const token = jwt.sign({username}, SECRET_KEY);
            User.updateLoginTimestamp(username);
            return res.json({token});
        }else{
            throw new ExpressError("Invalid username/password, 400");
        }
    }catch(e){
        return next(e);
    }
    

});



/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */
router.post('/register', async (req, res, next) =>{
    try{
        // req.body include {username, password, first_name, last_name, phone}
        const {username} = await User.register(req.body);
        let token = jwt.sign({username}, SECRET_KEY);
        User.updateLoginTimestamp(username);
        return res.json({token});
    }catch(e){
        return next(e);
    }
});
module.exports = router;