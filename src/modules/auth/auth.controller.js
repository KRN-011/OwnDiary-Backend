import { registerUserService, loginUserService } from "./auth.service.js";

// register user
export const registerUserController = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const registerServiceRes = await registerUserService({
      username,
      email,
      password,
    });

    if (!registerServiceRes.success) {
      return res.status(registerServiceRes.statusCode).json({
        success: false,
        message: registerServiceRes.message,
      });
    }

    return res.status(registerServiceRes.statusCode).json({
      success: true,
      message: registerServiceRes.message,
      data: registerServiceRes.data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// login user
export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const loginServiceRes = await loginUserService({ email, password });

    if (!loginServiceRes.success) {
      return res.status(loginServiceRes.statusCode).json({
        success: false,
        message: loginServiceRes.message,
      });
    }

    return res
      .status(loginServiceRes.statusCode)
      .cookie("token", loginServiceRes.data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7,
      })
      .json({
        success: true,
        message: loginServiceRes.message,
        data: loginServiceRes.data.user,
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// logout user
export const logoutUserController = async (req, res) => {
  try {
    const token = req.cookies.token

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    return res.clearCookie("token").status(200).json({
      success: true,
      message: "User Logged out Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// get current user
export const getCurrentUserController = async (req, res) => {
  try {
    const user = req.user;

    return res.status(200).json({
      success: true,
      message: "User Fetched Successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
