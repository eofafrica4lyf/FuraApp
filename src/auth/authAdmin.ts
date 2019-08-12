export default function authAdmin(req: any, res: any, next: any) {
  console.log("req.user");
  console.log(req.user);
  console.log(req.body);
  if (req.user.isAdmin !== true) {
    return res
      .status(400)
      .send({ data: "User is not an admin", deleted: false });
  }
  next();
}
