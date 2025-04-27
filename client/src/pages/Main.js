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

import React, { useEffect, useState, useCallback } from "react";
import { $authHost } from "../http/index";
import TopBar from "../components/NavBar";
import CategorySidebar from "../components/CategorySideBar";
import FilterBar from "../components/FilterBar";
import TransactionTable from "../components/TransactionTable";
import PaginationBar from "../components/PaginationBar";
import TransactionForm from "../components/modals/TransactionForm";
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

  const fetchCategories = useCallback(async () => {
    const { data } = await $authHost.get("api/categories");
    setCategories({
      expense: data.filter((c) => c.type === "expense"),
      income: data.filter((c) => c.type === "income"),
    });
  }, []);

  const fetchTransactions = useCallback(async () => {
    const { data } = await $authHost.get("api/transaction", {
      params: { ...filters, page },
    });
    setTransactions(data.transactions);
    setTotalPages(data.pagination.totalPages);
  }, [filters, page]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

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
    await $authHost.delete(`api/transaction/${id}`);
    fetchTransactions();
  };

  const handleFormSubmit = async (data) => {
    if (editTransaction) {
      await $authHost.put(`api/transaction/${editTransaction.id}`, data);
    } else {
      await $authHost.post("api/transaction", data);
    }
    setShowForm(false);
    fetchTransactions();
  };

  return (
    <Container fluid>
      <TopBar
        onAdd={handleAddTransaction}
        categories={categories}
        onSubmit={handleFormSubmit}
      />
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
