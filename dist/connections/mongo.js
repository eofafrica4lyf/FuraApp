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
  name: String,
  noOfOrders: Number,
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
userSchema.methods.generateAuthToken = function() {
  // Generate a new json web token: takes the payload a private key (don't store your
  // secrets in code, but in environment variables)
  // iat determines the age of the jwt
  const token = jsonwebtoken_1.default.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    "jwtPrivateKey"
  );
  return token;
};
const Order = mongoose_1.default.model("Order", orderSchema);
const User = mongoose_1.default.model("User", userSchema);
async function getOrders() {
  const result = await Order.find();
  console.log(result);
  return result;
}
exports.getOrders = getOrders;
async function createOrder(payload) {
  console.log("result");
  const order = new Order(payload);
  const result = await order.save();
  console.log(result);
  console.log("Contact was saved to the database");
  return order;
}
exports.createOrder = createOrder;
async function removeOrder(payload) {
  const result = await Order.deleteOne({ _id: payload.orderID });
  console.log({ _id: payload.orderID });
  console.log(result);
  console.log("Order was removed from the database");
}
exports.removeOrder = removeOrder;
async function loginAdmin(payload) {
  console.log(payload);
  const { error } = validateUser(payload);
  if (error) return { message: error.details[0].message };
  // Ensure that user is not already registered
  console.log(payload.email);
  let user = await User.findOne({ email: payload.email });
  console.log("user");
  console.log(user);
  // We send 400 as a status code so that we do not let the user know whether it's
  // the username or password that is wrong
  if (!user) return { message: "Invalid email or password" };
  if (payload.password !== user.password)
    return { message: "Invalid email or password" };
  //encapsulating logic in mongoose
  const token = user.generateAuthToken();
  console.log(token);
  return { id: user._id, token };
}
exports.loginAdmin = loginAdmin;
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
