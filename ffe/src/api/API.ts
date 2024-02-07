import axios from "axios";

const URL = "http://localhost:1100";

export const createUser = async (data: {}) => {
  try {
    return await axios.post(`${URL}/register`, data);
  } catch (error) {
    return error;
  }
};

export const loginUser = async (data: {}) => {
  try {
    return await axios.post(`${URL}/login`, data).then((res: any) => {
      return res.data;
    });
  } catch (error) {
    return error;
  }
};

export const activeUser = async () => {
  try {
    return await axios.patch(`${URL}/active`).then((res: any) => {
      return res.data;
    });
  } catch (error) {
    return error;
  }
};

export const getOneUser = async (userID: string) => {
  try {
    return await axios.get(`${URL}/view/${userID}`).then((res: any) => {
      return res.data;
    });
  } catch (error) {
    return error;
  }
};

export const makePayment = async (data: {}) => {
  try {
    return await axios.post(`${URL}/make-payment`, data).then((res: any) => {
      return res.data;
    });
  } catch (error) {
    return error;
  }
};

export const afterPayment = async (userID: string) => {
  try {
    return await axios.patch(`${URL}/active/${userID}`).then((res: any) => {
      return res.data;
    });
  } catch (error) {
    return error;
  }
};
