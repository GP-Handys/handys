import { Request, Response } from "express";
import { Post } from "../models/Post";
import { User } from "../models/User";
import { extractUserFromJwt } from "../utils/tokenUtils";
import { PostLike } from "../models/PostLike";

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
  const postId: number = Number(req.params.postId);

  try {
    const comment = await Post.create({
      content: content,
      img_url: img_url,
      is_first_post: false,
      userId: userId,
      parentId: postId,
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts: Post[] = await Post.findAll({
      where: {
        parentId: null,
      }
    }
    );
    res.status(200).json(posts.reverse());
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

export const getCommentsByPostId = async (req: Request, res: Response) => {
  const postId: number = Number(req.params.postId);
  let post: Post[];
  try {
    post = await Post.findAll({
      where: {
        parentId: postId,
      },
    });
  } catch (error) {
    res.status(500).json(error);
    return;
  }

  if (post == null) {
    res.sendStatus(404);
    return;
  }

  res.status(200).json(post.reverse());
};

export const LikePost = async (req: Request, res: Response) => {
  const jwt: string = req.get("Authorization")?.toString()!;
  const userId: number = extractUserFromJwt(jwt);
  const post_id = req.params.postId;
  try {
    await PostLike.create({
      post_id: post_id,
      user_id: userId,
    });
    // 201 = resource created. better convention :)
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};

export const removeLikePost = async (req: Request, res: Response) => {
  const jwt: string = req.get("Authorization")?.toString()!;
  const user_id: number = extractUserFromJwt(jwt);
  const post_id = req.params.postId;
  try {
    await PostLike.destroy({
      where: {
        user_id,
        post_id,
      },
    });
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};

export const getLikedPosts = async (req: Request, res: Response) => {
  const jwt: string = req.get("Authorization")?.toString()!;
  const userId: number = extractUserFromJwt(jwt);

  try {
      const result = await PostLike.findAll({
        where: { user_id: userId },
        attributes: ["post_id"],
      });
      const idsOnly = result.map((obj) => obj.post_id);
      res.status(200).json(idsOnly);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};

export const getPostsForUserId = async (req: Request, res: Response) => { 
  const jwt: string = req.get("Authorization")?.toString()!;
  const userId: number = extractUserFromJwt(jwt);

  try {
    const posts: Post[] = await Post.findAll({
      where: {
        userId: userId,
        parentId: null,
      },
    });
    res.status(200).json(posts.reverse());
  } catch (error) {
    res.status(500).json(error);
  }
};