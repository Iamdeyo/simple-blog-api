const responseBody = (
  res,
  statusCode,
  success,
  message,
  data = null,
  error = null
) => {
  return res.status(statusCode).json({
    success,
    message,
    data,
    error,
  });
};

export default responseBody;
