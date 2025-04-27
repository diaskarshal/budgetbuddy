import React, { useContext } from "react";
import { Context } from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink, useNavigate } from "react-router-dom";
import { MAIN_ROUTE, STATS_ROUTE, LOGIN_ROUTE } from "../utils/consts";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import Container from "react-bootstrap/Container";

const NavBar = observer(({ onAddClick }) => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.removeItem("token");
    navigate(LOGIN_ROUTE);
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
              onClick={onAddClick}
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
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
