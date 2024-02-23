const { Merchandise, Catalogue, Category, Order } = require("../models/index");

module.exports = class PublicController {
  static async getAllMerchandisePub(req, res, next) {
    try {
      const merch = await Merchandise.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      res.status(200).json(merch);
    } catch (error) {
      next(error);
    }
  }

  static async order(req, res, next) {
    try {
      const { MerchandiseIds } = req.body;
      const UserId = req.user.id;

      const merchandiseItems = await Merchandise.findAll({
        where: {
          id: MerchandiseIds,
        },
      });
      let total = 0;
      merchandiseItems.forEach((item) => {
        total += item.price;
      });

      const order = await Order.create({
        UserId,
        MerchandiseIds,
        total,
      });

      res.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
      console.error("Error placing order:", error);
      res.status(500).json({ error: "Failed to place order" });
    }
  }

  static async getOrderByUserId(req, res, next) {
    try {
      const UserId = req.user.id;

      const orders = await Order.findAll({
        where: { UserId },
      });
      res.status(200).json(orders);
    } catch (error) {
      console.log(error);
    }
  }

  static async footballApi(req, res, next) {
    const url =
      "https://api-football-v1.p.rapidapi.com/v3/standings?season=2023&league=39";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.X_RAPIDAPI_KEY,
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      const standings = data.response[0].league.standings;

      // console.log(standings);
      res.status(200).json(standings);
    } catch (error) {
      console.error(error);
    }
  }

  static async newsApi(req, res, next) {
    const url =
      "https://football-news-aggregator-live.p.rapidapi.com/news/fourfourtwo/bundesliga";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.X_RAPIDAPI_KEY,
        "X-RapidAPI-Host": "football-news-aggregator-live.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
    }
  }
};
