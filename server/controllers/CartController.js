const { default: axios } = require("axios");
const { Cart, Merchandise, User, Order } = require("../models");
const midtransClient = require("midtrans-client");
const { v4: uuidv4 } = require("uuid");
const { now } = require("sequelize/lib/utils");

module.exports = class CartController {
  static async addCart(req, res, next) {
    try {
      const { id } = req.user;
      const { MerchandiseId } = req.body;

      const data = await Cart.create({
        UserId: id,
        MerchandiseId: MerchandiseId,
      });

      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getAllCartByUserId(req, res, next) {
    try {
      const { id } = req.user;

      const data = await Cart.findAll({
        where: { UserId: id },
        include: [
          {
            model: Merchandise,
          },
        ],
      });

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async midtransPayment(req, res, next) {
    try {
      const user = req.user;
      const merch = await Cart.findAll({
        where: { UserId: user.id },
        include: [
          {
            model: Merchandise,
          },
        ],
      });

      let totalAmount = 0;
      for (const item of merch) {
        if (item.paidStatus === "Pending") {
          totalAmount += item.Merchandise.price;
        }
      }

      console.log(`Total amount: ${totalAmount}`);

      const snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });

      let orderId = uuidv4();
      let amount = totalAmount;

      let parameter = {
        transaction_details: {
          order_id: orderId,
          gross_amount: amount,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: user.firtName,
          last_name: user.lastName,
          email: user.email,
        },
      };

      const transaction = await snap.createTransaction(parameter);

      await Order.create({
        OrderId: orderId,
        amount: amount,
        UserId: user.id,
      });

      res.status(201).json({ message: "Order Created", transaction });
    } catch (error) {
      next(error);
    }
  }

  static async updatePayment(req, res, next) {
    try {
      const { orderId } = req.body;
      const { id } = req.user;

      const carts = await Cart.findAll({
        where: { UserId: id },
        include: [
          {
            model: Merchandise,
          },
        ],
      });
      console.log(carts);

      const order = await Order.findOne({ where: { OrderId: orderId } });
      if (!order) throw { name: "OrderNotFound" };

      const serverKey = process.env.MIDTRANS_SERVER_KEY;
      const base64ServerKey = Buffer.from(serverKey + ":").toString("base64");

      const response = await axios.get(
        `https://api.sandbox.midtrans.com/v2/${orderId}/status`,
        {
          headers: {
            Authorization: `Basic ${base64ServerKey}`,
          },
        }
      );

      let updatedOrder;
      if (
        response.data.transaction_status === "capture" &&
        response.data.status_code === "200"
      ) {
        updatedOrder = await order.update({ status: "Paid", paidDate: now() });

        for (const cart of carts) {
          await cart.update({ paidStatus: "Paid" });
        }
      }

      res
        .status(200)
        .json({ message: "Payment Successfull", updatedOrder, carts });
    } catch (error) {
      next(error);
    }
  }
};
