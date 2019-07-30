import jwt from "jsonwebtoken";

export default function auth(req: any, res: any, next: any) {
  const token = req.header("x-auth-token");
  if (!token) {
    console.log("Auth took control 1");
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, "jwtPrivateKey");
    req.user = decoded;
    next();
  } catch (ex) {
    console.log("Auth took control 2");
    res.status(400).send("Invalid token: token has been tampered with");
  }
}
