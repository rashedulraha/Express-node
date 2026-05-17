import type { Request, Response } from "express";
import { profileService } from "./profile.service";

const createProfile = async (req: Request, res: Response) => {
  try {
    const result = await profileService.createProfileIntoDB(req.body);
    res.status(result.rows.length === 0 ? 400 : 201).json({
      success: result.rows.length === 0 ? false : true,
      message:
        result.rows.length === 0
          ? "profile create failed"
          : "profile create successfully",
      result: result.rows[0] || [],
    });
  } catch (error) {
    const e = error as Error;
    res.status(400).json({
      message: e.message,
      error: e,
    });
  }
};

// export profile controller and control
export const profileController = {
  createProfile,
};
