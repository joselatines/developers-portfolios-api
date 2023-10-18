import { Request, Response } from "express";
import APIResponse from "../../interfaces/responses/APIResponse";
import { User, UserDocument } from "../../database/models/user.model";

export async function getAllUsers(req: Request, res: Response<APIResponse>) {
  try {
    const users = await User.find({});
    res.status(200).json({ message: "Get all users", success: true, data: users });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false, error });
  }
}

export async function createUser(req: Request, res: Response<APIResponse>) {
  try {
    const user: UserDocument = req.body;
    const userCreated = await User.create(user);
    res.status(201).json({ message: "User created", success: true, data: userCreated });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false, error });
  }
}

export async function getUser(req: Request, res: Response<APIResponse>) {
  try {
    const userId = req.params.id;
    const userFound = await User.findById(userId);
    res.status(200).json({ message: "User found", success: true, data: userFound });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false, error });
  }
}

export async function deleteUser(req: Request, res: Response<APIResponse>) {
  try {
    const userId = req.params.id;
    const userDeleted = await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted", success: true, data: userDeleted });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false, error });
  }
}

export async function editUser(req: Request, res: Response<APIResponse>) {
  try {
    const userId = req.params.id;
    const user = req.body;
    const userEdited = await User.findByIdAndUpdate(userId, user, { new: true });
    res.status(200).json({ message: "User edited", success: true, data: userEdited });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false, error });
  }
}
