import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const TransactionForm = ({
  show,
  onHide,
  onSubmit,
  categories = { expense: [], income: [] },
  editTransaction,
}) => {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    date: "",
    type: "expense",
    category: "",
  });

  useEffect(() => {
    if (editTransaction) {
      setForm({
        title: editTransaction.title,
        amount: editTransaction.amount,
        date: editTransaction.date,
        type: editTransaction.type,
        category: editTransaction.category,
      });
    } else {
      setForm({
        title: "",
        amount: "",
        date: "",
        type: "expense",
        category: "",
      });
    }
  }, [editTransaction, show]);

  const handleChange = (e) => {
    const { title, value } = e.target;
    setForm((prev) => ({ ...prev, [title]: value }));
    if (title === "type") {
      setForm((prev) => ({ ...prev, category: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title: form.title,
      amount: form.amount,
      date: form.date,
      type: form.type,
      category: form.category
    });
  };

  const categoryList =
    form.type === "expense"
      ? categories.expense || []
      : categories.income || [];

  console.log("Form type:", form.type);
  console.log("Available categories:", categoryList);
  if (
    show &&
    categories.expense.length === 0 &&
    categories.income.length === 0
  ) {
    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Loading Categories...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {editTransaction ? "Edit Transaction" : "Add Transaction"}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              title="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              title="amount"
              type="number"
              value={form.amount}
              onChange={handleChange}
              required
              min="0"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              title="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Select
              title="type"
              value={form.type}
              onChange={handleChange}
              required
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              title="category"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="">Select category</option>
              {categoryList.map((cat) => (
                <option value={cat.title}>{cat.title}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {editTransaction ? "Save" : "Add"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default TransactionForm;
