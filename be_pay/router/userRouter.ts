import { Router } from "express";
import {
  activeUser,
  createUser,
  loginUser,
  makePayment,
  verifyPayment,
  viewOneUser,
  viewUser,
} from "../controller/userController";

const router: Router = Router();

router.route("/register").post(createUser);
router.route("/login").post(loginUser);
router.route("/active/:userID").patch(activeUser);
router.route("/view").get(viewUser);
router.route("/view/:userID").get(viewOneUser);
router.route("/make-payment").post(makePayment);
router.route("/active/:userID").patch(activeUser);

router.route("/verify/").get(verifyPayment);

export default router;
