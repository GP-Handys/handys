import { Request, Response } from "express";
import { openai } from "../app";
import { extractUserFromJwt } from "../utils/tokenUtils";
import GeneratedImage from "../models/GeneratedImage";

export const generateImage = async (req: Request, res: Response) => {
  const jwt: string = req.get("Authorization")?.toString()!;
  const userId = extractUserFromJwt(jwt);
  if (!userId) {
    res.status(403).json({ error: "Invalid token" });
    return;
  }
  const prompt: any = req.query.prompt;
  try {
    const response = await openai.images.generate({
      model: "dall-e-2",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

    if (response.data && response.data[0] && response.data[0].url) {
      const imageUrl = response.data[0].url;
      await GeneratedImage.create({
        image_url: imageUrl,
        userId: userId,
      });
      res.status(200).json(imageUrl);
    } else {
      res.status(500).json({ error: "Error generating image" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error generating image" });
  }
};

export const getGeneratedImagesForUser = async (
  req: Request,
  res: Response
) => {
  const jwt: string = req.get("Authorization")?.toString()!;
  const userId = extractUserFromJwt(jwt);
  if (!userId) {
    res.status(403).json({ error: "Invalid token" });
    return;
  }
  try {
    const images = await GeneratedImage.findAll({
      where: {
        userId: userId,
      },
    });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: "Error getting images" });
  }
};
