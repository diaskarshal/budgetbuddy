import React from "react";
import { Row, Col, Dropdown, Form } from "react-bootstrap";

const frequencyOptions = [
  { label: "Last day", value: "day" },
  { label: "Last week", value: "week" },
  { label: "Last month", value: "month" },
  { label: "Custom", value: "custom" },
];

const amountOptions = [
  { label: "< 1000", value: "1000" },
  { label: "< 5000", value: "5000" },
  { label: "< 10000", value: "10000" },
  { label: "Custom", value: "custom" },
];

const FilterBar = ({ filters, onChange }) => {
  return (
    <Row className="mb-2">
      <Col md={2}>
        <Dropdown onSelect={(val) => onChange({ frequency: val })}>
          <Dropdown.Toggle variant="outline-secondary" id="dropdown-frequency">
            {frequencyOptions.find((opt) => opt.value === filters.frequency)
              ?.label || "Frequency"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {frequencyOptions.map((opt) => (
              <Dropdown.Item key={opt.value} eventKey={opt.value}>
                {opt.label}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Col>
      <Col md={2}>
        <Dropdown onSelect={(val) => onChange({ amount: val })}>
          <Dropdown.Toggle variant="outline-secondary" id="dropdown-amount">
            {amountOptions.find((opt) => opt.value === filters.amount)?.label ||
              "Amount"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {amountOptions.map((opt) => (
              <Dropdown.Item key={opt.value} eventKey={opt.value}>
                {opt.label}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Col>
      {filters.frequency === "custom" && (
        <Col md={4}>
          <Form.Label>Period:</Form.Label>
          <Form.Control
            type="date"
            value={filters.customDate?.from || ""}
            onChange={(e) =>
              onChange({
                customDate: { ...filters.customDate, from: e.target.value },
              })
            }
            style={{ display: "inline", width: "45%", marginRight: "5%" }}
          />
          <Form.Control
            type="date"
            value={filters.customDate?.to || ""}
            onChange={(e) =>
              onChange({
                customDate: { ...filters.customDate, to: e.target.value },
              })
            }
            style={{ display: "inline", width: "45%" }}
          />
        </Col>
      )}
      {filters.amount === "custom" && (
        <Col md={4}>
          <Form.Label>Amount range:</Form.Label>
          <Form.Control
            type="number"
            placeholder="Min"
            value={filters.customAmount?.min || ""}
            onChange={(e) =>
              onChange({
                customAmount: { ...filters.customAmount, min: e.target.value },
              })
            }
            style={{ display: "inline", width: "45%", marginRight: "5%" }}
          />
          <Form.Control
            type="number"
            placeholder="Max"
            value={filters.customAmount?.max || ""}
            onChange={(e) =>
              onChange({
                customAmount: { ...filters.customAmount, max: e.target.value },
              })
            }
            style={{ display: "inline", width: "45%" }}
          />
        </Col>
      )}
    </Row>
  );
};

export default FilterBar;
