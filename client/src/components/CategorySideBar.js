// // need to do frequency
// import React, { useContext } from "react";
// import { observer } from "mobx-react-lite";
// import { Context } from "../index";
// import { Card, Row, Col } from "react-bootstrap";

// const CategoryBar = observer(() => {
//   const { transaction } = useContext(Context);

//   return (
//     <Row className="d-flex flex-wrap">
//       {transaction.categories.map((category) => (
//         <Col xs="auto" key={transaction.id}>
//           <Card
//             style={{ cursor: "pointer" }}
//             className="p-3"
//             onClick={() => transaction.setSelectedCategory(category)}
//             border={brand.id === transaction.selectedCategory.id ? "danger" : "light"}
//           >
//             {category.name}
//           </Card>
//         </Col>
//       ))}
//     </Row>
//   );
// });

// export default CategoryBar;
import React from "react";
import { Card, ListGroup } from "react-bootstrap";

const CategorySidebar = ({ categories, onSelect }) => {
  return (
    <div>
      <Card className="mb-4">
        <Card.Header as="h6" className="text-center">
          Expense
        </Card.Header>
        <ListGroup variant="flush">
          {categories.expense.map((cat) => (
            <ListGroup.Item
              key={cat.id}
              action
              onClick={() => onSelect(cat.name)}
            >
              {cat.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
      <Card>
        <Card.Header as="h6" className="text-center">
          Income
        </Card.Header>
        <ListGroup variant="flush">
          {categories.income.map((cat) => (
            <ListGroup.Item
              key={cat.id}
              action
              onClick={() => onSelect(cat.name)}
            >
              {cat.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </div>
  );
};

export default CategorySidebar;
