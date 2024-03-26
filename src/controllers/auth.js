import jwt from "jsonwebtoken";
import User from "../db/models/users.js";
import responseBody from "../utils/responseBody.js";

// @desc Register user
// route POST auth/register
// @access public
const register = async (req, res) => {
  const { username, password, confirmPassword } = req.body;
  const displayPhoto = req.file ? req.file.path : null;

  if (!displayPhoto) {
    return responseBody(
      res,
      400,
      false,
      "No Image file uploaded. Allowed format (jpeg|jpg|png)"
    );
  }

  if (!username || !password) {
    return responseBody(res, 400, false, "All fields are required");
  }

  if (username.lenght < 4) {
    return responseBody(
      res,
      400,
      false,
      "Username must be at least 4 characters"
    );
  }
  if (password.lenght < 6) {
    return responseBody(
      res,
      400,
      false,
      "Password must be at least 6 characters"
    );
  }

  if (confirmPassword !== password) {
    return responseBody(
      res,
      400,
      false,
      "Confirm Password and Password do not match"
    );
  }
  try {
    const userExists = await User.findOne({ username: username.toLowerCase() });
    if (userExists) {
      return responseBody(res, 400, false, "Username already exists");
    }

    const user = await User.create({
      username: username.toLowerCase(),
      password,
      displayPhoto,
    });

    if (!user) {
      return responseBody(res, 500, false, "Something went wrong");
    }

    const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    const data = {
      token: token,
      user,
    };

    return responseBody(res, 201, true, "User created successfully", data);
  } catch (error) {
    console.log(error);
    return responseBody(res, 500, false, "Internal Server Error");
  }
};

// @desc Login user
// route POST auth/Login
// @access public
const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return responseBody(res, 400, false, "All fields are required");
  }

  if (username.lenght < 4) {
    return responseBody(
      res,
      400,
      false,
      "Username must be at least 4 characters"
    );
  }
  if (password.lenght < 6) {
    return responseBody(
      res,
      400,
      false,
      "Password must be at least 6 characters"
    );
  }

  try {
    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user) {
      return responseBody(res, 404, false, "Username not found");
    }

    const matchPassword = await user.matchPassword(password);

    if (!matchPassword) {
      return responseBody(res, 400, false, "Incorrect password");
    }

    const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    const data = {
      token: token,
      user,
    };

    return responseBody(res, 200, true, "User Login successfully", data);
  } catch (error) {
    console.log(error);
    return responseBody(res, 500, false, "Internal Server Error");
  }
};

export { register, login };
