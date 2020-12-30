import React, { useEffect, useState } from "react";
import { Container, Grid, Modal, Progress, Select } from "semantic-ui-react";
import ListOder from "./ListOder";
import { Button as ButtonSemantic, Input } from "semantic-ui-react";
import { main } from "../../commons/checkData.js";
import { province as data } from "../../commons/data";
import { getEditCustomer, getEditPassCustomer } from "../../api/book";
import { loadCustomer } from "../../commons/callApi";
import Swal from "sweetalert2";
import { TypeCustomer } from "../../constants/configRedux";
const Content = ({ customerState, orderState, getDetailOrder, loadCusAgain, openCancel, setOpenCancel, cancelOrder }) => {
  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [showEditPass, setShowEditPass] = useState(false);
  const [title, setTitle] = useState("");

  const [pointCus, setPointCus] = useState();

  const [point, setPoint] = useState(0);
  // useEffect(() => {
  //   TypeCustomer.forEach((element) => {
  //     if (customerState.point > element.min && customerState.point < element.max) {
  //       setPointCus(element);
  //     }
  //   });
  // }, [customerState]);

  useEffect(() => {
    console.log("c", customerState);
    TypeCustomer.forEach((element) => {
      if (customerState.data.point > element.min && customerState.data.point < element.max) {
        setPointCus(element);
        // setPoint((customerState.data.point / pointCus.max).toFixed(0));
      }
    });
  }, []);

  useEffect(() => {
    if (pointCus) {
      setPoint(((customerState.data.point / pointCus.max) * 100).toFixed(2));
    }
  }, [pointCus]);

  // console.log("oc", orderState);
  // Call Api to ADD or EDIT
  const onEnter = async (data) => {
    console.log("Enter", data);
    if (data.id !== -1) {
      // Call api to edit author
      await getEditCustomer(data)
        .then(async (response) => {
          console.log(response);
          // Redux edit data
          if (response) {
            // loadData();
            // Hide modal
            setShowModal(false);
            // Show message success
            loadCusAgain();
            //
            Swal.fire({
              // position: 'top-end',
              icon: "success",
              title: "Update Information success!!",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          // handleEditCustomer({ NameCustomer: data.name, CustomerID: data.id });
        })

        .catch((err) => {
          console.log(err);
          setShowModal(false);
          // Hide modal
          setShowModal(false);
          // Show message failed
          Swal.fire({
            // position: 'top-end',
            icon: "error",
            title: "Something error!!",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    }
  };

  // Call Api to edit pass
  const onEditPass = async (v) => {
    console.log("p", { pass: v.pass, id: customerState.data.CustomerID });

    if (v.pass) {
      await getEditPassCustomer({ pass: v.pass, id: customerState.data.CustomerID })
        .then((res) => {
          console.log("res", res);
          if (res.msg === "ok") {
            // loadData();
            // Hide modal
            setShowEditPass(false);
            // Show message success
            Swal.fire({
              // position: 'top-end',
              icon: "success",
              title: "Update Password!!",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          // Hide modal
          setShowEditPass(false);
          // Show message failed
          Swal.fire({
            // position: 'top-end',
            icon: "error",
            title: "Something error!!",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    }
  };

  return (
    <>
      <Container textAlign="left">
        <Grid columns={10}>
          <Grid.Row style={{ justifyContent: "center" }}>
            <h1 style={{ textTransform: "uppercase" }}>
              {customerState.isLogin ? customerState.data.NameCustomer : ""} <h6 style={{textAlign:'center'}}>{pointCus ? pointCus.type : ""}</h6>{" "}
            </h1>
          </Grid.Row>
          <Grid.Row>
            {pointCus ? (
              <>
                <Progress percent={point || 0} color="red"  indicating style={{ width: "100%", height: "fit-content" }} />
                <div style={{ display: "flex", justifyContent: "space-between",marginTop:'-30px' ,width:'100%'}}>
                  <div>
                    <h3>{pointCus.min}</h3>
                  </div>
                  <div>
                    <h3>{pointCus.max}</h3>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </Grid.Row>
          {/* <Progress percent={13} inverted color='yellow' progress /> */}
          {/* <Progress percent={100} color='red' /> */}
          <Grid.Row>
            <Grid.Column computer={2}>Phone Customer</Grid.Column>
            <Grid.Column>{customerState.isLogin ? customerState.data.PhoneCustomer : ""}</Grid.Column>
            <Grid.Column computer={2}>Email Customer</Grid.Column>
            <Grid.Column>{customerState.isLogin ? customerState.data.EmailCustomer : ""}</Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column computer={3}>Address Customer</Grid.Column>
            <Grid.Column computer={4}>{customerState.isLogin ? customerState.data.AddressCustomer : ""}</Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <ModelShow title={title} isShow={showModal} setShow={(s) => setShowModal(s)} onEnter={(e) => onEnter(e)} dataEdit={customerState.data} />
            <ModalUpdatePass isShow={showEditPass} setShow={(s) => setShowEditPass(s)} onEditPass={(v) => onEditPass(v)} />
          </Grid.Row>
        </Grid>

        <ListOder orderState={orderState} getDetailOrder={getDetailOrder} openCancel={openCancel} setOpenCancel={setOpenCancel} cancelOrder={cancelOrder} />
      </Container>
    </>
  );
};

export default Content;

const ModelShow = ({ isShow, setShow, title, onCancelData, onEnter, dataEdit }) => {
  const [state, setState] = useState({ name: "", phone: "", email: "", address: "", pass: "", id: -1 });
  // const [open, setOpen] = useState(isShow);
  const [disable, setDisable] = useState(true);

  const [province, setProvince] = useState("");
  // Check data Edit
  useEffect(() => {
    if (Object.keys(dataEdit).length > 0) {
      console.log("ed", dataEdit);
      setState({ name: dataEdit.NameCustomer, phone: dataEdit.PhoneCustomer, email: dataEdit.EmailCustomer, address: dataEdit.AddressCustomer.split(",")[0], id: dataEdit.CustomerID });
    } else {
      setDisable(true);
      setState({ name: "", id: -1 });
    }
  }, [dataEdit]);
  // check disable button
  useEffect(() => {
    console.log("check bu");
    if (state.name && state.phone) {
      console.log("ph", state.phone.length);
      if (state.name.length >= 3 && state.name.length <= 20 && state.phone.length === 10) {
        setDisable(false);
      }
      //  else if (state.phone.length >= 3 && state.phone.length <= 20) {
      //     setDisable(false);
      //   }
      else {
        setDisable(true);
      }
    }
  }, [state.name, state.phone]);
  // function
  // Cancel
  const onCancel = () => {
    setState({});
    onCancelData();
  };

  return (
    <Modal dimmer="blurring" onClose={() => setShow(false)} size="small" style={{ height: "fit-content", margin: "auto", left: 0, right: 0, top: "30%" }} onOpen={() => setShow(true)} open={isShow} trigger={<ButtonSemantic>Edit Information</ButtonSemantic>}>
      <Modal.Header>Update Information</Modal.Header>
      <Modal.Content>
        <Container textAlign="center">
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
            {/* Name */}
            <Input
              icon="users"
              iconPosition="left"
              placeholder="Name Customer"
              style={{ width: "300px", marginLeft: "5px" }}
              value={state.name}
              onChange={(e, v) => {
                // console.log(v.value);
                if (v.value === "") {
                  setState({ ...state, name: v.value });
                }
                if (main([v.value])) {
                  setState({ ...state, name: v.value });
                }
              }}
            />
            {/* <Label as="a" color="teal" tag style={{ marginLeft: "20px" }}>
              Name Customer
            </Label> */}

            {/* Phone */}

            <Input
              icon="users"
              iconPosition="left"
              placeholder="Phone Customer"
              type="number"
              style={{ width: "300px", marginLeft: "5px" }}
              value={state.phone}
              onChange={(e, v) => {
                // console.log(v.value);
                if (v.value === "") {
                  setState({ ...state, phone: v.value });
                }
                if (main([v.value])) {
                  setState({ ...state, phone: v.value });
                }
              }}
            />
            {/* <Label as="a" color="teal" tag style={{ marginLeft: "20px" }}>
              Phone Customer
            </Label> */}
          </div>

          {/* Email */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
            {/* <Label as="a" color="teal" tag style={{ marginLeft: "20px" }}>
              Email Customer
            </Label> */}

            <Input
              icon="users"
              iconPosition="left"
              placeholder="Address Customer"
              style={{ width: "300px", marginLeft: "5px" }}
              value={state.address}
              onChange={(e, v) => {
                // console.log(v.value);
                if (v.value === "") {
                  setState({ ...state, address: v.value });
                }
                if (main([v.value])) {
                  setState({ ...state, address: v.value });
                }
              }}
            />

            <Select placeholder="Select your province" options={data} onChange={(e, { value }) => setProvince(value)} style={{ width: "300px", marginLeft: "5px" }} />

            {/* <Label as="a" color="teal" tag style={{ marginLeft: "20px" }}>
              Email Customer
            </Label> */}
          </div>

          {/* Pass */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
            <Input
              icon="users"
              iconPosition="left"
              placeholder="Email Customer"
              style={{ width: "300px", marginLeft: "5px" }}
              value={state.email}
              onChange={(e, v) => {
                // console.log(v.value);
                if (v.value === "") {
                  setState({ ...state, email: v.value });
                }
                if (main([v.value])) {
                  setState({ ...state, email: v.value });
                }
              }}
            />
            {title === "Add Customer!!" ? (
              <Input
                icon="users"
                iconPosition="left"
                style={{ width: "300px", marginLeft: "5px" }}
                placeholder="Password Customer"
                type="password"
                value={state.pass}
                onChange={(e, v) => {
                  // console.log(v.value);
                  if (v.value === "") {
                    setState({ ...state, pass: v.value });
                  }
                  if (main([v.value])) {
                    setState({ ...state, pass: v.value });
                  }
                }}
              />
            ) : null}
            {/* <Label as="a" color="teal" tag style={{ marginLeft: "20px" }}>
              Password Customer
            </Label> */}
          </div>
        </Container>
      </Modal.Content>
      <Modal.Actions>
        <ButtonSemantic color="black" onClick={() => setShow(false)}>
          Disagree
        </ButtonSemantic>
        <ButtonSemantic content="Yep, that's me" labelPosition="right" icon="checkmark" onClick={() => onEnter({ ...state, address: state.address + ", " + province })} disabled={disable}>
          Agree
        </ButtonSemantic>
      </Modal.Actions>
    </Modal>
  );
};

const ModalUpdatePass = ({ isShow, setShow, onEditPass }) => {
  const [state, setState] = useState({});
  return (
    <Modal onClose={() => setShow(false)} size="small" style={{ height: "fit-content", margin: "auto", left: 0, right: 0, top: "30%" }} onOpen={() => setShow(true)} open={isShow} trigger={<ButtonSemantic>Edit Pass</ButtonSemantic>}>
      <Modal.Header>Update Password Customer</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <h3>Update new password</h3>
          <Input
            icon="users"
            iconPosition="left"
            placeholder="Password Customer"
            type="password"
            value={state.pass}
            onChange={(e, v) => {
              // console.log(v.value);
              if (v.value === "") {
                setState({ ...state, pass: v.value });
              }
              if (main([v.value])) {
                setState({ ...state, pass: v.value });
              }
            }}
          />
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <ButtonSemantic color="black" onClick={() => setShow(false)}>
          Nope
        </ButtonSemantic>
        <ButtonSemantic content="Yep, that's me" labelPosition="right" icon="checkmark" onClick={() => onEditPass(state)} positive />
      </Modal.Actions>
    </Modal>
  );
};
