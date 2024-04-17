import { default as express } from 'express';
import { default as serveIndex } from 'serve-index';

const app = express();

app.use("/", serveIndex('.'));
app.use(express.static('.'));

const port = 3001;
app.listen(port, () => {
  console.log(`Listening on ${port}`)
})