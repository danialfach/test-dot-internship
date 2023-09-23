import express from "express";
import userRoutes from "./routes/users";
import contactRoutes from "./routes/contact";
import register from "./routes/auth/register";
import login from "./routes/auth/login";
import logs from "./middleware/logs";
import userValidation from "./middleware/validation/userValidation";
import contactValidation from "./middleware/validation/contactValidation";

const app = express();
const PORT = 4000;

app.use(logs);
app.use(express.json());

app.use('/register', register);
app.use('/login', login)
app.use('/users', userValidation, userRoutes);
app.use('/contact', contactValidation, contactRoutes);

app.listen(PORT, () => {
    console.info(`Server running in: http://localhost:${PORT}`);
})