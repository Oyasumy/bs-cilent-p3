import React from "react";
import { Card, Grid, Icon } from "semantic-ui-react";

const ListProduct = () => {
  return (
    <Grid.Row>
      <Card
        image="client/images/elliot.jpg"
        header="Elliot Baker"
        meta="Friend"
        description="Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat."
        extra={
          <a>
            <Icon name="user" />
            16 Friends
          </a>
        }
      />
    </Grid.Row>
  );
};

export default ListProduct;
