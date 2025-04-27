import React, { useContext, useState } from "react";
import { Context } from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink, useNavigate } from "react-router-dom";
import { MAIN_ROUTE, STATS_ROUTE, LOGIN_ROUTE } from "../utils/consts";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import TransactionForm from "./modals/TransactionForm";

const NavBar = observer(({ onAdd, categories, onSubmit }) => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [transactionVisible, setTransactionVisible] = useState(false);

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.removeItem("token");
    navigate(LOGIN_ROUTE);
  };

  const handleAddClick = () => {
    setTransactionVisible(true);
    onAdd?.();
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <NavLink style={{ color: "white" }} to={MAIN_ROUTE}>
          BudgetBuddy
        </NavLink>
        {user.isAuth && (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <Button
              variant="outline-light"
              onClick={handleAddClick}
              className="ms-2"
            >
              Add transaction
            </Button>
            <Button
              variant="outline-light"
              onClick={() => navigate(STATS_ROUTE)}
              className="ms-2"
            >
              Stats
            </Button>
            <Button variant="outline-light" onClick={logOut} className="ms-2">
              Log out
            </Button>
            <TransactionForm
              show={transactionVisible}
              onHide={() => setTransactionVisible(false)}
              onSubmit={onSubmit}
              categories={categories}
            />
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
