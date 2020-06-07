const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.get('/',async (request,response) => {
    const result = await User.find({}).populate('blogs')
    response.json(result.map(u => u.toJSON()))
})

usersRouter.post('/',async (request,response) => {
    const body = request.body

    if(body.password.length <= 3)
    {
        response.status(403).send({error:"Minimum length of password should be 4"})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password,saltRounds)

    const user = new User({
        username:body.username,
        name:body.name,
        password:passwordHash
    })
    try{
    const savedUser = await user.save()
    response.json(savedUser)
    }
    catch(exception){
        response.status(403).send({error:"Username length should be 3",exception})
    }
})

module.exports = usersRouter