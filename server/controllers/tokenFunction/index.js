require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");

module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: "1d" });
  },
  isAuthorized: (req) => {
    console.log("요청머냐~", req.headers);
    const authorization = req.headers.authorization;
    const token = authorization.split(" ")[1];
    // const token = req.cookies.jwt;

    if (!token) {
      return null;
    }
    try {
      //   const token = authorization.split("=")[1];
      //   console.log(token);
      return verify(token, process.env.ACCESS_SECRET);
    } catch (err) {
      return null;
    }
  },
};
