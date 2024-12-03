const Joi = require("joi");
const CustomErrorHandler = require("./CustomErrors");

const { ValidationError } = Joi;

// error handeling middleware
const errorHandler = (err, req, res, next) => {
    let statusCode = 500;

    let data = {
        ...err,
        success: false,
        message: "Internal server error",
        ...(process.env.DEBUG_MODE === "true" && { originalError: err.message }),
    };

    if (err.code === 11000) {
        statusCode = 400;
        data = {
            success: false,
            message: err.message,
        };
    }
    // from joi
    if (err instanceof ValidationError) {
        // 422 mean validation error code
        statusCode = 422;
        data = {
            success: false,
            message: err.message,
        };
    }

    //  from custom err handeler
    if (err instanceof CustomErrorHandler) {
        statusCode = err.status;
        data = {
            success: false,
            message: err.message,
        };
    }

    return res.status(statusCode).json(data);
};

module.exports = errorHandler;