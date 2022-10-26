const data = require("../data/priceCardData.json")

const sendPricePage = (req, res) => {
    const requestKeyword = req.params.path;
    if (requestKeyword === "PrivateOffice") {
      res.render("template", { data: data[0] });
    } else if (requestKeyword === "HotSeat") {
      res.render("template", { data: data[1] });
    } else if (requestKeyword === "ConferenceRoom") {
      res.render("template", { data: data[2] });
    } else {
      res.render("template", { data: data[3] });
    }
  }

price = {sendPricePage}

module.exports = price