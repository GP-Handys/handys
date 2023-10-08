import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from "../models/Users"
import { extractUserFromJwt } from '../utils/tokenUtils';

dotenv.config();

export const signup = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password, phone_number } = req.body;
    try {
        let user = await User.findOne({ where: { email: email } });
        if (user) {
            res.status(400).json("User already exists");
        } else {
            user = await User.create({
                name,
                email,
                password: await bcrypt.hash(password, 10),
                phone_number,
            });
            if (user) {
                res.status(200).json("User created successfully");
            } else {
                res.status(500).json("Failed to create user");
            }
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email: email } });

        if (user == null) {
            res.status(401).send("Invalid credentials");
        } else {
            const isCorrectPassword = await bcrypt.compare(password, user.password);
            if (isCorrectPassword) {
                const id = user.id;
                const token = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '1h' });
                res.send(token);
            } else {
                res.status(401).send("Invalid credentials");
            }
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const user = await User.findByPk(id);

        if (user) {
            res.status(200).json(user);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const jwtToken = req.get("Authorization");
        const userIdToken = extractUserFromJwt(jwtToken as string);
        const userId = req.params.id;
        let user = await User.findByPk(userId);
        const { name, email, password, phone_number } = req.body;
        const data = { name, email, password: await bcrypt.hash(password, 10), phone_number };

        if (user == null) {
            res.sendStatus(404);
            return;
        }

        if (user.is_sys_admin || Number(userIdToken) == Number(user.id)) {
            user = await user.update(data);
            if (user) {
                res.status(200).json("User modified");
            } else {
                res.sendStatus(500);
            }
        } else {
            res.sendStatus(403);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const jwtToken = req.get("Authorization")?.toString()!
        const userIdToken = extractUserFromJwt(jwtToken);
        const id = Number(req.params.id)
        const user = await User.findByPk(id);

        if (user == null) {
            res.sendStatus(404);
            return;
        }

        if (user.is_sys_admin || id == userIdToken) {
            const deletedUser:any = await user.destroy();
            if (deletedUser) {
                res.status(200).json({ message: "User created successfully" });
            } else {
                res.status(500).json({ message: "Failed to create user" }); 
            }
        } else {
            res.sendStatus(403);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};
