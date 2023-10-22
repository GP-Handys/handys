import * as dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
const tokenValidate = (req: any, res: any, next: any) => {
  const token = req.get("Authorization");

  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err: any) => {
      if (err) {
        res.sendStatus(401);
      } else {
        next();
      }
    });
  } else {
    res.sendStatus(401);
  }
};

export { tokenValidate };
