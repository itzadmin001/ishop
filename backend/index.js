const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = 5000;
const CategoryRouter = require("./Router/CategoryRouter")
const ColorRouter = require("./Router/ColorRouter");
const ProductRouter = require('./Router/ProductRouter');
const UserRouter = require('./Router/UserRouter');
const OderRouter = require('./Router/OderRouter');
const AdminRouter = require('./Router/AdminRouter');
const cookieParser = require('cookie-parser');
const { VerifyAdmin } = require('./middleware/isLoggden');
const TransactionRouter = require('./Router/Transaction');
const FrontendUrl = process.env.REACT_APP_API_BASE_URL;

const app = express();
app.use(cookieParser());

app.use(cors({
    origin: FrontendUrl,
    credentials: true
}));
app.use(express.json());
app.use(express.static("public"))

app.use("/category", CategoryRouter)
app.use("/color", ColorRouter)
app.use("/product", ProductRouter);
app.use("/user", UserRouter);
app.use("/order", OderRouter)
app.use("/transaction", TransactionRouter)
app.use("/admin", AdminRouter);



mongoose.connect(`mongodb+srv://bhaktishiv73:yuCw0t5t4Rbhf0Wm@cluster0.dmoii.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, {
    dbName: "ishop"
}).then((success) => {
    console.log("DB connected successfully")
    app.listen(PORT, () => {
        console.log("server started")
    })
}).catch((error) => {
    console.log("intenal server error");
})






