/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-constant-condition */
const Url = require("../model/urlModel");
const APIfeatures = require("../modules/apiFeatures");

exports.getAllUrls = async (req, res) => {
  try {
    const urlFeatures = new APIfeatures(Url.find(), req.query)
      .filter()
      .sort()
      .limit()
      .paginate();
    const urls = await urlFeatures.query;
    res.status(200).json({
      requestTime: req.requestTime,
      status: "success",
      results: urls.length,
      page: urlFeatures.page,
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
exports.getRandom = async (req, res) => {
  try {
    let isNsfw = false;
    if (req.query.isNsfw === "true") {
      isNsfw = true;
    }
    const url = await Url.aggregate([
      {
        $match: { isNsfw: isNsfw },
      },
      {
        $sample: { size: 1 },
      },
    ]);

    res.status(200).json({
      requestTime: req.requestTime,
      status: "success",
      data: {
        url,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.getUrlEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const url = await Url.findById(id);
    res.status(200).json({
      requestTime: req.requestTime,
      status: "success",
      data: {
        url,
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
