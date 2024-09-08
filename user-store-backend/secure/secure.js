const apikey = `forum13`;

const secure = async (req, res, next) => {
  const auth = req.header("API_KEY");

  if (!auth || auth !== apikey) {
    return res.send([
      {
        status: 401,
        msg: "Unauthorized, Invalid API key",
      },
    ]);
  } else {
    next();
  }
};

module.exports = { secure };
