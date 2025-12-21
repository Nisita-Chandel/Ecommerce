const errorHandler = (err, req, res, next) => {
  console.error(err);

  res.status(res.statusCode && res.statusCode !== 200 ? res.statusCode : 500)
    .json({
      message: err.message || "Server Error",
    });
};

export default errorHandler;
