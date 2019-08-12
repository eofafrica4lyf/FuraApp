import jwt from "jsonwebtoken";

export default function decode(req: any, res: any, next: any) {
  const token = req.header("x-auth-token");
  if (!token) {
    console.log("Auth took control 1");
    return res
      .status(401)
      .send({ data: "Access denied. No token provided.", deleted: false });
  }

  try {
    const decoded = jwt.verify(token, "jwtPrivateKey");
    req.user = decoded;
  } catch (ex) {
    console.log("Auth took control 2");
    return res.status(400).send({
      data: "Invalid token: token has been tampered with",
      deleted: false,
    });
  }
  next();
}
