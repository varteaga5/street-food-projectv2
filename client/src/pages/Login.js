import React from "react";
import { useState } from "react";
import CustLoginForm from "../components/CustLoginForm";
import CustSignUpForm from "../components/CustSignUpForm";
import VendLoginForm from "../components/VendLoginForm";
import VendSignUpForm from "../components/VendSignUpForm";

export const Login = ({ onLogin }) => {
  const [showCustLogin, setShowCustLogin] = useState(true);
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div>
      <section>
        <h1>Street Foods</h1>
        <div>
          <button onClick={() => setShowCustLogin(true)}>Get Food</button>
          <button onClick={() => setShowCustLogin(false)}>Vendor</button>
        </div>
        {showCustLogin ? (
          showLogin ? (
            <>
              <CustLoginForm onLogin={onLogin} />
              <hr />
              <p>
                <button color="primary" onClick={() => setShowLogin(false)}>
                  Create New Account
                </button>
              </p>
            </>
          ) : (
            <>
              <CustSignUpForm onLogin={onLogin} />
              <hr />
              <p>
                <button color="primary" onClick={() => setShowLogin(true)}>
                  Back to Log In
                </button>
              </p>
            </>
          )
        ) : showLogin ? (
          <>
            <VendLoginForm onLogin={onLogin} />
            <hr />
            <p>
              <button color="primary" onClick={() => setShowLogin(false)}>
                Create New Account
              </button>
            </p>
          </>
        ) : (
          <>
            <VendSignUpForm onLogin={onLogin} />
            <hr />
            <p>
              <button color="primary" onClick={() => setShowLogin(true)}>
                Back to Log In
              </button>
            </p>
          </>
        )}
      </section>
    </div>
  );
};

export default Login;
