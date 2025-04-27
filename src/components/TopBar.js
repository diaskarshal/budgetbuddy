import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const TopBar = ({ onAdd }) => {
  const navigate = useNavigate();
  return (
    <Navbar bg="secondary" variant="light" className="mb-3" style={{ padding: '0.5rem 1rem' }}>
      <Navbar.Brand style={{ color: 'white', fontWeight: 'bold' }}>BudgetBuddy</Navbar.Brand>
      <Nav className="ms-auto align-items-center">
        <Button variant="outline-dark" className="me-2" onClick={onAdd}>Add transaction</Button>
        <Button variant="outline-dark" className="me-2" onClick={() => navigate('/stats')}>Stats</Button>
        <Button variant="outline-dark" onClick={() => navigate('/logout')}>Log out</Button>
      </Nav>
    </Navbar>
  );
};

export default TopBar;
