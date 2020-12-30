import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Grid, Header, Icon, Image, Input, Label, Message, Modal, Radio, Select, Step, Tab, TextArea } from "semantic-ui-react";
import Swal from "sweetalert2";
import MyApp from "../../Paypal/Paypal";
import { province as data } from "../../../commons/data";
import { TypeCustomer } from "../../../constants/configRedux";

const OderModal = ({ open, setOpen, customerState, cartState, discount, shipCode, total, subTotal, onPayment }) => {
  const [indexTab, setIndexTab] = useState(0);

  const [endTotal, setEndTotal] = useState(0);
  const [method, setMethod] = useState("cash");

  const [formData, setFormData] = useState({});
  const [formDataReceiver, setFormDataReceiver] = useState({});
  const [paymentCard, setPaymentCard] = useState(false);

 

  
  useEffect(() => {
    if (open) {
      setIndexTab(0);
    }
  }, [open]);
  // Set end total
  useEffect(() => {
    if (method === "cash") {
      // console.log("true");
      setEndTotal(total + shipCode.cost);
    } else {
      setEndTotal(total);
    }
  }, [method, shipCode, total]);

  // Set payment card change
  useEffect(() => {
    if (paymentCard) {
      setMethod("card");
      setIndexTab(2);
    } else {
      setMethod("cash");
    }
  }, [paymentCard]);
  // console.log("c", shipCode);
  const panes = [
    {
      menuItem: <Shipping />,
      pane: {
        key: 1,
      },
      render: () => <ShippingAction cart={cartState} dis={discount} shipCode={shipCode} total={total} subTotal={subTotal} />,
    },
    {
      menuItem: <Billing />,
      pane: {
        key: 2,
      },
      render: () => <BillingAction Cus={customerState} shipCode={shipCode} total={total} subTotal={subTotal} method={method} setMethod={(v) => setMethod(v)} endTotal={endTotal} paymentCard={(e) => setPaymentCard(e)} formNonCustomer={(e) => setFormData(e)} formDataReceiver={(e)=>setFormDataReceiver(e)} />,
    },
    {
      menuItem: <Confirm />,
      pane: {
        key: 3,
      },
      render: () => <ConfirmAction createOder={createOder} />,
    },
  ];

  // start create Order
  const createOder = () => {
    if (cartState.length === 0) {
      Swal.fire({
        // position: 'top-end',
        icon: "warning",
        title: "Cart is empty!!",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    // get List cart
    // console.log("lsc",cartState);
    var listBill = [];
    cartState.forEach((cart) => {
      var obj = {
        idProduct: cart.idProduct || cart.ProductID,
        quantity: cart.quantity,
      };
      listBill.push(obj);
    });

    // Check is login
    var data = {};
    if (customerState.isLogin) {
      data = {
        tt: method === "cash" ? "pending" : "done",
        met: method,
        sub: subTotal,
        total: endTotal,
        idD: discount ? discount.iddiscount : null,
        idS: shipCode ? shipCode.idshipCode : null,
        idC: customerState.data.CustomerID,
        cart: listBill,
        receiver:formDataReceiver
      };
    } else {
      data = {
        tt: method === "cash" ? "pending" : "done",
        met: method,
        sub: subTotal,
        total: endTotal,
        idD: discount ? discount.iddiscount : null,
        idS: shipCode.idshipCode ? shipCode.idshipCode : null,
        CusNone: formData,
        cart: listBill,
        receiver:formDataReceiver
      };
    }
    // Create data post
    // console.log("ct",cartState);
    // console.log("ct", data);
    onPayment(data);
  };

  return (
    <Modal onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open} size="small" style={{ padding: "30px", width: "90%", top: "10%", marginLeft: "5%", height: "fit-content" }}>
      <Header icon>
        <Icon name="archive" />
        Archive Old Messages
      </Header>
      <Modal.Content style={{ display: "flex", justifyContent: "center", height: "fit-content" }} scrolling>
        {/* Content */}
        <Step.Group size="tiny" style={{ height: "fit-content" }}>
          <Tab menu={{ pointing: true }} panes={panes} activeIndex={indexTab} onTabChange={(e, { activeIndex }) => setIndexTab(activeIndex)} style={{ height: "fit-content" }} />
        </Step.Group>
        {/* End Content */}
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="red" inverted onClick={() => setOpen(false)}>
          <Icon name="remove" /> No
        </Button>
        <Button
          color="olive"
          inverted
          onClick={() => {
            if (indexTab === 0) {
            } else {
              var ni = indexTab;
              setIndexTab(--ni);
            }
          }}>
          <Icon name="checkmark" /> Undo
        </Button>
        <Button
          color="green"
          inverted
          onClick={() => {
            if (indexTab === 2) {
              createOder();
            } else {
              var ni = indexTab;
              //   console.log("ok n",++ni,indexTab);
              setIndexTab(++ni);
            }
          }}>
          <Icon name="checkmark" /> Next
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default OderModal;

const Shipping = () => {
  return (
    <Step>
      <Icon name="truck" />
      <Step.Content>
        <Step.Title>Shipping</Step.Title>
        <Step.Description>Choose your shipping options</Step.Description>
      </Step.Content>
    </Step>
  );
};

const Billing = () => {
  return (
    <Step>
      <Icon name="payment" />
      <Step.Content>
        <Step.Title>Billing</Step.Title>
        <Step.Description>Enter billing information</Step.Description>
      </Step.Content>
    </Step>
  );
};
const Confirm = () => {
  return (
    <Step>
      <Icon name="info" />
      <Step.Content>
        <Step.Title>Confirm Order</Step.Title>
        <Step.Description>Verify order details</Step.Description>
      </Step.Content>
    </Step>
  );
};

const ShippingAction = ({ cart, dis, shipCode, total, subTotal }) => {
  const showListCart = (cart) => {
    var result = null;
    result = cart.map((el, i) => {
      return (
        <Grid.Row key={i} style={{ alignItems: "center" }}>
          <Grid.Column>
            <Image src={el.images[0].url} size="small" wrapped style={{ maxWidth: "100px" }} />
          </Grid.Column>
          <Grid.Column>{el.NameProduct}</Grid.Column>
          <Grid.Column>X {el.quantity}</Grid.Column>
          <Grid.Column>$ {el.PriceProduct * el.quantity}</Grid.Column>
        </Grid.Row>
      );
    });
    return result;
  };
  //   console.log("ini", cart, dis, shipCode);
  return (
    <Grid relaxed columns={4} style={{ marginLeft: "auto", padding: "15px" }}>
      {showListCart(cart)}
      <Grid.Row style={{ paddingTop: 0, justifyContent: "flex-end" }}>
        <Grid.Column>
          <Label as="a" color="blue" tag>
            SubTotal:
          </Label>
        </Grid.Column>
        <Grid.Column> $ {subTotal}</Grid.Column>
      </Grid.Row>
      <Grid.Row style={{ paddingTop: 0, justifyContent: "flex-end" }}>
        <Grid.Column>
          <Label as="a" color="red" tag>
            Discount
          </Label>
        </Grid.Column>
        <Grid.Column>{`${dis.code || ""} ${dis.code ? " / " : "0"} ${dis.percent || ""}`} %</Grid.Column>
      </Grid.Row>

      <Grid.Row style={{ paddingTop: 0 }}>
        <Message floating style={{ marginLeft: "auto" }}>
          Total: ${total ? total : subTotal}
        </Message>
      </Grid.Row>
    </Grid>
  );
};

const BillingAction = ({ Cus, shipCode, total, subTotal, method, setMethod, endTotal, paymentCard, formNonCustomer, formDataReceiver }) => {
  const [showReceiver, setShowReceiver] = useState(false);
  return (
    <Grid relaxed columns={4} style={{ marginLeft: "auto", padding: "15px" }}>
      <Grid.Row>
        {Cus.isLogin ? (
          <Message info style={{ width: "100%", marginLeft: "5px" }}>
            <h3>Information Customer : {Cus.data.NameCustomer}</h3>
            <p>Phone: {Cus.data.PhoneCustomer}</p>
            <p>Email: {Cus.data.EmailCustomer}</p>
            <p>Address: {Cus.data.AddressCustomer}</p>
          </Message>
        ) : (
          <FormNonCustomer formNonCustomer={formNonCustomer} />
        )}
      </Grid.Row>
      <Grid.Row>
        <h3>Send to Receiver</h3>
        <Checkbox toggle checked={showReceiver} onChange={()=>setShowReceiver(c=>!c)} />
        {showReceiver ? <FormReceiver formDataReceiver={formDataReceiver} /> : ""}
      </Grid.Row>
      <Grid.Row style={{ marginLeft: "15px" }}>
        <p>Select payment method!</p>
      </Grid.Row>
      <Grid.Row style={{ marginLeft: "15px" }}>
        <Radio label="On receipt of goods" name="radioGroup" value="cash" checked={method === "cash"} onChange={(e, { value }) => setMethod(value)} />
      </Grid.Row>

      <Grid.Row style={{ marginLeft: "15px" }}>
        <Radio label="Online with card" name="radioGroup" value="card" checked={method === "card"} onChange={(e, { value }) => setMethod(value)} />
      </Grid.Row>
      {method === "cash" ? (
        <Grid.Row>
          <Grid.Column>
            <Label as="a" color="teal" tag>
              Ship Code:
            </Label>
          </Grid.Column>
          {/* <Grid.Column>{shipCode.address ? shipCode.address : ""}</Grid.Column> */}
          <Grid.Column>{shipCode.address ? shipCode.address + " / " + shipCode.cost + "$" : ""}</Grid.Column>
        </Grid.Row>
      ) : (
        <MyApp cost={endTotal} response={(e) => paymentCard(e)} />
      )}
      <Grid.Row style={{ paddingTop: 0 }}>
        <Message floating style={{ marginLeft: "auto" }}>
          Total: ${endTotal ? endTotal : 0}
        </Message>
      </Grid.Row>
    </Grid>
  );
};
const ConfirmAction = () => {
  return (
    <Grid relaxed columns={4} style={{ marginLeft: "auto", padding: "15px", display: "flex", justifyContent: "center", width: "90%", margin: "auto" }}>
      <Grid.Row>
        <Message warning style={{ width: "100%", marginLeft: "5px" }}>
          <h2 style={{ textTransform: "uppercase" }}>order confirmation!</h2>
        </Message>
      </Grid.Row>
    </Grid>
  );
};
const FormNonCustomer = ({ formNonCustomer }) => {
  const [formData, setFormData] = useState({ name: "", phone: 0, address: "", email: "" });

  useEffect(() => {
    setFormData({ name: "", phone: 0, address: "", email: "" });
  }, []);
  useEffect(() => {
    formNonCustomer(formData);
  }, [formData]);
  return (
    <Form style={{ width: "100%", marginLeft: "5px" }}>
      <Form.Group widths="equal">
        <Form.Field id="form-input-control-first-name" control={Input} label="Name" placeholder="Name" value={formData.name} onChange={(e, { value }) => setFormData({ ...formData, name: value })} />
        <Form.Field id="form-input-control-last-name" control={Input} type="number" label="Phone" placeholder="Phone" value={formData.phone} onChange={(e, { value }) => setFormData({ ...formData, phone: value })} />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Field id="form-textarea-control-opinion" control={TextArea} label="Address" placeholder="Address" value={formData.address} onChange={(e, { value }) => setFormData({ ...formData, address: value })} />
        {/* <Select placeholder="Select your province" options={data} onChange={(e, { value }) => setProvince(value)} /> */}
      </Form.Group>
      <Form.Field
        id="form-input-control-error-email"
        control={Input}
        label="Email"
        placeholder="joe@schmoe.com"
        error={{
          content: "Please enter a valid email address",
          pointing: "below",
        }}
        value={formData.email}
        onChange={(e, { value }) => setFormData({ ...formData, email: value })}
      />
    </Form>
  );
};

const FormReceiver = ({ formDataReceiver }) => {
  const [formData, setFormData] = useState({ name: "", phone: 0, address: "", email: "" });

  useEffect(() => {
    setFormData({ name: "", phone: 0, address: "" });
  }, []);
  useEffect(() => {
    formDataReceiver(formData);
  }, [formData]);
  return (
    <Form style={{ width: "100%", marginLeft: "5px" }}>
      <Form.Group widths="equal">
        <Form.Field id="form-input-control-first-name" control={Input} label="Name" placeholder="Name" value={formData.name} onChange={(e, { value }) => setFormData({ ...formData, name: value })} />
        <Form.Field id="form-input-control-last-name" control={Input} type="number" label="Phone" placeholder="Phone" value={formData.phone} onChange={(e, { value }) => setFormData({ ...formData, phone: value })} />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Field id="form-textarea-control-opinion" control={TextArea} label="Address" placeholder="Address" value={formData.address} onChange={(e, { value }) => setFormData({ ...formData, address: value })} />
        {/* <Select placeholder="Select your province" options={data} onChange={(e, { value }) => setProvince(value)} /> */}
      </Form.Group>
    </Form>
  );
};
