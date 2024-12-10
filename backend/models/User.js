const {Schema, model}= require('mongoose');

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        minlength:[3, 'Name should be at least 2 characters'],
        maxlength:[20, 'Name should be at most 20 characters']
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address'],
        minlength:[10, 'Email should be at least 10 characters']
    },
    hashedPassword:{
        type: String,
        required:true
    }
});

userSchema.index({username: 1}, {
    collation:{
        locale:'en',
        strength:2
    }
})

const User = model('User', userSchema);

module.exports = User;