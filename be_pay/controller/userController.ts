import { Request, Response } from "express";
import userModel from "../model/userModel";
import { CronJob } from "cron";
import moment from "moment";
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
    const trxref = req.params;
    console.log(trxref);

    // const params = JSON.stringify({
    //   email,
    //   amount: (parseInt(amount) * 100).toString(),
    //   callback_url: "http://localhost:5173/main",
    //   metadata: {
    //     cancel_action: "http://localhost:5173/action",
    //   },
    //   channels: ["card"],
    // });

    const options = {
      hostname: "api.paystack.co",
      port: 443,
      path: `/transaction/verify/:reference`,
      method: "GET",
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

    // request.write(params);
    // request.end();
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
