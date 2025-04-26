import React, { useContext } from "react";
import { Context } from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { STATS_ROUTE, LOGIN_ROUTE, MAIN_ROUTE } from "../utils/consts";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import CreateTransaction from "./modals/updateTransaction";

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [transactionVisible, setTransactionVisible] = useState(false);

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
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
              onClick={() => setTransactionVisible(true)}
              className="ms-2"
            >
              Add transaction
            </Button>
            <Button
              variant="outline-light"
              onClick={() => navigate(STATS_ROUTE)}
            >
              Stats
            </Button>
            <Button variant="outline-light" onClick={logOut} className="ms-2">
              Log out
            </Button>
            <CreateTransaction
              show={transactionVisible}
              onHide={() => setTransactionVisible(false)}
            />
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
