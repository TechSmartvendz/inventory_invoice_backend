const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../../models/inventoryModels/users.model');
const { createError } = require('../../utils/createError');

const register = async (req, res, next) => {
    const { userName, password, ...otherDetails } = req.body;
    try {
        const checkUserIsAlreadyExist = await UserModel.findOne({ userName });
        if (checkUserIsAlreadyExist) {
            return next(createError(201, "User Already Exist"));
        }
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                next(err)
            }
            else {
                const newUser = new UserModel({
                    userName,
                    password: hash, // Store hash password in DB.
                    ...otherDetails,
                });
                await newUser.save();
                res.status(200).send({ userName, message: "User has been created!" })
            }

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
                const token = jwt.sign({ id: user._id, role: user.role }, "shhhhh");
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
                next(createError(400, "Wrong Password or Username!"))
            }
        });
    } catch (err) {
        next(err);
    }
};


module.exports = { register, login }