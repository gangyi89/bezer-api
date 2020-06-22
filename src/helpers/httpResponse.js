module.exports = function (statusCode = 200, message) {
  if (message) {
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      statusCode,
      body: JSON.stringify(
        typeof message === "object" ? { ...message } : { message }
      ),
    };
  }
  return {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    statusCode,
  };
};
