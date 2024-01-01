import { Request, Response } from "express";
import { openai } from "../app";

export const generateImage = async (req: Request, res: Response) => {
  const response = await openai.images.generate({
    model: "dall-e-2",
    prompt: "i am a professional handicrafter. PLEASE design me a bracelet with a flower on it and a diamond in the middle",
    n: 1,
    size: "1024x1024",
  });
  res.status(200).json(response.data[0].url);
};
