import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";

const SameProduct = ({ name, price, img, author, cate }) => {
  return (
    <Card>
      <Image src={img ? img : "book.jpeg"} wrapped ui={false} />
      <Card.Content>
        <h3>{name}</h3>
        <Card.Meta>{price} $</Card.Meta>
        <Card.Description>Author: {author}</Card.Description>
        <Card.Description>Category: {cate}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name="user" />
          Now
        </a>
      </Card.Content>
    </Card>
  );
};

export default SameProduct;
