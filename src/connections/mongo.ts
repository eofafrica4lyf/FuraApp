import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Joi from "joi";

mongoose
  .connect(process.env.MONGO_URI!, { useNewUrlParser: true })
  //   .connect("mongodb://localhost/orders", { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB Atlas!"))
  .catch(err => console.error("Could not connect to MongoDB Atlas...", err));

const orderSchema = new mongoose.Schema<any>({
  userId: String,
  name: String,
  noOfOrders: Number,
  orderType: String,
  createdAt: Date,
});
const userSchema = new mongoose.Schema<any>({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  isAdmin: Boolean,
});
//Define a method inside the schema
userSchema.methods.generateAuthTokenAdmin = function() {
  // Generate a new json web token: takes the payload a private key (don't store your
  // secrets in code, but in environment variables)
  // iat determines the age of the jwt
  const token = jwt.sign({ _id: this._id, isAdmin: true }, "jwtPrivateKey");
  return token;
};

userSchema.methods.generateAuthTokenUser = function() {
  // Generate a new json web token: takes the payload a private key (don't store your
  // secrets in code, but in environment variables)
  // iat determines the age of the jwt
  const token = jwt.sign({ ...this._doc }, "jwtPrivateKey");
  return token;
};

const Order = mongoose.model<any>("Order", orderSchema);
const User = mongoose.model<any>("User", userSchema);

export async function getOrders() {
  const result = await Order.find();
  console.log(result);

  return result;
}

export async function createOrder(payload: any) {
  console.log("result");
  const order = new Order(payload);

  const result = await order.save();
  console.log(result);
  console.log("Contact was saved to the database");
  return order;
}

export async function removeOrder(payload: any) {
  try {
    const result: any = await Order.deleteOne({ _id: payload.orderID });
    console.log(result);

    return { data: "Order was deleted", deleted: true };
    // if(result.deleteCount > 0){
    // }else{
    //   throw new Error("Order was not deleted!")
    // }
  } catch (error) {
    return { data: "Order was not deleted", deleted: false };
  }
  // console.log("payload");
  // console.log(payload);
  // console.log({ _id: payload.orderID });
  // console.log("resulttyuytyut");
  // console.log(result);
  // console.log("Order was removed from the database");
}

export async function loginAdmin(payload: any) {
  // console.log(payload);
  const { error } = validateUser(payload);
  if (error) return { message: error.details[0].message };

  // Ensure that user is not already registered
  console.log(payload.email);

  let user = await User.findOne({ email: payload.email });
  // console.log("user");
  // console.log(user);
  // We send 400 as a status code so that we do not let the user know whether it's
  // the username or password that is wrong
  if (!user) return { message: "Invalid email or password" };

  if (payload.password !== user.password)
    return { message: "Invalid email or password" };

  //encapsulating logic in mongoose
  const token = user.generateAuthTokenAdmin();
  console.log("token");
  console.log(token);

  return { id: user._id, name: user.name, token };
}

export async function loginUser(payload: any) {
  console.log("payload");
  console.log(payload);
  const { name, email } = payload;
  let user = await User.findOne({ email: payload.email });
  if (!user) {
    user = await User.create({
      name,
      email,
      password: "password",
    });
  }
  console.log("user");
  console.log(user);
  //encapsulating logic in mongoose
  const token = user.generateAuthTokenUser();
  console.log(token);

  // return { message: "Invalid email or password" };
  return { id: user._id, name: user.name, email: user.email, token };
}

function validateUser(req: any) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
  };
  return Joi.validate(req, schema);
}
export default Order;
