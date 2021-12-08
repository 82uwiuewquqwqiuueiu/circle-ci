import { Router } from "express";
import { AuthController } from "../../controllers/app/AuthController";
import { UserController } from "../../controllers/app/UserController";
import { GlobalMiddleWare } from "../../middleware/GlobalMiddleWare";
import { AuthMiddleWare } from "../../middleware/AuthMiddleware";
export class UserRouter {
    public router: Router;
    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
        this.putRoutes();
    }
    getRoutes() {
        this.router.get('/get-profile-detail/:userId?',AuthMiddleWare.authenticate, UserController.getProfileDetail);
    }

    postRoutes() {       
    }

    patchRoutes() {
    }

    putRoutes() {
        this.router.put('/update-profile',AuthMiddleWare.authenticate,UserController.updateProfile)
    }
    deleteRoutes() {
    }
}
export default new UserRouter().router;