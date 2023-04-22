/* eslint-disable node/no-unsupported-features/es-syntax */
class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter(aggregate = false) {
    const searchQueries = { ...this.queryString };
    const uniqueQueries = ["page", "sort", "limit", "fields"];
    uniqueQueries.forEach((el) => delete searchQueries[el]);

    //   ADVANCED FILTERING (using mongo queries)

    let queryStr = JSON.stringify(searchQueries);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.queryString = JSON.parse(queryStr);
    if (aggregate) return this;

    //  SETTING SEARCH
    this.query = this.query.find(this.queryString);
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
      this.query = this.query.sort("-requestTime");
    }
    return this;
  }

  limit() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");

      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  paginate() {
    const page = +this.queryString.page || 1;
    const limit = +this.queryString.limit || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    this.page = page;
    return this;
  }
}
module.exports = APIfeatures;
