import React, { useEffect, useState } from "react";
import { Button, Container, Grid, Label, Modal, Pagination, Table, TextArea } from "semantic-ui-react";
import moment from "moment";
import vi from "moment/locale/vi";

const ListOder = ({ orderState, getDetailOrder, openCancel, setOpenCancel, cancelOrder }) => {
  // Set Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postPage] = useState(5);
  const [pageNumber, setPageNumber] = useState(0);
  // console.log("od", orderState);
  // Pagination
  // Change pagination
  useEffect(() => {
    setPageNumber(Math.ceil(orderState.length / postPage));
  }, [orderState, pageNumber, postPage]);

  // Set current page
  const handlePagination = (data) => {
    setCurrentPage(data.activePage);
  };

  const showListOrder = (data) => {
    var result = null;
    result = data.map((order, i) => {
      var color = "teal";
      if (order.trangthai === "pending") {
        color = "gray";
      } else if (order.trangthai === "done") {
        color = "violet";
      }else if(order.trangthai==="approve"){
        color='blue'
      } else {
        color = "orange";
      }
      const newDate = moment(order.ngaydat).locale("vi", vi).format("MMMM Do YYYY, h:mm:ss a");

      return (
        <Table.Row key={i} >
          <Table.Cell>{order.idoder}</Table.Cell>
          <Table.Cell>{newDate}</Table.Cell>
          <Table.Cell>{order.tongtienthu}</Table.Cell>
          <Table.Cell onClick={() => getDetailOrder(order)}>
            {" "}
            <Label color={color} style={{ textTransform: "uppercase" }}>
              {order.trangthai}
            </Label>
          </Table.Cell>
          {order.trangthai === "pending" ? (
            <Table.Cell>
              <Label color='red' style={{ textTransform: "uppercase" }} onClick={()=>setOpenCancel(true)}>
                Cancel
              </Label>
            </Table.Cell>
          ) : null}
        </Table.Row>
      );
    });
    return result;
  };

  var hideData = [...orderState];
  const indexOfLastPost = currentPage * postPage;
  const indexOfFirstPost = indexOfLastPost - postPage;

  const currentPost = hideData.splice(indexOfFirstPost, postPage);

  return (
    <Container textAlign="center">
      <ModalCancel isShowConfirm={openCancel} setShow={(t) => setOpenCancel(t)} onCancelData={(v) => cancelOrder(v)} />
      <h2 style={{ marginTop: "20px" }}>List Order</h2>
      {/* <Grid relaxed columns="4">
        <Grid.Row>
          <Grid.Column>Order ID</Grid.Column>
          <Grid.Column>Date</Grid.Column>
          <Grid.Column>Cost</Grid.Column>
          <Grid.Column>State</Grid.Column>
        </Grid.Row>
        {orderState ? showListOrder(orderState) : null}
      </Grid> */}

      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Order ID</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Cost</Table.HeaderCell>
            <Table.HeaderCell>State</Table.HeaderCell>
            <Table.HeaderCell>P</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{orderState ? showListOrder(currentPost) : null}</Table.Body>
      </Table>
      <Pagination defaultActivePage={currentPage} pointing secondary totalPages={pageNumber} onPageChange={(e, d) => handlePagination(d)} style={{ display: "flex", justifyContent: "center", marginTop: "3em", paddingBottom: "3em" }} />
    </Container>
  );
};

export default ListOder;

const ModalCancel = ({ isShowConfirm, onCancelData, setShow }) => {
  const [open, setOpen] = useState(isShowConfirm);
  const [value, setValue] = useState("");

  useEffect(() => {
    setOpen(isShowConfirm);
  }, [isShowConfirm]);
  return (
    <Modal size="tiny" open={open} onOpen={() => setShow(true)} style={{ height: "fit-content", display: "flex", justifyContent: "center", margin: "auto",left:0,right:0,top:'9em' }}>
      <Modal.Header>Cancel Order!!</Modal.Header>
      <Modal.Content>
        <p>Are you sure you want to Cancel this Order</p>
      </Modal.Content>
      <TextArea placeholder="Tell us more" value={value} onChange={(e, { value }) => setValue(value)} style={{ width: "90%", display: "flex", justifyContent: "center", margin: "auto", marginBottom: "5px", padding: "5px" }} />
      <Modal.Actions>
        <Button negative onClick={() => setShow(false)}>
          No
        </Button>
        <Button positive onClick={() => onCancelData(value)} disabled={value.length <= 5 ? true : false}>
          Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
