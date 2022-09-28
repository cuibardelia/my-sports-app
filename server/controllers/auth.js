const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

exports.register = async (request, response, next) => {
    // response.send('Register route')
    const {username, email, password} = request.body;

    try {
        const user = await User.create({
            username, email, password
        })

        sendToken(user, 201, response);
    } catch (error) {
      next(error);
    }
};

exports.login = async (request, response, next) => {
    const {email, password} = request.body;

    // good practice to check on BE side as well
    if(!email || !password) {
        return next(new ErrorResponse("Please provide an email and password"), 400);
    }

    try {
        const user = await User.findOne({email}).select("+password");

        if(!user) {
            return next(new ErrorResponse("Invalid credentials"), 401);
        }

        const isVerified = await user.checkPassword(password);

        if(!isVerified) {
            return next(new ErrorResponse("Invalid password"), 404);
        }

        sendToken(user, 200, response);


    } catch (error) {
        next(error);
    }

};

exports.forgotPassword = (request, response, next) => {
    response.send('Forgot route')
};

exports.resetPassword = (request, response, next) => {
    response.send('Reset route')
};

const sendToken = (user, statusCode, response) => {
    const token = user.getSignedToken();
    response.status(statusCode).json({success: true, token})
}