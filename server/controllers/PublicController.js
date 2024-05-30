const { Cart, Merchandise, User, Order } = require("../models");

module.exports = class PublicController {
  static async getAllMerch(req, res, next) {
    try {
      const data = await Merchandise.findAll();

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getMerchById(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Merchandise.findByPk(id);

      if (!data) throw { name: "InvalidMerchId" };

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getUserProfile(req, res, next) {
    try {
      const { id } = req.user;

      const user = await User.findByPk(id);

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async eplStanding(req, res, next) {
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

  static async newsEpl(req, res, next) {
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
