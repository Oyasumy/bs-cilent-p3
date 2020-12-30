import React, { useEffect, useState } from "react";
import { Button, Container, Header, Icon, Image, Label, Message, Modal, Segment, Grid, Table } from "semantic-ui-react";
import moment from "moment";
import vi from "moment/locale/vi";

const ModalDetail = ({ open, setOpen, onEnter, dataEdit }) => {
  // const [state, setState] = useState({ name: "", id: -1 });
  // const [open, setOpen] = useState(open);
  const [disable, setDisable] = useState(true);

  // Check data Edit
  // console.log("ed", open);

  useEffect(() => {
    if (dataEdit.order) {
      if (dataEdit.order.trangthai !== "cancel") {
        setDisable(false);
      } else {
        setDisable(true);
      }
    } else {
      setDisable(true);
    }
  }, [dataEdit]);
  // function
  // Cancel
  const onCancel = () => {
    setOpen(false);
  };

  // component
  const showProduct = (prop, ship) => {
    // console.log("p", ship);
    var result = null;
    result = prop.map((pro, i) => {
      return (
        <Grid.Row key={i} style={{ marginLeft: "5%" }}>
          <Segment>
            <Label as="a" color="red" ribbon>
              Name Product: {pro.NameProduct}
            </Label>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", overflow: "hidden" }}>
              <Image src={pro.url || pro[0].url} style={{ width: "50px" }} />
              <Label color="blue">
                <span>Name Author: {pro.NameAuthor} </span>
              </Label>
              <Label color="red">
                <span>Quantity: {pro.quantity} </span>
              </Label>
              <Label color="brown">
                <span>Price: {pro.PriceProduct} </span>
              </Label>
              <Label color="brown">
                <span>Total: {pro.PriceProduct * pro.quantity} $ </span>
              </Label>
            </div>
          </Segment>
        </Grid.Row>
      );
    });
    return result;
  };

  //
  const showReceiver = (data) => {
    var result = null;
    if (data.idReceiver) {
      result = (
        <>
          <h3>Information Receiver!!</h3>

          <Table singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Phone</Table.HeaderCell>
                <Table.HeaderCell>Address</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>{data.name}</Table.Cell>
                <Table.Cell>{data.phone}</Table.Cell>
                <Table.Cell>{data.address}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </>
      );
    }
    return result;
  };
  return (
    <Modal dimmer="blurring" open={open} onClose={() => setOpen(false)} style={{ height: "fit-content", display: "flex", justifyContent: "center", margin: "auto", left: 0, right: 0, top: "3em" }}>
      <Modal.Header>Update State!!</Modal.Header>
      <Modal.Content>
        {/* Products */}
        <Container>
          {/* Show Customer */}

          {/* Show Ship code */}

          {dataEdit.order ? showReceiver(dataEdit.order) : ""}
          {/* Show list product */}
          <h3>List Order!!</h3>
          <Grid columns="equal">{dataEdit.detail ? showProduct(dataEdit.detail, dataEdit.shipcode) : ""}</Grid>
          {/* Show Ship Code */}
          <Container columns="equal">
            {dataEdit.shipcode ? (
              <Segment style={{ width: "fit-content", marginLeft: "auto" }}>
                <Label color="grey">
                  <span>Ship Code fee: {dataEdit.shipcode.cost} $ </span>
                </Label>
              </Segment>
            ) : (
              ""
            )}
          </Container>

          {/* Show Discount */}
          <Container columns="equal" style={{ marginTop: "5px" }}>
            {dataEdit.discount ? (
              <Segment style={{ width: "fit-content", marginLeft: "auto" }}>
                <Label color="purple">
                  <span>Discount percent: {dataEdit.discount.percent} $ </span>
                </Label>
              </Segment>
            ) : (
              ""
            )}
          </Container>
          {/* Total cost */}
          <Container columns="equal" style={{ marginTop: "5px" }}>
            {dataEdit.order ? (
              <Segment style={{ width: "fit-content", marginLeft: "auto" }}>
                <Label color="orange">
                  <span>Total Cost: {dataEdit.order.tongtienthu} $ </span>
                </Label>
              </Segment>
            ) : (
              ""
            )}
          </Container>
        </Container>
        {/* Cancel order  */}
        {dataEdit.order ? (
          dataEdit.order.cancel ? (
            <Container style={{ marginTop: "5px" }}>
              <Message warning>
                <h3>The order was canceled!</h3>
                <p>{dataEdit.order.cancel}.</p>
              </Message>
            </Container>
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => onCancel()}>
          Disagree
        </Button>
        {/* <Button positive onClick={() => onEnter(dataEdit)} disabled={disable}>
          Agree
        </Button> */}
      </Modal.Actions>
    </Modal>
  );
};

export default ModalDetail;
