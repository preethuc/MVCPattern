'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = require('./app');
// const mongoose = require('mongoose');

_mongoose2.default.connect('mongodb://localhost:27017/natours');
_mongoose2.default.connection.once('open', function () {
  console.log('DB connected');
}).on('error', function (error) {
  console.log('error is:', error);
});

// const testTour = new Tour({
//   name: 'The Park Camper',
//   rating: 4.9,
//   price: 345,
// });
// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log('Error:', err);
//   });
//4.START SERVER
app.listen(3000, function () {
  return console.log('Listening on the PORT 3000');
});
//# sourceMappingURL=server.js.map