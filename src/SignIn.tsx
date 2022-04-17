import React, { FC, useEffect, useState } from "react";
import cx from "classnames";

interface SignInProps {
  setIsSignedIn: (value: boolean) => void;
  setPass: (value: string) => void;
  pass: string;
}

export const SignIn: FC<SignInProps> = ({ setIsSignedIn, setPass, pass }) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleChange = (event: any) => {
    setPass(event.target.value);
  };

  const goShawty = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 500);
    pass && setIsSignedIn(true);
  };

  const onKeyDownHandler = (e: any) => {
    if (e.key === "Enter") {
      goShawty();
    }
  };

  return (
    <div className="sign-in">
      <label htmlFor="pass">Enter token</label>
      <input
        name="pass"
        type="password"
        onChange={handleChange}
        value={pass}
        onKeyDown={onKeyDownHandler}
      />
      <button
        className={cx("btn", {
          active: isClicked,
        })}
        onClick={goShawty}
        disabled={!pass}
        title={pass ? "click to check" : "enter token"}
      >
        go shawty
      </button>
    </div>
  );
};
