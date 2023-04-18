import express, { Request, Response , NextFunction} from 'express';
import cors from 'cors';
import logger from './middleware/logger';


const app = express();
const port = process.env.PORT || 3000;

app.use(logger);
app.use(express.json());
app.use(cors(
    {
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type,Authorization',
        credentials: true
    }
));

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
if (err.code === 'EADDRINUSE') {
    console.error('Port 3000 is already in use');
    process.exit(1);
} else {
    console.error('Unhandled error:', err.message);
    res.status(500).send('Internal server error');
}
});


app.get('/', (req: Request, res: Response) => {
    res.send({ message: 'Hello World!' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
