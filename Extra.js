 
    
    //EXECUTE THE QUERY
    // const tours = await query;
    // const tours = await Tour.find(
    //   duration: 5,
    //   difficulty: 'easy'
    // })
    //another way of filtering by query
    //const tours = await Tour.find().where('difficulty').equals('difficult');


//tourcontroller code

    // tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../../dev-data/data/tours-simple.json`)
// );

//ROUTE HANDLERS
// exports.checkID = (req,res,next,val)=>{
//     console.log(`Tour id is : ${val}`);
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }
//   next();
// }//checkID is invalid ---instead of using MongoDB

// exports.checkBody=(req,res,next)=>{
//     if(!req.body.name || !req.body.price){
//       return res.status(400).json({
//         status:'fail',
//         message:'missing name or price'
//       })
//     }
//     next()
// }  //validate the body --  handled by mongoose
//console.log(req.query);
     //BUILD QUERY
    //1.Filtering
    // 1st way
    // const tours = await Tour.find({
    //   duration : 5,
    //   difficulty : 'easy'
    // })
    //another way
    // const tours = await Tour.find().where('duration').equals(5).where('difficulty').equals('easy')
    //get tour by ID
      // console.log(req.params);
  // const id = req.params.id * 1;
  // const tour = tours.find((el) => el.id === id);
  // res.status(200).json({
  //   status: 'success',
  //   //result: tours.length,
  //   data: {
  //     tour,
  //   },
  // });
//POST tour
  // exports.createTour = async (req, res) => {
//     // const newTour = new Tour({})
//     // newTour.save()
//     const newTour = await Tour.create(req.body)
//     res.status(201).json({
//         status: 'success',
//         data: {
//           tour: newTour
//         },
//       });
//     }
//console.log(req.body);
// const newId = tours[tours.length - 1].id + 1;
// const newTour = Object.assign({ id: newId }, req.body);
// tours.push(newTour);
// fs.writeFile(
//   `${__dirname}/../dev-data/data/tours-simple.json`,
//   JSON.stringify(tours),
//   (err) => {
//     res.status(201).json({
//       status: 'success',
//       data: {
//         tour: newTour,
//       },
//     });
//   }
// );
//  res.send('Done');
// class APIFeatures{
//   constructor(query,queryString){
//     this.query = query
//     this.queryString = queryString
//    }
// }