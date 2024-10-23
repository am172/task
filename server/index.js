import express from 'express';
import cors from 'cors';
import connectToMongoDB from './db/db.js';

import authRouter from './routes/auth.js';
import noteRouter from './routes/note.js';

const app = express();

app.use(cors());
app.use(express.json());  // التأكد من أن البيانات تصل إلى الخادم بصيغة JSON
app.use('/api/auth', authRouter);  // هذا هو المسار الأساسي
app.use('/api/note', noteRouter);  // هذا هو المسار الأساسي

app.listen(5000, () => {
    connectToMongoDB();
    console.log("kolo alesta");
});
