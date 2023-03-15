/* eslint-disable node/no-unsupported-features/es-syntax */
const Url = require("../model/urlModel");

exports.getAllUrls = async (req, res) => {
  try {
    const searchQueries = { ...req.query };
    let queryStr = JSON.stringify(searchQueries);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    const urls = await Url.find(JSON.parse(queryStr));
    res.status(200).json({
      requestTime: req.requestTime,
      status: "success",
      data: {
        urls,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteUrlEntry = async (req, res) => {
  try {
    const { id } = req.params;
    await Url.findByIdAndDelete(id);
    res.status(204).json({
      requestTime: req.requestTime,
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.clearAllUrlEntries = async (req = null, res = null) => {
  try {
    await Url.deleteMany({});
    if (!req && !res) return;
    res.status(204).json({
      requestTime: req.requestTime,
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
