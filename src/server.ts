import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import productRoutes from './handlers/productRouter';
import userRoutes from './handlers/userRouter';
import orderRoutes from './handlers/orderRouter';

const app: express.Application = express()
const port: number = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', function (_req: Request, res: Response) {
    res.send('Welcome to storefront!');
})

productRoutes(app);
userRoutes(app);
orderRoutes(app);

app.listen(3000, function () {
    console.log(`server started at http://localhost:${port}`);
})

export default app;