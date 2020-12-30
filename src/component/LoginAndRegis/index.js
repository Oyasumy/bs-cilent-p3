import React, { useState } from "react";
import { Button, Form, Grid, Header, Image, Label, Menu, Message, Segment, Select, Tab } from "semantic-ui-react";
import { Modal } from "semantic-ui-react";

// Redux
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import * as actionModal from "../../actions/modal";
import * as actionBooks from "../../actions/book";
//
import { main } from "../../commons/checkData";
import { addCustomer, checkCustomer } from "../../api/book";
import Swal from "sweetalert2";
import { province as data } from "../../commons/data";
import { loadAllCart, loadCheckShipCode } from "../../commons/callApi";
const LoginAndRegister = ({ isShow, actionModal, customerState, actionBook }) => {
  const [open, setOpen] = React.useState(false);

  const [indexTab, setIndexTab] = React.useState(0);
  const panes = [
    {
      menuItem: { key: "users", icon: "users", content: "LOGIN" },
      pane: {
        key: 1,
        content: "This tab has center-aligned text",
        textAlign: "center",
      },
      render: () => (
        <Tab.Pane>
          <Login choose={() => setIndexTab(1)} setShow={setShow} loginFunc={loginFunc} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: <Menu.Item key="messages">REGISTER</Menu.Item>,
      pane: {
        key: 2,
        content: "This tab has center-aligned text",
        textAlign: "center",
      },
      render: () => (
        <Tab.Pane>
          <Register choose={() => setIndexTab(0)} setShow={setShow} SignupFunc={signupFunc} />
        </Tab.Pane>
      ),
    },
  ];
  // handle set show modal
  React.useEffect(() => {
    setOpen(isShow);
  }, [isShow]);
  // onclick to set modal
  const setShow = () => {
    actionModal.handleShowModal(false);
  };
  const loginFunc = async (phone, pass) => {
    if (!(phone, pass)) return;

    await checkCustomer({ phone, pass })
      .then(async (res) => {
        console.log("re", res);
        if (res.msg === "ok") {
          actionBook.handleSetCustomer(res.result[0]);
          localStorage.setItem("user", JSON.stringify(res.result[0]));
          // get cart customer
          const res2 = await loadAllCart(res.result[0].CustomerID);
          const { handleSetCart } = actionBook;
          handleSetCart(res2);
          // get ship code customer
          const addr = res.result[0].AddressCustomer.split(",");
          if (addr[1]) {
            const res3 = await loadCheckShipCode(addr[1]);
            console.log("res3", res3);
            const { handleSetShipCode } = actionBook;
            handleSetShipCode(res3.result[0]);
          }
        }
      })
      .then(() => {
        actionModal.handleShowModal(false);
        Swal.fire({
          // position: 'top-end',
          icon: "success",
          title: "Login success!!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((er) => {
        console.log("err", er);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          timer: 1500,
        });
      });
    // setOpen(false);
    console.log("c", phone, pass);
  };
  const signupFunc = async (data) => {
    if (data.phone || data.name || data.address || data.email) return;
    var { password, ...newD } = data.data;
    await addCustomer({ ...newD, pass: password })
      .then((res) => {
        if (res.msg === "ok") {
          Swal.fire({
            // position: 'top-end',
            icon: "success",
            title: "Register success!!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        // actionModal.handleShowModal(false);
      })
      .catch((err) => {
        console.log("err", err);
        // actionModal.handleShowModal(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };
  return (
    <Modal open={open} onClose={() => setOpen(false)} onOpen={() => setOpen(true)} style={{ margin: "auto", display: "flex", justifyContent: "center", left: 0, right: 0, marginTop: "10%", height: "fit-content" }}>
      <Modal.Header>Profile Picture</Modal.Header>
      <Modal.Content image scrolling>
        {/* <Image size="medium" src="/images/wireframe/image.png" wrapped /> */}
        <Tab panes={panes} activeIndex={indexTab} onTabChange={(e, { activeIndex }) => setIndexTab(activeIndex)} />
        <Modal.Description></Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

const Login = ({ choose, setShow, loginFunc }) => {
  //Validation
  const [userVali, setUserVali] = useState("");
  const [passVali, setPassVali] = useState("");
  // onchange
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Grid textAlign="center" style={{ height: "60vh", width: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center" style={{ padding: "10px", borderRadius: "10px", backgroundColor: "white" }}>
          <Image src="client/images/logo.png" />
          Log-in to your account
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              type="number"
              iconPosition="left"
              placeholder="Phone number"
              value={phone}
              onChange={(e, { value }) => {
                if (value.toString().length > 15) {
                  setUserVali("Require max 15 number");
                  return;
                }
                setPhone(value);
                if (value.toString().length < 10) {
                  setUserVali("Require 10 number");
                  return;
                }
                if (!main([value])) {
                  setUserVali("Invalid name");
                  return;
                }
                setUserVali("");
              }}
            />
            <p>{userVali}</p>
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e, { value }) => {
                if (value.toString().length > 15) {
                  setPassVali("Require max 15 character");
                  return;
                }
                setPassword(value);
                if (value.toString().length < 3) {
                  setPassVali("Require 3 character");
                  return;
                }
                if (!main([value])) {
                  setPassVali("Invalid pass");
                  return;
                }
                setPassVali("");
              }}
            />
            <p>{passVali}</p>
            <Button color="teal" fluid size="large" onClick={() => (userVali === "" && passVali === "" ? loginFunc(phone, password) : null)}>
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us?{" "}
          <Label as="a" color="teal" tag onClick={() => choose()}>
            Sign up
          </Label>
        </Message>
        <Button color="teal" fluid size="large" onClick={() => setShow()}>
          Cancel
        </Button>
      </Grid.Column>
    </Grid>
  );
};
const Register = ({ choose, setShow, SignupFunc }) => {
  //Validation
  const [nameVali, setNameVali] = useState("");
  const [userVali, setUserVali] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [passVali, setPassVali] = useState("");
  // onchange
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [addressVali, setAddressVali] = useState("");
  const [emailVali, setEmailVali] = useState("");
  const [confirmPassVali, setconfirmPassVali] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Grid textAlign="center" style={{ height: "60vh", width: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center" style={{ padding: "10px", borderRadius: "10px" }}>
          <Image src="client/images/logo.png" />
          Register your account
        </Header>
        <Form size="large">
          <Segment stacked>
            {/* // Name  */}
            <Form.Input
              fluid
              icon="user"
              // type="number"
              iconPosition="left"
              placeholder="Name"
              value={name}
              onChange={(e, { value }) => {
                if (value.toString().length > 15) {
                  setNameVali("Require max 15 character");
                  return;
                }
                setName(value);
                if (value.toString().length < 4) {
                  setNameVali("Require 4 character");
                  return;
                }
                if (!main([value])) {
                  setNameVali("Invalid name");
                  return;
                }
                setNameVali("");
              }}
            />
            <p>{nameVali}</p>
            {/* End name */}

            {/* Phone */}
            <Form.Input
              fluid
              icon="user"
              type="number"
              iconPosition="left"
              placeholder="Phone number"
              value={phone}
              onChange={(e, { value }) => {
                if (value.toString().length > 15) {
                  setUserVali("Require max 15 number");
                  return;
                }
                setPhone(value);
                if (value.toString().length < 10) {
                  setUserVali("Require 10 number");
                  return;
                }
                if (!main([value])) {
                  setUserVali("Invalid name");
                  return;
                }
                setUserVali("");
              }}
            />
            <p>{userVali}</p>
            {/* End Phone */}

            {/* // Address  */}
            <Form.Input
              fluid
              icon="user"
              // type="number"
              iconPosition="left"
              placeholder="Address"
              value={address}
              onChange={(e, { value }) => {
                if (value.toString().length > 40) {
                  setAddressVali("Require max 40 character");
                  return;
                }
                setAddress(value);
                if (value.toString().length < 4) {
                  setAddressVali("Require 4 character");
                  return;
                }
                if (!main([value])) {
                  setAddressVali("Invalid name");
                  return;
                }
                setAddressVali("");
              }}
            />
            <Select placeholder="Select your province" options={data} onChange={(e, { value }) => setProvince(value)} />
            <p>{addressVali}</p>
            {/* End Address */}

            {/* // Email  */}
            <Form.Input
              fluid
              icon="user"
              type="email"
              iconPosition="left"
              placeholder="Email"
              value={email}
              onChange={(e, { value }) => {
                if (value.toString().length > 20) {
                  setEmailVali("Require max 20 character");
                  return;
                }
                setEmail(value);
                if (value.toString().length < 4) {
                  setEmailVali("Require 4 character");
                  return;
                }
                if (!main([value])) {
                  setEmailVali("Invalid name");
                  return;
                }
                setEmailVali("");
              }}
            />
            <p>{emailVali}</p>
            {/* End Email */}
            {/* Password */}
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e, { value }) => {
                if (value.toString().length > 15) {
                  setPassVali("Require max 15 character");
                  return;
                }
                setPassword(value);
                if (value.toString().length < 3) {
                  setPassVali("Require 3 character");
                  return;
                }
                if (!main([value])) {
                  setPassVali("Invalid pass");
                  return;
                }
                setPassVali("");
              }}
            />
            <p>{passVali}</p>
            {/* End Password */}

            {/* Password */}
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password confirm"
              type="password"
              value={confirmPass}
              onChange={(e, { value }) => {
                setConfirmPass(value);
                if (!(value.toString() === password.toString())) {
                  setconfirmPassVali("Not same!!");
                  return;
                }
                if (!main([value])) {
                  setconfirmPassVali("Invalid pass");
                  return;
                }
                setconfirmPassVali("");
              }}
            />
            <p>{confirmPassVali}</p>
            {/* End Password */}

            <Button
              color="teal"
              fluid
              size="large"
              onClick={() => (!(userVali || passVali || nameVali || emailVali || addressVali || confirmPassVali) ? SignupFunc({ data: { name, phone, password, address: address + "," + province, email } }) : null)}>
              Register
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us?{" "}
          <Label as="a" color="teal" tag onClick={() => choose()}>
            Sign In
          </Label>
        </Message>
        <Button color="teal" fluid size="large" onClick={() => setShow()}>
          Cancel
        </Button>
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  isShow: state.modal.isShow,
  customerState: state.customer,
});
const mapDispatchToProps = (dispatch) => ({
  actionModal: bindActionCreators({ ...actionModal }, dispatch),
  actionBook: bindActionCreators({ ...actionBooks }, dispatch),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(LoginAndRegister);
