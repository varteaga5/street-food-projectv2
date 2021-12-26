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
            </Button>
            <Button variant="warning" onClick={() => setShowCustLogin(false)}>
              vendors!
            </Button>
          </p>
        </Container>
        {showCustLogin ? (
          showLogin ? (
            <>
              <Container className="bg-danger shadow-1-strong">
                <CustLoginForm onLogin={onLogin} />
              </Container>
              <hr />
              <Container>
                <button color="primary" onClick={() => setShowLogin(false)}>
                  Create New Account
                </button>
              </Container>
            </>
          ) : (
            <>
              <Container className="bg-danger shadow-1-strong">
                <CustSignUpForm onLogin={onLogin} />
              </Container>

              <hr />
              <Container>
                <button color="primary" onClick={() => setShowLogin(true)}>
                  Back to Log In
                </button>
              </Container>
            </>
          )
        ) : showLogin ? (
          <>
            <Container className="bg-warning shadow-1-strong">
              <VendLoginForm onLogin={onLogin} />
            </Container>

            <hr />
            <Container>
              <button color="primary" onClick={() => setShowLogin(false)}>
                Create New Account
              </button>
            </Container>
          </>
        ) : (
          <>
            <Container className="bg-warning shadow-1-strong">
              <VendSignUpForm onLogin={onLogin} />
            </Container>
            <hr />
            <Container>
              <button color="primary" onClick={() => setShowLogin(true)}>
                Back to Log In
              </button>
            </Container>
          </>
        )}
      </section>
    </div>
  );
};

export default Login;
