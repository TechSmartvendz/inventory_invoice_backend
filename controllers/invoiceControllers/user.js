const { size, toLower } = require("lodash");


const forgotPasswordOtp = async (req, res) => {
  const pararms = req.body;
  const checkEmail = await utils.getData(invUser, {
    userEmail: toLower(pararms.email),
    isDeleted: false,
  });
  if (!size(checkEmail)) {
    return rc.setResponse(res, {
      success: false,
      msg: "This Email or Phone is not registered with us.",
    });
  }
  const randomNum = Math.floor(Math.random() * 9000) + 1000;
  pararms.otp = randomNum;
  const html = "Hi User your verification code is :'" + pararms.otp + "'";
  const data = await utils.updateData(
    invUser,
    {
      userEmail: toLower(pararms.email),
    },
    pararms
  );
  return rc.setResponse(res, {
    success: true,
    msg: "Otp send to your mail",
  });
};

const verifyOtp = async (req, res) => {
  const pararms = req.body;
  const filter = { userEmail: req.query.email, isDeleted: false };
  const projection = { otp: 1 };
  const options = {};
  const checkOtp = await utils.getData(invUser, filter, projection, options);
  if (checkOtp[0].otp == pararms.otp) {
    return rc.setResponse(res, {
      success: true,
      msg: "Otp verified",
    });
  }
  return rc.setResponse(res, {
    success: false,
    msg: "Otp is wrong!",
  });
};

const changePassword = async (req, res) => {
  const pararms = req.body;

  const obj = {
    password: passwordHash,
  };
  const data = await utils.updateData(invUser, { userEmail: req.query.email }, obj);
  return rc.setResponse(res, {
    success: true,
    msg: "Password changed successfully",
  });
};

module.exports = {
  forgotPasswordOtp,
  verifyOtp,
  changePassword,
};
