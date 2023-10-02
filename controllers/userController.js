const userModel = require("../Models/UserModel")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const secretKey = "ewt_backend";


module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      let userDetails = await user.toObject();
      delete userDetails["password"];
      const token = jwt.sign({ userDetails: userDetails }, secretKey, { expiresIn: "1h" });
      return res.json({
        match: true,
        token: token,
        userDetails:userDetails
      });
    } else {
      return res.json({
        match: false,
      });
    }
  } catch {
    return res.json({
      userNotFound: true,
    });
  }
};

module.exports.register = async (req, res) => {
  const { name, email, password, } = req.body;
  const userCheck = await userModel.findOne({ email: email });
  try {
    if (userCheck) {
      return res.json({ userAlreadyExists: true });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await userModel.create({
      name: name,
      email: email,
      password: hashedPassword,
     
    });
    let userDetails = await createdUser.toObject();
    // delete user["password"];
    const token = jwt.sign({ userDetails: userDetails }, secretKey, {
      expiresIn: '1h',
    });
    res.json({
      userCreated: true,
      token: token,
      userDetails:userDetails
    });
  } catch {
    res.json({ userCreated: false });
  }
};
