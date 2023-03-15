const mongoose =require('mongoose')
const bcrypt =require('bcrypt')

const Schema= mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
})

userSchema.statics.signup = async function(email, password) {

    if(!/^\w+@\w{2,}\.\w{2,3}$/.test(email)) {
        throw new Error('The email is not valid')
    }
    if(!/^\S{8,64}$/.test(password)) {
        throw new Error('The password is not strong enough')
    }
    const exists = await this.findOne({email})

    if(exists) {
        throw new Error('The same email aleady exsists')
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await this.create({email, password:hash});
    return user;
}

userSchema.statics.signin = async function(email, password) {
    if(!/^\w+@\w{2,}\.\w{2,3}$/.test(email)) {
        throw new Error('The email is not valid')
    }
    if(!/^\S{8,64}$/.test(password)) {
        throw new Error('The password is not valid')
    }
    const user = await this.findOne({email})
    console.log(user)

    if(!user) {
        throw new Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)
    if(!match) {
        throw new Error('Incorrect password')
    }
    return user;
}

module.exports = mongoose.model('User', userSchema);