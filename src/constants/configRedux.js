export const API_URL = 'https://sever-bs.herokuapp.com/api/v1';
export const HOME="/client-bs-p3";
// export const API_URL = "http://127.0.0.1:5000/api/v1/";
// export const HOME = "/";

export const TypeCustomer = [
  {
    min: 0,
    max: 1000,
    type: "sliver",
    dis: 2,
  },
  {
    min: 1001,
    max: 5000,
    type: "gold",
    dis: 5,
  },
  {
    min: 5001,
    max: 10000,
    type: "Diamond",
    dis: 7,
  },
  {
    min: 10001,
    max: 999999,
    type: "Vip",
    dis: 10,
  },
];
