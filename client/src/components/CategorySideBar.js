import React from "react";
import { Card, ListGroup } from "react-bootstrap";

const CategorySidebar = ({ categories = { expense: [], income: [] }, onSelect }) => {
  return (
    <div>
      <Card className="mb-4">
        <Card.Header as="h6" className="text-center">
          Expense
        </Card.Header>
        <ListGroup variant="flush">
          {categories.expense?.map((cat) => (
            <ListGroup.Item
              key={cat.id}
              action
              onClick={() => onSelect(cat.categoryName)}
            >
              {cat.categoryName}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
      <Card>
        <Card.Header as="h6" className="text-center">
          Income
        </Card.Header>
        <ListGroup variant="flush">
          {categories.income?.map((cat) => (
            <ListGroup.Item
              key={cat.id}
              action
              onClick={() => onSelect(cat.categoryName)}
            >
              {cat.categoryName}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </div>
  );
};

export default CategorySidebar;
