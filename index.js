import express from 'express';
import mongoose from 'mongoose';
import router from './routes/index.js';
import cors from 'cors';
import path from 'path'
const app = express();
const port = 5000;



app.use(cors({
    origin: '*', // Change this in production
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api',router);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
app.get('/', (req, res) => {
    res.send('Hello World!');
}   );

const __variableOfChoice = path.resolve();
app.use("/uploads", express.static(path.join(__variableOfChoice, "/uploads")));
mongoose.connect('mongodb+srv://arifhusain5010:FqCQUg1h9KTwH7tk@cluster0.7nlxo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});