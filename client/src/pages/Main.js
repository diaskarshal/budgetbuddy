// to do
import React, { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TypeBar from "../components/TypeBar";
import CategoryBar from "../components/CategoryBar";
import TransactionList from "../components/TransactionList";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchCategories, fetchTransactions, fetchTypes } from "../http/transactionAPI";
import Pages from "../components/Pages";

const Main = observer(() => {
  const { transaction } = useContext(Context);

  useEffect(() => {
    fetchTypes().then((data) => transaction.setTypes(data));
    fetchCategories().then((data) => transaction.setBrands(data));
    fetchTransactions(null, null, 1, 2).then((data) => {
      transaction.setTransactions(data.rows);
      transaction.setTotalCount(data.count);
    });
  }, []);

  useEffect(() => {
    fetchTransactions(
      transaction.selectedType.id,
      transaction.selectedCategory.id,
      transaction.page,
      12
    ).then((data) => {
      transaction.setTransactions(data.rows);
      transaction.setTotalCount(data.count);
    });
  }, [transaction.page, transaction.selectedType, transaction.selectedCategory]);

  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <TransactionBar />
          <TransactionList />
          <Pages />
        </Col>
      </Row>
    </Container>
  );
});

export default Main;
