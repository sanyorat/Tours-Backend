class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedQueryObj = ['limit', 'page', 'sort', 'fields'];
    excludedQueryObj.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const returnKeys = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(returnKeys);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;

// // 1  /Filtering
// const queryObj = { ...req.query };
// const excludedQueryObj = ['limit', 'page', 'sort', 'fields'];
// excludedQueryObj.forEach((el) => delete queryObj[el]);

// //  2  /Advanced Filtering
// //console.log(queryObj);
// //we getting {duration: { gte: '5' }}
// //we want for mongo {duration: { $gte: '5' }} lets do this
// let queryStr = JSON.stringify(queryObj);
// queryStr = JSON.parse(
//   queryStr.replace(/\b(gte|gl|lte|lt)\b/g, (match) => `$${match}`),
// );
// let query = Tour.find(queryStr);

// //  3  /Sorting
// if (req.query.sort) {
//   const sortBy = req.query.sort.split(',').join(' ');
//   query = query.sort(sortBy);
// } else {
//   query = query.sort('-createdAt');
// }

// //Field Limiting
// if (req.query.fields) {
//   const returnKeys = req.query.fields.split(',').join(' ');
//   query = query.select(returnKeys);
// } else {
//   query = query.select('-__v');
// }

// ///Pgination
// const page = req.query.page * 1 || 1;
// const limit = req.query.limit * 1 || 100;
// const skip = (page - 1) * limit;
// query = query.skip(skip).limit(limit);

// if (req.query.page) {
//   const numTours = await Tour.countDocuments();
//   if (skip >= numTours) throw new Error('This page does not exist.');
// }
//  4  /Executing Query--------------------------------------------
