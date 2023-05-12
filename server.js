import Express from "express";
import colors from "colors";
import morgan from "morgan";
import { connectDB } from "./config/dbconfig.js"
import userModel from "./models/users.js"
import { router } from "./routes/authRoute.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cors from "cors"
//db
connectDB();


const app = Express();
//config
app.use(cors());
app.use(Express.json());
app.use(morgan("dev"))
//api
app.use('/api/v1/auth', router)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/product',productRoutes)

app.get('/', (req, res) => {
    res.send("<h1>Hello JI</h1>");
})


//server config
const PORT = 4321

app.listen(PORT, () => {
    console.log(`Server is Running at PORT : ${PORT}`.bgMagenta.grey);
})
