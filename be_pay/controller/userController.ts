import { Request, Response } from "express";
import userModel from "../model/userModel";
import { CronJob } from "cron";
import moment from "moment";
import axios from "axios";
const https = require("https");

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.create({
      email,
      password,
      isActive: true,
      status: "active",
    });

    const time = new Date();
    const min = time.setMinutes(time.getMinutes() + 1);

    let mon = moment(min).seconds();

    const job = new CronJob(
      `${mon} * * * * *`,
      async () => {
        await userModel.findByIdAndUpdate(
          user._id,
          {
            isActive: false,
            status: "",
          },
          { new: true }
        );

        job.stop();
      },
      null,
      true
    );

    return res.status(201).json({
      message: "Account created",
      status: 201,
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
      status: 404,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (user) {
      if (user.password === password) {
        return res.status(201).json({
          message: "welcome",
          data: user,
          status: 201,
        });
      } else {
        return res.status(404).json({
          message: "Error",
          status: 404,
        });
      }
    } else {
      return res.status(404).json({
        message: "Error",
        status: 404,
      });
    }

    return res.status(201).json({
      message: "Login",
      status: 201,
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
      status: 404,
    });
  }
};

export const activeUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const user = await userModel.findByIdAndUpdate(
      userID,
      {
        isActive: true,
        status: "active",
      },
      { new: true }
    );

    const time = new Date();
    const min = time.setMinutes(time.getMinutes() + 1);

    let mon = moment(min).seconds();

    const job = new CronJob(
      `${mon} * * * * *`,
      async () => {
        await userModel.findByIdAndUpdate(
          userID,
          {
            isActive: false,
            status: "",
          },
          { new: true }
        );

        job.stop();
      },
      null,
      true
    );

    return res.status(201).json({
      message: "welcome",
      data: user,
      status: 201,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
      status: 404,
    });
  }
};

export const viewUser = async (req: Request, res: Response) => {
  try {
    const user = await userModel.find();

    return res.status(201).json({
      message: "welcome",
      data: user,
      status: 201,
    });
  } catch (error: any) {
    return res.status(404).json({
      message: "Error",
      data: error.message,
      status: 404,
    });
  }
};

export const makePayment = async (req: Request, res: Response) => {
  try {
    const { amount, email } = req.body;

    const params = JSON.stringify({
      email,
      amount: (parseInt(amount) * 100).toString(),
      callback_url: "http://localhost:5173/main",
      metadata: {
        cancel_action: "http://localhost:5173/action",
      },
      channels: ["card"],
    });

    const options = {
      hostname: "api.paystack.co",
      port: 443,
      path: "/transaction/initialize",
      method: "POST",
      headers: {
        Authorization:
          "Bearer sk_test_ec1b0ccabcb547fe0efbd991f3b64b485903c88e",
        "Content-Type": "application/json",
      },
    };

    const request = https
      .request(options, (response: any) => {
        let data = "";

        response.on("data", (chunk: any) => {
          data += chunk;
        });

        response.on("end", () => {
          return res.status(201).json({
            message: "welcome",
            data: JSON.parse(data),
            status: 201,
          });
        });
      })
      .on("error", (error: any) => {
        console.error(error);
      });

    request.write(params);
    request.end();
  } catch (error: any) {
    return res.status(404).json({
      message: "Error",
      data: error.message,
      status: 404,
    });
  }
};

export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const { trxref } = req.params;

    const options = {
      hostname: "api.paystack.co",
      port: 443,
      path: `/transaction/verify/${trxref}`,
      method: "GET",
      headers: {
        Authorization:
          "Bearer sk_test_ec1b0ccabcb547fe0efbd991f3b64b485903c88e",
      },
    };

    https
      .request(options, (res: any) => {
        let data = "";

        res.on("data", (chunk: any) => {
          data += chunk;
        });

        res.on("end", () => {
          return res.status(420004).json({
            message: "Error",
            data: JSON.parse(data),
            status: 200,
          });
        });
      })
      .on("error", (error: any) => {
        return res.status(404).json({
          message: "Error",
          data: error.message,
          status: 404,
        });
      });

    console.log("Eneded");
  } catch (error: any) {
    return res.status(404).json({
      message: "Error",
      data: error.message,
      status: 404,
    });
  }
};

export const viewOneUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const user = await userModel.findById(userID);

    return res.status(201).json({
      message: "welcome",
      data: user,
      status: 201,
    });
  } catch (error: any) {
    return res.status(404).json({
      message: "Error",
      data: error.message,
      status: 404,
    });
  }
};

export const viewVerifyTransaction = async (req: Request, res: Response) => {
  try {
    const { ref } = req.params;
    console.log(ref);

    await axios
      .get(`https://api.paystack.co/transaction/verify/${ref}`, {
        headers: {
          authorization:
            "Bearer sk_test_ec1b0ccabcb547fe0efbd991f3b64b485903c88e",

          "content-type": "application/json",
          "cache-control": "no-cache",
        },
      })
      .then((resp) => {
        return res.status(201).json({
          message: "welcome",
          data: resp.data,
          status: 201,
        });
      });
  } catch (error: any) {
    return res.status(404).json({
      message: "Error",
      data: error.message,
      error: error,
      status: 404,
    });
  }
};

export const makeTransaction = async (req: Request, res: Response) => {
  try {
    const { email, amount } = req.body;

    const data = {
      email,
      amount,
    };

    await axios
      .post(`https://api.paystack.co/transaction/initialize`, data, {
        headers: {
          authorization:
            "Bearer sk_test_ec1b0ccabcb547fe0efbd991f3b64b485903c88e",

          "content-type": "application/json",
          "cache-control": "no-cache",
        },
      })
      .then((resp) => {
        console.log(resp.data);
        return res.status(201).json({
          message: "transaction initialize",
          data: resp.data,
          status: 201,
        });
      });
  } catch (error: any) {
    return res.status(404).json({
      message: "Error",
      data: error.message,
      status: 404,
    });
  }
};
