import { Request, Response } from "express";
import { openai } from "../app";

export const generateImage = async (req: Request, res: Response) => {
  const prompt: any = req.query.prompt;
  const response = await openai.images.generate({
    model: "dall-e-2",
    prompt: prompt,
    n: 1,
    size: "1024x1024",
  });
  res.status(200).json(response.data[0].url);
};
