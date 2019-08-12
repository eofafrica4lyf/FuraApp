"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const joi_1 = __importDefault(require("joi"));
mongoose_1.default
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  //   .connect("mongodb://localhost/orders", { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB Atlas!"))
  .catch(err => console.error("Could not connect to MongoDB Atlas...", err));
const orderSchema = new mongoose_1.default.Schema({
  userId: String,
  name: String,
  noOfOrders: Number,
  orderType: String,
  createdAt: Date,
});
const userSchema = new mongoose_1.default.Schema({
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
  const token = jsonwebtoken_1.default.sign(
    { _id: this._id, isAdmin: true },
    "jwtPrivateKey"
  );
  return token;
};
userSchema.methods.generateAuthTokenUser = function() {
  // Generate a new json web token: takes the payload a private key (don't store your
  // secrets in code, but in environment variables)
  // iat determines the age of the jwt
  const token = jsonwebtoken_1.default.sign(
    Object.assign({}, this._doc),
    "jwtPrivateKey"
  );
  return token;
};
const Order = mongoose_1.default.model("Order", orderSchema);
const User = mongoose_1.default.model("User", userSchema);
async function getOrders() {
  const result = await Order.find();
  return result;
}
exports.getOrders = getOrders;
async function createOrder(payload) {
  const order = new Order(payload);
  await order.save();
  return order;
}
exports.createOrder = createOrder;
async function removeOrder(payload) {
  try {
    await Order.deleteOne({ _id: payload.orderID });
    return { data: "Order was deleted", deleted: true };
  } catch (error) {
    return { data: "Order was not deleted", deleted: false };
  }
}
exports.removeOrder = removeOrder;
async function loginAdmin(payload) {
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
exports.loginAdmin = loginAdmin;
async function loginUser(payload) {
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
exports.loginUser = loginUser;
function validateUser(req) {
  const schema = {
    email: joi_1.default
      .string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: joi_1.default
      .string()
      .min(5)
      .max(255)
      .required(),
  };
  return joi_1.default.validate(req, schema);
}
exports.default = Order;
//# sourceMappingURL=mongo.js.map
