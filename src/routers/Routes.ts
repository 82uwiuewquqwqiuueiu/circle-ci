import { Router } from "express";
import Authrouter from '../routers/app/AuthRouter';
import UserRouter from "./app/UserRouter";
export class Routes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.app();
        this.admin();
    }

    app() {
        this.router.use('/app/auth', Authrouter);
        this.router.use('/app/user',UserRouter);
    }

    admin() {
    }

}
export default new Routes().router;