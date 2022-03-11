import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app: express.Application = express()
const port: number = 3000;

const corsOptions = {
    origin: 'http://google.com' // Assuming google will consume our Api
}

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(3000, function () {
    console.log(`server started at http://localhost:${port}`);
})
