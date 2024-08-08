export class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  pagination() {
    let page = this.queryString.page * 1 || 1;
    if (page < 1) page = 1;
    let limit = 5;
    let skip = (page - 1) * limit;
    this.query.find().skip(skip).limit(limit);
    this.page = page
    return this;
  }

  sort() {
    this.query.sort();
    return this;
  }

}
