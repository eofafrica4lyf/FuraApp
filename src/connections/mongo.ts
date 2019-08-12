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

  return result;
}

export async function createOrder(payload: any) {
  const order = new Order(payload);

  await order.save();
  return order;
}

export async function removeOrder(payload: any) {
  try {
    await Order.deleteOne({ _id: payload.orderID });

    return { data: "Order was deleted", deleted: true };
  } catch (error) {
    return { data: "Order was not deleted", deleted: false };
  }
}

export async function loginAdmin(payload: any) {
  // console.log(payload);
  const { error } = validateUser(payload);
  if (error) return { message: error.details[0].message };

  // Ensure that user is not already registered

  let user = await User.findOne({ email: payload.email });

  if (!user) return { message: "Invalid email or password" };

  if (payload.password !== user.password)
    return { message: "Invalid email or password" };

  //encapsulating logic in mongoose
  const token = user.generateAuthTokenAdmin();

  return { id: user._id, name: user.name, token };
}

export async function loginUser(payload: any) {
  const { name, email } = payload;
  let user = await User.findOne({ email: payload.email });
  if (!user) {
    user = await User.create({
      name,
      email,
      password: "password",
    });
  }

  //encapsulating logic in mongoose
  const token = user.generateAuthTokenUser();

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
