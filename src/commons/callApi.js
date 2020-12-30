import { getAllProduct, getAllAuthor, getAllCategory, checkCustomer, getAllCart, deleteCart, addCart, getListProduct, updateCart, checkCodeDiscount, checkShipCode, postOrder, postOrderCustomerStrange, getOrderCustomer } from "../api/book";

export const loadData = async () => {
  var result = null;
  await getAllProduct(0)
    .then((res) => {
      console.log(res);
      if (res.resultResponse.length > 0) {
        result = res.resultResponse;
        // return true;
      }
    })
    .catch((err) => {
      // console.log("err", err);
      result = false;
    });
  return result;
};
export const loadAuthor = async () => {
  var result = null;
  await getAllAuthor()
    .then((res) => {
      if (res.result.length > 0) {
        // set data
        // handleSetAuthors(res.result);
        result = res.result;
      }
    })
    .catch((err) => {
      // console.log("err", err);
      result = false;
    });
  return result;
};
export const loadCategory = async () => {
  var result = null;
  await getAllCategory()
    .then((res) => {
      if (res.result.length > 0) {
        // set data
        result = res.result;
      }
    })
    .catch((err) => {
      // console.log("err", err);
      result = false;
    });
  return result;
};

export const loadCustomer = async () => {
  var result = null;
  const cus = JSON.parse(localStorage.getItem("user"));

  if (cus) {
    await checkCustomer({ phone: cus.PhoneCustomer, pass: cus.PasswordCustomer })
      .then((res) => {
        if (res.result.length > 0) {
          // set data
          result = res.result[0];
        }
      })
      .catch((err) => {
        // console.log("err", err);
        result = false;
      });
  }
  return result;
};

export const loadAllCart = async (id) => {
  var result = null;
  await getAllCart(id)
    .then((res) => {
      console.log("res 1", res);
      if (res.result.length >= 0) {
        // set data
        return res.result;
      }
    })
    .then(async (res) => {
      var temp = [];
      var newData = [];
      res.forEach((pro) => {
        temp.push(pro.idProduct);
      });
      await getListProduct(temp)
        .then((res2) => {
          // console.log("temp", res2,res,temp);
          res.forEach((resE) => {
            res2.resultResponse.forEach((res2E) => {
              if (res2E.ProductID === resE.idProduct) {
                // console.log("step,",res2E,resE);
                newData.push({ ...resE, ...res2E });
              }
            });
          });
          // for (let i = 0; i < res.length; i++) {
          //   newData.push({ ...res[i], ...res2.resultResponse[i] });
          // }
          result = newData;
        })
        .catch((er) => {
          // console.log("err", er);
          result = false;
        });
    })
    .catch((err) => {
      // console.log("err", err);
      result = false;
    });

  return result;
};

export const loadDeleteCart = async (idC, idP) => {
  var result = null;
  await deleteCart(idC, idP)
    .then((res) => {
      // console.log("res 1", res);
      if (res.msg === "ok") {
        // set data
        result = true;
      }
    })
    .catch((err) => {
      // console.log("err", err);
      result = false;
    });

  return result;
};

export const loadAddCart = async (idC, idP, num) => {
  var result = null;
  await addCart(idC, idP, num)
    .then((res) => {
      // console.log("res 1", res);
      if (res.msg === "ok") {
        // set data
        result = true;
      }
    })
    .catch((err) => {
      // console.log("err", err);
      result = false;
    });

  return result;
};

export const loadUpdateCart = async (idC, idP, num) => {
  var result = null;
  await updateCart(idC, idP, num)
    .then((res) => {
      // console.log("res 1", res);
      if (res.msg === "ok") {
        // set data
        result = true;
      }
    })
    .catch((err) => {
      // console.log("err", err);
      result = false;
    });

  return result;
};

export const loadCheckCodeDiscount = async (code) => {
  var result = null;
  await checkCodeDiscount(code)
    .then((res) => {
      // console.log("res 1", res);
      if (res.msg === "ok") {
        // set data
        result = res;
      }
    })
    .catch((err) => {
      // console.log("err", err);
      result = false;
    });

  return result;
};

export const loadCheckShipCode = async (code) => {
  var result = null;
  await checkShipCode(code)
    .then((res) => {
      // console.log("res 1", res);
      if (res.msg === "ok") {
        // set data
        result = res;
      }
    })
    .catch((err) => {
      // console.log("err", err);
      result = false;
    });

  return result;
};

export const loadPostOrder = async (data) => {
  var result = null;
  await postOrder(data)
    .then((res) => {
      // console.log("res 1", res);
      if (res.msg === "ok") {
        // set data
        result = res;
      }
    })
    .catch((err) => {
      // console.log("err", err);
      result = false;
    });

  return result;
};

export const loadPostOrderCustomerStrange = async (data) => {
  var result = null;
  await postOrderCustomerStrange(data)
    .then((res) => {
      // console.log("res 1", res);
      if (res.msg === "ok") {
        // set data
        result = res;
      }
    })
    .catch((err) => {
      // console.log("err", err);
      result = false;
    });

  return result;
};

export const loadGetOrderCustomer = async (idC) => {
  var result = null;
  await getOrderCustomer(idC)
    .then((res) => {
      // console.log("res 1", res);
      if (res.msg === "ok") {
        // set data
        result = res;
      }
    })
    .catch((err) => {
      // console.log("err", err);
      result = false;
    });

  return result;
};
