const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// TODO: better regex
// select - whenever we query a user, do we want the pass too?
const UserSkeem = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add a username"]
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
        match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Please add a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please add pwd"],
        minlength: 6,
        select: false,

    },
    resetPasswordToken: String,
    resetPasswordExp: Date,
});

// pre-saving and post-saving via mongoose
// no arrow function -> use of this
UserSkeem.pre("save", async function(next) {
    // first we make sure we don;t hash an already hashed pass
    if(!this.isModified("password")) {
        next();
    }

    // generate a salt, the higher the number, the more secure
    const salt = await bcrypt.genSalt(10);
    // save the new hashed password, then save the document
    this.password = await bcrypt.hash(this.password, salt);
    // FIXME: lookup salt and next
    next();
});

UserSkeem.methods.checkPassword = async function(pwd) {
    return await bcrypt.compare(pwd, this.password);
};

UserSkeem.methods.getSignedToken = function(pwd) {
    // hehe, generated secret via 'cypto' with randomBytes
    //FIXME: process?

    return jwt.sign({id: this._id}, '1a52bef869afc7ac710a23102f27fa7580f9fd980c2709f73ce6838f35fe99354bba19', {
        expiresIn: '10min'
    });
};

const User = mongoose.model("User", UserSkeem);

module.exports = User;

