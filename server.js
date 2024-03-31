import express from 'express';
import colors from'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from "./config/db.js";
import authRoute from './routes/authRoute.js'

//configure dotenve
dotenv.config();

const app = express();
//database config
connectDB();



// middleware
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use("/api/v1/auth", authRoute)
//rest api
app.get("/", (req, res) =>{
    res.send(
        "<h1>Welcome to Paudha Mandi</h1>"
    
    );
});

const PORT = process.env.PORT ||8080;

app.listen(PORT, ()=>{
    console.log(`Server running on ${process.env.DEV_MODE}  mode on port ${PORT}`.bgCyan.white);
});