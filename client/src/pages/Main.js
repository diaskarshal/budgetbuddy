// // to do
// import React, { useContext, useEffect } from "react";
// import { Container } from "react-bootstrap";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import TypeBar from "../components/TypeBar";
// import CategoryBar from "../components/CategoryBar";
// import TransactionList from "../components/TransactionList";
// import { observer } from "mobx-react-lite";
// import { Context } from "../index";
// import { fetchCategories, fetchTransactions, fetchTypes } from "../http/transactionAPI";
// import Pages from "../components/Pages";

// const Main = observer(() => {
//   const { transaction } = useContext(Context);

//   useEffect(() => {
//     fetchTypes().then((data) => transaction.setTypes(data));
//     fetchCategories().then((data) => transaction.setBrands(data));
//     fetchTransactions(null, null, 1, 2).then((data) => {
//       transaction.setTransactions(data.rows);
//       transaction.setTotalCount(data.count);
//     });
//   }, []);

//   useEffect(() => {
//     fetchTransactions(
//       transaction.selectedType.id,
//       transaction.selectedCategory.id,
//       transaction.page,
//       12
//     ).then((data) => {
//       transaction.setTransactions(data.rows);
//       transaction.setTotalCount(data.count);
//     });
//   }, [transaction.page, transaction.selectedType, transaction.selectedCategory]);

//   return (
//     <Container>
//       <Row className="mt-2">
//         <Col md={3}>
//           <TypeBar />
//         </Col>
//         <Col md={9}>
//           <CategoryBar />
//           <TransactionList />
//           <Pages />
//         </Col>
//       </Row>
//     </Container>
//   );
// });

// export default Main;

import React, { useEffect, useState } from "react";
import axios from "axios";
import TopBar from "./components/TopBar";
import CategorySidebar from "./components/CategorySidebar";
import FilterBar from "./components/FilterBar";
import TransactionTable from "./components/TransactionTable";
import PaginationBar from "./components/PaginationBar";
import TransactionForm from "./components/TransactionForm";
import { Container, Row, Col } from "react-bootstrap";

const MainPage = () => {
  const [categories, setCategories] = useState({ expense: [], income: [] });
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({
    frequency: "month",
    amount: "",
    category: "",
    customDate: null,
    customAmount: null,
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editTransaction, setEditTransaction] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [filters, page]);

  const fetchCategories = async () => {
    const res = await axios.get("/api/categories");
    setCategories({
      expense: res.data.filter((c) => c.type === "expense"),
      income: res.data.filter((c) => c.type === "income"),
    });
  };

  const fetchTransactions = async () => {
    const res = await axios.get("/api/transactions", {
      params: { ...filters, page },
    });
    setTransactions(res.data.transactions);
    setTotalPages(res.data.totalPages);
  };

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPage(1);
  };

  const handleCategorySelect = (category) => {
    setFilters((prev) => ({ ...prev, category }));
    setPage(1);
  };

  const handleAddTransaction = () => {
    setEditTransaction(null);
    setShowForm(true);
  };

  const handleEditTransaction = (transaction) => {
    setEditTransaction(transaction);
    setShowForm(true);
  };

  const handleDeleteTransaction = async (id) => {
    await axios.delete(`/api/transactions/${id}`);
    fetchTransactions();
  };

  const handleFormSubmit = async (data) => {
    if (editTransaction) {
      await axios.put(`/api/transactions/${editTransaction.id}`, data);
    } else {
      await axios.post("/api/transactions", data);
    }
    setShowForm(false);
    fetchTransactions();
  };

  return (
    <Container fluid>
      <TopBar onAdd={handleAddTransaction} />
      <Row>
        <Col md={2}>
          <CategorySidebar
            categories={categories}
            onSelect={handleCategorySelect}
          />
        </Col>
        <Col md={10}>
          <FilterBar filters={filters} onChange={handleFilterChange} />
          <TransactionTable
            transactions={transactions}
            onEdit={handleEditTransaction}
            onDelete={handleDeleteTransaction}
          />
          <PaginationBar
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </Col>
      </Row>
      <TransactionForm
        show={showForm}
        onHide={() => setShowForm(false)}
        onSubmit={handleFormSubmit}
        categories={categories}
        editTransaction={editTransaction}
      />
    </Container>
  );
};

export default MainPage;
