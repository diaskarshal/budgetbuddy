import React, { useContext, useEffect, useState, useCallback } from "react";
import { Context } from "../index";
import { $authHost } from "../http/index";
import NavBar from "../components/NavBar";
import CategorySidebar from "../components/CategorySideBar";
import FilterBar from "../components/FilterBar";
import TransactionTable from "../components/TransactionTable";
import PaginationBar from "../components/PaginationBar";
import TransactionForm from "../components/modals/TransactionForm";
import { Container, Row, Col } from "react-bootstrap";

const MainPage = () => {
  const { transaction } = useContext(Context);
  const [categories, setCategories] = useState({ income: [], expense: [] });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    frequency: "",
    amount: "",
    category: "",
    customDate: null,
    customAmount: null,
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editTransaction, setEditTransaction] = useState(null);
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await $authHost.get("api/categories");

      if (!data || data.length === 0) {
        setCategories({ expense: [], income: [] });
      } else if (Array.isArray(data)) {
        const formattedData = {
          expense: data.filter((c) => c.type === "expense"),
          income: data.filter((c) => c.type === "income"),
        };
        setCategories(formattedData);
      } else {
        setCategories(data);
      }
      setCategoriesLoaded(true);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories({ expense: [], income: [] });
      setCategoriesLoaded(true);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTransactions = useCallback(async () => {
    try {
      const { data } = await $authHost.get("api/transaction", {
        params: {
          ...filters,
          page: transaction.page,
          limit: transaction.limit,
          ...(filters.customDate && {
            startDate: filters.customDate.from,
            endDate: filters.customDate.to,
          }),
          ...(filters.customAmount && {
            minAmount: filters.customAmount.min,
            maxAmount: filters.customAmount.max,
          }),
        },
      });
      setTransactions(data.transactions);
      transaction.setTotalCount(data.pagination.total);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }, [filters, page, transaction]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    fetchCategories();
    fetchTransactions();
  }, [fetchCategories, fetchTransactions, transaction.page]);

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPage(1);
  };

  const handleCategorySelect = (category) => {
    setFilters((prev) => ({ ...prev, category }));
    setPage(1);
  };

  const handleNavBarAddClick = () => {
    if (!categoriesLoaded) {
      fetchCategories().then(() => {
        setEditTransaction(null);
        setShowForm(true);
      });
    } else {
      setEditTransaction(null);
      setShowForm(true);
    }
  };

  const handleEditTransaction = (transaction) => {
    setEditTransaction(transaction);
    setShowForm(true);
  };

  const handleDeleteTransaction = async (_id) => {
    await $authHost.delete(`api/transaction/${_id}`);
    fetchTransactions();
  };

  const handleFormSubmit = async (data) => {
    try {
      if (editTransaction) {
        await $authHost.put(`api/transaction/${editTransaction._id}`, data);
      } else {
        await $authHost.post("api/transaction", data);
      }
      setShowForm(false);
      fetchTransactions();
    } catch (error) {
      console.error("Error submitting transaction:", error);
      alert("Error saving transaction. Please try again.");
    }
  };

  return (
    <>
      <NavBar
        onAddClick={handleNavBarAddClick}
        categories={categories}
        onSubmit={handleFormSubmit}
      />

      <Container fluid className="mt-4">
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
          key={editTransaction ? `edit-${editTransaction._id}` : "add"}
          show={showForm}
          onHide={() => setShowForm(false)}
          onSubmit={handleFormSubmit}
          categories={categories}
          editTransaction={editTransaction}
        />
      </Container>
    </>
  );
};

export default MainPage;
