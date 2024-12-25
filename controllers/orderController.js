const mongoose = require("mongoose");
const Order = require("../models/orderModel");
const asyncHandler = require("express-async-handler");
const Food = require("../models/foodModel");

// @desc Place an order
// @route POST /api/order/order
// @access Public
const placeOrder = asyncHandler(async (req, res) => {
  const { customer, items, deliveryaddress, paymentmethod } = req.body;

  // Check for required fields
  if (!customer || !items || !deliveryaddress || !paymentmethod) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // Validate items and calculate total price
  const foodIds = items.map((item) => item.foodId);
  const foods = await Food.find({ _id: { $in: foodIds } });

  if (foods.length !== items.length) {
    const invalidFoodIds = foodIds.filter(
      (id) => !foods.some((food) => food._id.equals(id))
    );
    res.status(400);
    throw new Error(`Invalid food IDs: ${invalidFoodIds.join(", ")}`);
  }

  let totalPrice = 0;
  const orderItems = items.map((item) => {
    const food = foods.find((food) => food._id.equals(item.foodId));
    const itemPrice = food.price * item.quantity;
    totalPrice += itemPrice;

    return {
      food: food._id,
      quantity: item.quantity,
      price: itemPrice,
    };
  });

  // Create the order
  const order = await Order.create({
    customer,
    items: orderItems,
    totalPrice,
    deliveryaddress,
    paymentmethod,
    orderstatus:"Pending" // Default order status
  });

  // Send response
  if (order) {
    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } else {
    res.status(400);
    throw new Error("Order is not valid");
  }
});

module.exports = { placeOrder };
