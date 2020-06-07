const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
        username:{
            type:String,
            unique:true,
            minlength:3  
        },
        name:String,
        password:String,
        blogs:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Blog'
        }]
    }) 

    userSchema.set('toJSON',{
        transform : (document,returnedObject) => {
            returnedObject.id = returnedObject._id.toString()
            delete returnedObject._id
            delete returnedObject.__v
            delete returnedObject.password
        }
    })

module.exports =  mongoose.model('User',userSchema)

