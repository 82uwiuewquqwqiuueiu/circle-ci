import { Server } from './server';
const app = new Server().app;
//require('dotenv').config()
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server is started on port ${port}`);
});























