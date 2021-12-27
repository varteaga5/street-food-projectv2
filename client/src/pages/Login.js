import React from "react";
import { useState } from "react";
import CustLoginForm from "../components/CustLoginForm";
import CustSignUpForm from "../components/CustSignUpForm";
import VendLoginForm from "../components/VendLoginForm";
import VendSignUpForm from "../components/VendSignUpForm";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

export const Login = ({ onLogin }) => {
  const [showCustLogin, setShowCustLogin] = useState(true);
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div>
      <section>
        <Container>
          <h1>Street Foods</h1>
          <p>
            <Button variant="danger" onClick={() => setShowCustLogin(true)}>
              get food!
            </Button>{" "}
            <Button
              variant="warning"
              className="text-light"
              onClick={() => setShowCustLogin(false)}
            >
              vendors!
            </Button>
          </p>
        </Container>
        {showCustLogin ? (
          showLogin ? (
            <>
              <Container>
                <CustLoginForm onLogin={onLogin} />
              </Container>
              <hr />
              <Container>
                <Button variant="danger" onClick={() => setShowLogin(false)}>
                  create new account
                </Button>
              </Container>
            </>
          ) : (
            <>
              <Container>
                <CustSignUpForm onLogin={onLogin} />
              </Container>

              <hr />
              <Container>
                <Button variant="danger" onClick={() => setShowLogin(true)}>
                  back to log in
                </Button>
              </Container>
            </>
          )
        ) : showLogin ? (
          <>
            <Container>
              <VendLoginForm onLogin={onLogin} />
            </Container>

            <hr />
            <Container>
              <Button
                className="text-light"
                variant="warning"
                onClick={() => setShowLogin(false)}
              >
                create new account
              </Button>
            </Container>
          </>
        ) : (
          <>
            <Container>
              <VendSignUpForm onLogin={onLogin} />
            </Container>
            <hr />
            <Container>
              <Button
                className="text-light"
                variant="warning"
                onClick={() => setShowLogin(true)}
              >
                back to log in
              </Button>
            </Container>
          </>
        )}
      </section>
    </div>
  );
};

export default Login;
