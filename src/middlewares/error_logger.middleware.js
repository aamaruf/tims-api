export const errlogger = (err, req, res, next) => {
    console.log(err);

    return res.status(err.status || 500).json({
        message: err.message,
        status: res.statusCode || 500,
        route: req.originalUrl,
        timestamps: new Date().toLocaleString(),
    });
};

