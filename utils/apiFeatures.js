class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    //1A filtering
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "page"];

    excludedFields.forEach((el) => delete queryObj[el]);

    //1B advanced filtering
    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
    // let query = Tour.find(JSON.parse(queryStr));
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("precioProducto");
    }

    return this;
  }
  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
