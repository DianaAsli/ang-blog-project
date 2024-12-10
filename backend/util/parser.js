function errorHandler(err, req, res, next) {
    
    if (err.name === 'ValidationError') {
        const validationErrors = Object.values(err.errors).map(v => v.message)
        return res.status(400).json({
            message: validationErrors.join(',')
        })
    }

    const statusCode = err.status || 500;
    const message = err.message || 'Internal server error'

    let error = res.status(statusCode).json({
        message
    });

    console.log(error);
    return error;
    
    
}

module.exports = errorHandler;