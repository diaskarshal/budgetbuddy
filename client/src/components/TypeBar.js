// import React, { useContext } from "react";
// import { observer } from "mobx-react-lite";
// import { Context } from "../index";
// import Col from "react-bootstrap/Col";
// import ListGroup from "react-bootstrap/ListGroup";

// const TypeBar = observer(() => {
//   const { transaction } = useContext(Context);
//   return (
//     <ListGroup>
//       {transaction.types.map((type) => (
//         <ListGroup.Item
//           style={{ cursor: "pointer" }}
//           active={type.id === transaction.selectedType.id}
//           onClick={() => transaction.setSelectedType(type)}
//           key={type.id}
//         >
//           {type.name}
//         </ListGroup.Item>
//       ))}
//     </ListGroup>
//   );
// });

// export default TypeBar;
