// need to do 1 transaction per 1 line
import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Row } from "react-bootstrap";
import TransactionItem from "./TransactionItem";

const TransactionList = observer(() => {
  const { transaction } = useContext(Context);

  return (
    <Row className="d-flex">
      {transaction.devices.map((transaction) => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
    </Row>
  );
});

export default TransactionList;
