const { tips } = require("../../models");
const { isAuthorized } = require("../tokenFunction");

module.exports = async (req, res) => {
  // console.log(req.cookies);
  const userinfo = isAuthorized(req);

  if (!userinfo) {
    return res.status(400).json({ message: "Invalid token" });
  } else {
    const user_id = userinfo.id;
    const { title, content } = req.body.data;

    await tips.create({ user_id, title, content });

    return res
      .status(201)
      .json({ message: "The article is successfully posted" });
  }
};
