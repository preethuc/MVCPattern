const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
      type:String,
      required: [true, 'User must have a name'],
      unique: [true, 'User name must be unique'],
      trim:true
    },
    email:{
        type:String,
        required: [true, 'User must have a emailId'],
        unique: [true, 'User mailId must be unique'],
        validate: [validator.isEmail, 'please provide a valid emailId']
    },
    photo:{
        type:String
    },
    password:{
        type:String,
        required:[true,'User must have a password'],
        unique: [true,'User must have unique'],
        minLength:8
    },
    passwordConfirm:{
        type:String,
        required:[true,'please confirm your password'],
        validate: {
            //This only works on CREATE and SAVE
            validator : function(el) {
                return el === this.password;
            },
            message: 'Passwords are not the same!'
        }
    }
})

userSchema.pre('save',async function(next){
    //only run this function if password was actually modified
    if(!this.isModified('password')) return next();

    //Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password,12);

    //Delete passwordConfrim field
    this.passwordConfirm = undefined;
    next();
});

const User = mongoose.model('User',userSchema);

module.exports = User;