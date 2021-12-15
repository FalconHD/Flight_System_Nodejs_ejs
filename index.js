import router from './src/router';
import 'dotenv/config';
import flightRoute from './src/controllers/flightRoute';
import { connection } from './src/config/db';

const app = router();
const port = 5000;


//flights routes
app.use("/flights", flightRoute);

//users routes
// app.use(userRoute);

connection().then(() => {
  app.listen(port, () => console.log(`listening on port ${port}!`));
}).catch(err => console.log(err));


