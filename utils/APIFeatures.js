class APIFeatures{
  constructor(query,queryString){
    this.query = query
    this.queryString = queryString
  }
  filter(){

    //BUILD QUERY
    //1.Filtering
    const queryObj = this.queryString;
    // console.log(queryObj);
    // const excludedFields = ['page', 'sort', 'limit', 'fields'];
    // excludedFields.forEach(el=> delete queryObj[el]);
    //   // console.log(el);
    //2.Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
  
    this.query.find(JSON.parse(queryStr));

    //console.log(JSON.parse(queryStr));
    // console.log(req.query,queryObj);
    //const tours = await Tour.find(req.query);---query file
    // const tours = await Tour.find(req.body);----all files
    //const query = Tour.find(queryObj); //queryfiles
     return this;
  }
  sorting(){
     //3.Sorting
     if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
      // sort('price ratingsAverage')
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this
  }
  limitFields(){
      //4.Field limiting
      if (this.queryString.fields) {
        const fields = this.queryString.fields.split(',').join(' ');
        this.query = this.query.select(fields);
      } else {
        this.query = this.query.select('-__v');
      }
      return this
  }
  pagination(){

    //5.PAGINATION
    const page = this.queryString.page * 1 || 1;   // To convert string to number we can multiply to any numbers(Integers)
    const limit = this.queryString.limit *1 || 100;   // 100 results in a page
    const skip = (page - 1) * limit // if page = 2 then its need to skip 100 results

    // query = query.skip(100).limit(100) will skip 100 limits
    this.query = this.query.skip(skip).limit(limit)

    // To show if user enter more pages then expected
    // if(this.queryString.page){
    //     const numTours = await Tour.countDocuments();
    //     if(skip>= numTours) throw new Error('This page does not exist')
    // }
    return this
  }
}

   
  
module.exports = APIFeatures