module.exports = (error, req, res, next) => {
  const { title, errors, status, description } = error;

  // const status = error.status || 500;
  // if (status == 500) {
  //   description = 'Serveur cassé. Revenez plus tard.';
  // }

  if (error.name === 'ValidationError') {
    res.status(status).json({
      errors,
    });
  } else {
    res.status(status).json({
      title,
      description,
    });
  }
};
