import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import CircularProgressBar from "../components/statsBar/CircularProgressBar";
import LineProgressBar from "../components/statsBar/LineProgressBar";
import { fetchStats } from "../http/statsAPI";

const Stats = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats().then((data) => setStats(data.stats));
  }, []);

  if (!stats) return <div>Loading...</div>;

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

  // Prepare category data
  const incomeCategories = Object.entries(stats.byCategory)
    .filter(([_, v]) => v.total > 0)
    .map(([k, v]) => ({ name: k, percent: (v.total / stats.income) * 100 }));

  const expenseCategories = Object.entries(stats.byCategory)
    .filter(([_, v]) => v.total < 0)
    .map(([k, v]) => ({
      name: k,
      percent: (Math.abs(v.total) / stats.expense) * 100,
    }));

  return (
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
            <Card.Header>Total TurnOver: {turnover}</Card.Header>
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
            <Card.Header>Categorywise Income</Card.Header>
            <Card.Body>
              {incomeCategories.map((cat) => (
                <LineProgressBar
                  key={cat.name}
                  label={cat.name}
                  percentage={cat.percent}
                  lineColor="green"
                />
              ))}
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Header>Categorywise Expense</Card.Header>
            <Card.Body>
              {expenseCategories.map((cat) => (
                <LineProgressBar
                  key={cat.name}
                  label={cat.name}
                  percentage={cat.percent}
                  lineColor="red"
                />
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Stats;
