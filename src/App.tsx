import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Card } from "./Card";
import { SignIn } from "./SignIn";
export interface AccountObject {
  id: string;
  sendId: string;
  currencyCode: number;
  cashbackType: string;
  balance: number;
  creditLimit: number;
  maskedPan: string[];
  type: string;
  iban: string;
}

const App = () => {
  const [accounts, setAccounts] = useState<Array<AccountObject>>();
  const [name, setName] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [requestError, setRequestError] = useState<string>();

  const pullData = async () => {
    const res = await axios
      .get("https://api.monobank.ua/personal/client-info", {
        headers: {
          "X-Token": pass,
        },
      })
      .catch((error) => {
        setRequestError(error.response.data.errorDescription);
      });
    if (res && res.data) {
      setAccounts(
        res.data.accounts.length &&
          res.data.accounts
            .filter((i: AccountObject) => i.type !== "eAid")
            .sort(
              (a: AccountObject, b: AccountObject) =>
                b.currencyCode - a.currencyCode
            )
            .sort((a: AccountObject, b: AccountObject) => {
              const fa = a.type.toLowerCase(),
                fb = b.type.toLowerCase();
              if (fa < fb) return -1;
              if (fa > fb) return 1;
              return 0;
            })
      );
      setName(res.data.name);
    }
  };

  useEffect(() => {
    isSignedIn && pullData();
  }, [isSignedIn]);

  return (
    <div className="App">
      {isSignedIn ? (
        <>
          {name && <h1>Добрий день, {name}.</h1>}
          {accounts?.length &&
            accounts.map((i) => <Card key={i.id} data={i} />)}
        </>
      ) : (
        <SignIn setIsSignedIn={setIsSignedIn} setPass={setPass} pass={pass} />
      )}
      {requestError && (
        <div className="error">
          {requestError}
          <button
            className="btn"
            onClick={() => {
              setIsSignedIn(false);
              setPass("");
              setRequestError("");
            }}
          >
            enter another token
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
