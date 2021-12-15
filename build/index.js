"use strict";

var _router = _interopRequireDefault(require("./src/router"));

require("dotenv/config");

var _flightRoute = _interopRequireDefault(require("./src/controllers/flightRoute"));

var _db = require("./src/config/db");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _router["default"])();
var port = 5000; //flights routes

app.use("/flights", _flightRoute["default"]); //users routes
// app.use(userRoute);

(0, _db.connection)().then(function () {
  app.listen(port, function () {
    return console.log("listening on port ".concat(port, "!"));
  });
})["catch"](function (err) {
  return console.log(err);
});
//# sourceMappingURL=index.js.map