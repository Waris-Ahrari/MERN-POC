const mongoose = require('mongoose')
const crypto = require('crypto')


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    phone: {
        type: Number,
        default: 1234567890
    },
    gender:{
        type: String,
        default: 'Male'
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: String,
    role: {
        type: String,
        default: 'Engineer'
        // We have more type(normal, admin .....)
    },
    resetPasswordLink: {
        data: String,
        default: ''
    }
}, { timestamp: true })

userSchema.virtual('password')
    .set(function (password) {
        // set password note you must use normal function not arrow function
        this._password = password
        this.salt = this.makeSalt()
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function () {
        return this._password
    })

userSchema.methods = {
    // Generate Salt
    makeSalt: function () {
        return Math.round(new Date().valueOf() * Math.random()) + ''
    },
    // Encypt Password
    encryptPassword: function (password) {
        if (!password) return ''
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        } catch (err) {
            return ''
        }
    },
    // Compare password between plain get from user and hashed
    authenticate: function (plainPassword) {
        return this.encryptPassword(plainPassword) === this.hashed_password
    }
}

module.exports = mongoose.model('User', userSchema)