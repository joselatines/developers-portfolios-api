import { Request, Response } from "express";
import APIResponse from "../../../interfaces/responses/APIResponse";
import jwt from "jsonwebtoken";

import { User } from "../../../database/models/user.model";
import { compareEncrypted } from "../../../utils/helpers";

export async function loginController(
  req: Request,
  res: Response<APIResponse>
) {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
        success: false,
        data: {},
      });
    }

    // Check if the password is correct
    const isPasswordValid = await compareEncrypted(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
        success: false,
        data: {},
      });
    }

    // Creating a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "", {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login successful",
      success: true,
      data: { user, token },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", success: false, error });
  }
}
