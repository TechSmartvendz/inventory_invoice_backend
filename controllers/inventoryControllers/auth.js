const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createError } = require("../utils/createError");
const { UserModel } = require('../../models/inventoryModels/users.model');

const register = async (req, res, next) => {
    const { userName, firstName, lastName, mobileNumber, email, address, country, state, city, area, profile_pic, createdBy, role, password, admin } = req.body;
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                next(err)
            }
            else {
                const newUser = new UserModel({
                    userName,
                    firstName,
                    lastName,
                    mobileNumber,
                    email,
                    address,
                    country,
                    state,
                    city,
                    area,
                    profile_pic,
                    createdBy,
                    role,
                    admin,
                    password: hash,
                });
                await newUser.save();
                res.status(200).send({ userName: firstName, message: "User has been created!" })
            }
            // Store hash in your password DB.
        });
    }
    catch (err) {
        next(err)
    }
}

const login = async (req, res, next) => {
    const { userName, password } = req.body;
    try {
        const user = await UserModel.findOne({ userName });
        // console.log('user: ', user);
        if (!user) {
            return next(createError(404, "User not found!"));
        }
        bcrypt.compare(password, user.password).then((result) => {
            if (result) {
                const token = jwt.sign({ id: user._id }, "shhhhh");
                const { password, ...otherDetails } = user._doc; // user._doc console this you can see the details
                // console.log('user._doc: ', user._doc);
                res
                    .cookie("access_token", token, {
                        httpOnly: true,
                        sameSite: "None",
                        secure: true,
                    })
                    .status(200)
                    .send({
                        user: { ...otherDetails, token },
                        message: "Login Successfully!",
                        success: true,
                    });
            } else {
                next(createError(400, "Wrong password or username!"));
            }
        });
    } catch (err) {
        next(err);
    }
};


module.exports = { register, login }