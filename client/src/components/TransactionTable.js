import React from "react";
import { Table, Button } from "react-bootstrap";
import { Pencil, X } from "react-bootstrap-icons";

const TransactionTable = ({ transactions, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Type</th>
          <th>Category</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {transactions.length === 0 ? (
          <tr>
            <td colSpan="6" className="text-center">
              No transactions found.
            </td>
          </tr>
        ) : (
          transactions.map((tx) => (
            <tr key={tx._id}>
              <td>{tx.name}</td>
              <td>{tx.amount}</td>
              <td>{tx.date}</td>
              <td>{tx.type}</td>
              <td>{tx.category}</td>
              <td>
                <Button variant="link" size="sm" onClick={() => onEdit(tx)}>
                  <Pencil />
                </Button>
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => onDelete(tx._id)}
                  style={{ color: "red" }}
                >
                  <X />
                </Button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};

export default TransactionTable;
