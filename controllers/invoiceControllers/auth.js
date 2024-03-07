const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const user_id = req.body.user_id;
  const password = req.body.password;
  const sendData = await TableModel.getLoginData(user_id);
  // console.log(sendData);
  if (sendData) {
    const passwordmatch = await bcrypt.compare(password, sendData.password);
    const data = {
      username: sendData.first_name,
      role: sendData.role,
      token: sendData.token,
    };
    if (passwordmatch) {
      return res.status(200)
      .send({
          success: false,
          data,
      });
    } else {
      return res.status(200)
      .send({
          success: false,
          message: "invalid Password",
          machines,
      });
    }
  } else {
    return rc.setResponse(res, {
      msg: "User not Found",
      data: { user_id: user_id },
    });
  }
};


const login = async (req, res) => {
  const user_id = req.body.user_id;
  const password = req.body.password;
  const sendData = await TableModel.getLoginData(user_id);
  // console.log(sendData);
  if (sendData) {
    const passwordmatch = await bcrypt.compare(password, sendData.password);
    const data = {
      username: sendData.first_name,
      role: sendData.role,
      token: sendData.token,
    };
    if (passwordmatch) {
      return rc.setResponse(res, {
        success: true,
        msg: "Data Fetched",
        data: data,
      });
    } else {
      return rc.setResponse(res, {
        msg: "Invalid Password",
      });
    }
  } else {
    return rc.setResponse(res, {
      msg: "User not Found",
      data: { user_id: user_id },
    });
  }
};




module.exports = {register, login};
