import { Request, Response } from "express";
import { Post } from "../models/Post";
import { User } from "../models/User";
import { extractUserFromJwt } from "../utils/tokenUtils";

export const addPost = async (req: Request, res: Response) => {
  const { title, content, img_url } = req.body;

  const jwt = req.get("Authorization")?.toString()!;
  const userId = extractUserFromJwt(jwt);

  try {
    const post = await Post.create({
      title: title,
      content: content,
      img_url: img_url,
      is_first_post: true,
      userId: userId,
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const addCommentOnPost = async (req: Request, res: Response) => {
  const { content, img_url } = req.body;

  const jwt = req.get("Authorization")?.toString()!;
  const userId = extractUserFromJwt(jwt);
  const parentId: number = Number(req.params.parentId);

  try {
    const comment = await Post.create({
      content: content,
      img_url: img_url,
      is_first_post: false,
      userId: userId,
      parentId: parentId,
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const votePost = async (req: Request, res: Response) => {
  const postId: number = Number(req.params.postId);
  const voteType: string = req.params.voteType;
  let post: Post | null;
  try {
    post = await Post.findByPk(postId);
  } catch (error) {
    res.status(500).json(error);
    return;
  }

  if (post == null) {
    res.sendStatus(404);
    return;
  }

  const newVotesCount = post.votes + (voteType == "up" ? 1 : -1);
  try {
    await Post.update(
      {
        votes: newVotesCount,
      },
      {
        where: {
          postId: postId,
        },
      }
    );
    res.status(200).json("Voted " + voteType + " successfuly");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const resolvePost = async (req: Request, res: Response) => {
  const postId = Number(req.params.postId);
  let post: Post | null;
  try {
    post = await Post.findByPk(postId);
  } catch (error) {
    res.status(500).json(error);
    return;
  }

  if (post == null) {
    res.sendStatus(404);
    return;
  }

  const jwt = req.get("Authorization")?.toString()!;
  const userId = extractUserFromJwt(jwt);
  const user = await User.findByPk(userId);

  if (!user?.is_sys_admin || userId != post.userId) {
    res.sendStatus(403);
    return;
  }

  try {
    await Post.update(
      {
        is_resolved: true,
      },
      {
        where: {
          postId: postId,
        },
      }
    );
    res.status(200).json("Post resolved");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const postId: number = Number(req.params.postId);
  let post: Post | null;
  try {
    post = await Post.findByPk(postId);
  } catch (error) {
    res.status(500).json(error);
    return;
  }

  if (post == null) {
    res.sendStatus(404);
    return;
  }

  const jwt = req.get("Authorization")?.toString()!;
  const userId = extractUserFromJwt(jwt);
  const user = await User.findByPk(userId);

  if (!user?.is_sys_admin || post.userId != userId) {
    res.sendStatus(403);
    return;
  }

  try {
    await Post.update(
      {
        is_deleted: true,
      },
      {
        where: {
          postId: postId,
        },
      }
    );
    res.status(200).json("Post deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const editPost = async (req: Request, res: Response) => {
  const { img_url, content, title } = req.body;

  const postId: number = Number(req.params.postId);
  let post: Post | null;
  try {
    post = await Post.findByPk(postId);
  } catch (error) {
    res.status(500).json(error);
    return;
  }

  if (post == null) {
    res.sendStatus(404);
    return;
  }

  try {
    await Post.update(
      {
        img_url: img_url,
        content: content,
        title: title,
      },
      {
        where: {
          postI: postId,
        },
      }
    );
    res.status(200).json("Post edited");
  } catch (error) {
    res.status(500).json(error);
  }
};
