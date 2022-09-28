const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

exports.protect = async (request, response, next) => {
    let token;

    if(request.headers.authorization && request.headers.authorization.startsWith("Bearer")) {
        token = request.headers.authorization.split(" ")[1];
    }

    if(!token) {
        return next(new ErrorResponse("Not Authorized to acces this route", 401));
    }


    try{
       const decoded = jwt.verify(token, "1a52bef869afc7ac710a23102f27fa7580f9fd980c2709f73ce6838f35fe99354bba19");

       const user = User.findById(decoded.id);

       if(!user) {
            return next(new ErrorResponse("User not found", 404));
       }

       request.user = user;

       next();
    } catch (err) {
        return next(new ErrorResponse("Not authorizes to access this route", 401));
    }
}