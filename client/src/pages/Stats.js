import React, { useEffect, useState, useCallback } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import NavBar from "../components/NavBar";
import CircularProgressBar from "../components/statsBar/CircularProgressBar";
import LineProgressBar from "../components/statsBar/LineProgressBar";
import { fetchStats } from "../http/statsAPI";
import { $authHost } from "../http/index";
import { Spinner } from "react-bootstrap";
import TransactionForm from "../components/modals/TransactionForm";
import AIAnalysis from "../components/AIAnalysis";

const Stats = () => {
  const [stats, setStats] = useState(null);
  const [categories, setCategories] = useState({ income: [], expense: [] });
  const [showForm, setShowForm] = useState(false);
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);
  const [editTransaction, setEditTransaction] = useState(null);
  const [categoryMap, setCategoryMap] = useState({});
  const [loading, setLoading] = useState(true);

  const normalizePercent = (value) => {
    return Math.min(value, 100);
  };

  const fetchCategories = useCallback(async () => {
    try {
      const { data } = await $authHost.get("api/categories");

      if (!data || data.length === 0) {
        setCategories({ expense: [], income: [] });
      } else if (Array.isArray(data)) {
        const formattedData = {
          expense: data.filter((c) => c.type === "expense"),
          income: data.filter((c) => c.type === "income"),
        };
        setCategories(formattedData);

        const mapping = {};
        data.forEach((cat) => {
          mapping[cat.categoryName] = cat.type;
        });
        setCategoryMap(mapping);
      } else {
        setCategories(data);
      }
      setCategoriesLoaded(true);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories({ expense: [], income: [] });
      setCategoriesLoaded(true);
    }
  }, []);

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

  const handleFormSubmit = async (data) => {
    try {
      await $authHost.post("api/transaction", data);
      setShowForm(false);

      const updatedStats = await fetchStats();
      setStats(updatedStats.stats);
    } catch (error) {
      console.error("Error submitting transaction:", error);
      alert("Error saving transaction. Please try again.");
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchStats().then((data) => setStats(data.stats)),
      fetchCategories(),
    ]).finally(() => setLoading(false));
  }, [fetchCategories]);

  if (loading || !stats) return <Spinner animation="grow" />;

  const totalTransactions = stats.byType.income + stats.byType.expense;
  const incomePercent = totalTransactions
    ? (stats.byType.income / totalTransactions) * 100
    : 0;
  const expensePercent = totalTransactions
    ? (stats.byType.expense / totalTransactions) * 100
    : 0;
  const turnover = stats.income + stats.expense;
  const incomeTurnoverPercent = turnover ? (stats.income / turnover) * 100 : 0;
  const expenseTurnoverPercent = turnover
    ? (stats.expense / turnover) * 100
    : 0;

  const incomeCategories = Object.entries(stats.byCategory)
    .filter(([k, _]) => categoryMap[k] === "income")
    .map(([k, v]) => ({
      categoryName: k,
      percent: normalizePercent((v.total / stats.income) * 100),
    }));

  const expenseCategories = Object.entries(stats.byCategory)
    .filter(([k, _]) => categoryMap[k] === "expense")
    .map(([k, v]) => ({
      categoryName: k,
      percent: normalizePercent((Math.abs(v.total) / stats.expense) * 100),
    }));

  return (
    <>
      <NavBar
        onAddClick={handleNavBarAddClick}
        categories={categories}
        onSubmit={handleFormSubmit}
      />

      <Container className="mt-5">
        <Row>
          <Col md={3}>
            <Card>
              <Card.Header>Total Transactions: {totalTransactions}</Card.Header>
              <Card.Body>
                <div>Income: {stats.byType.income}</div>
                <div>Expense: {stats.byType.expense}</div>
                <CircularProgressBar percentage={incomePercent} color="green" />
                <CircularProgressBar percentage={expensePercent} color="red" />
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Header>Total: {turnover}</Card.Header>
              <Card.Body>
                <div>Income: {stats.income}</div>
                <div>Expense: {stats.expense}</div>
                <CircularProgressBar
                  percentage={incomeTurnoverPercent}
                  color="green"
                />
                <CircularProgressBar
                  percentage={expenseTurnoverPercent}
                  color="red"
                />
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Header>Income by category</Card.Header>
              <Card.Body>
                {incomeCategories.length === 0 ? (
                  <div className="text-muted">No income categories found</div>
                ) : (
                  incomeCategories.map((cat) => (
                    <LineProgressBar
                      key={cat.categoryName}
                      label={cat.categoryName}
                      percentage={cat.percent}
                      lineColor="green"
                    />
                  ))
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Header>Expense by category</Card.Header>
              <Card.Body>
                {expenseCategories.length === 0 ? (
                  <div className="text-muted">No expense categories found</div>
                ) : (
                  expenseCategories.map((cat) => (
                    <LineProgressBar
                      key={cat.categoryName}
                      label={cat.categoryName}
                      percentage={cat.percent}
                      lineColor="red"
                    />
                  ))
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col md={12}>
            <AIAnalysis />
          </Col>
        </Row>
      </Container>

      <TransactionForm
        key={editTransaction ? `edit-${editTransaction._id}` : "add"}
        show={showForm}
        onHide={() => setShowForm(false)}
        onSubmit={handleFormSubmit}
        categories={categories}
        editTransaction={editTransaction}
      />
    </>
  );
};

export default Stats;
