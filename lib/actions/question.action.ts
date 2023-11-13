"use server";

import { connectToDatabase } from "../mongoose";

export async function createQuestion(params: any) {
  try {
    // connect to db
    connectToDatabase();
  } catch (error) {}
}
