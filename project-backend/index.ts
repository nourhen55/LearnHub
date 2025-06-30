import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
