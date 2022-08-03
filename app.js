const { json } = require('express');
const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json());
// app.get('/api/',(req,res)=>{
//    // res.status(200).send('data fetched successfully')
//    //json data
//    res.status(200).json({
//     message:"Datas fetched successfully",
//     app:"Natours"
//    })
// })
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});
//app.get('/api/tour/:id/:x?',(req,res)=>{   x?--Undefined
app.get('/api/v1/tour/:id', (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
      const tour = tours.find(el => el.id === id);

  if (id > tours.length) {
   // if(!tour){  these 2 if give the same result
    return res.status(404).json({
      status: 'fail',
      message: 'invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    //result: tours.length,
    data:{
        tour
    }
  });
});
app.post('/api/v1/tours', (req, res) => {
  //console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
  //  res.send('Done');
});
app.patch('/api/v1/tours/:id',(req,res)=>{
    if(req.params.id *1 > tours.length){
        return res.status(404).json({
            status:'fail',
            message:'Invalid ID'
        })
    }
    res.status(200).json({
        status:'success',
        data:{
            tour:'<Updated tour here....!>'
        }
    })
})
app.delete('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
//   res.status(200).json({
//     status: 'success',
//     data: null
//   });
 res.status(204).json({
   status: 'success',
   data: null,
 });
});
app.listen(3000, () => console.log('Listening on the PORT 3000'));
