const { constants } = require("./statusCodes.middleware.js");

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    
    switch(statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({ title: "Validation Failed", message: err.message });
            break;
        case constants.UNAUTHORIZED:
            res.json({ title: "Authentication Failed",message: err.message });
            break;
        case constants.FORBIDDEN:
            res.json({ title: "Authorization Failed",message: err.message });
            break;
        case constants.NOT_FOUND:
            res.json({ title: "Not Found", message: err.message });
            break;
        case constants.SERVER_ERROR:
            res.json({ title: "Server Error", message: err.message });
            break;
        default:
            res.json({ message: err.message });
            break;
    }
}