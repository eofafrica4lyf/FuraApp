import Order from "../connections/mongo";

export default async function authUser(req: any, res: any, next: any) {
  console.log("req.user2");
  console.log(req.user);
  console.log(req.body);
  if (req.user.isAdmin === true) {
    next();
  }
  const order = await Order.find({
    $and: [{ userId: req.user._id }, { _id: req.body.orderID }],
  });
  console.log(order);
  if (order.length === 0) {
    return res.status(400).send({
      data:
        "The order was not made by the user. Hence, the user cannot modify it",
      deleted: false,
    });
  }
  next();
}
