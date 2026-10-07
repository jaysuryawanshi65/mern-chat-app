const jwt = require("jsonwebtoken");

function protect(req) {
  return new Promise((resolve, reject) => {
    const token = req.cookies?.authToken;
    if (!token) return reject(new Error("No token"));
    jwt.verify(token, process.env.JWTPRIVATEKEY, (err, userData) => {
      if (err) return reject(err);
      resolve(userData);
    });
  });
}

module.exports = protect;
