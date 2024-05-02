import express, { json as expressJson, static as expressStatic } from 'express';

const app = express();

app.use(expressJson());
app.use(expressStatic('./public'));

// app.use('/api/v1/auth', authRouter);

// app.use(notFoundMiddleware);

export default app;
