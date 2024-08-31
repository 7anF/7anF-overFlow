"use server";

import User from "@/database/userModel";
import { connectToDatabase } from "../mongoose";

export async function getrUserById(params: any) {
  try {
    connectToDatabase();
    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    return user;
  } catch (error) {}
}
