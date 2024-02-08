import { Router } from "express";
import {
  activeUser,
  createUser,
  loginUser,
  makePayment,
  makeTransaction,
  verifyPayment,
  viewOneUser,
  viewUser,
  viewVerifyTransaction,
} from "../controller/userController";

const router: Router = Router();

router.route("/register").post(createUser);
router.route("/login").post(loginUser);
router.route("/active/:userID").patch(activeUser);
router.route("/view").get(viewUser);
router.route("/view/:userID").get(viewOneUser);
router.route("/make-payment").post(makePayment);
router.route("/active/:userID").patch(activeUser);

router.route("/verifyx/:trxref").get(verifyPayment);
router.route("/verify/:ref").get(viewVerifyTransaction);

router.route("/make").post(makeTransaction);

export default router;
