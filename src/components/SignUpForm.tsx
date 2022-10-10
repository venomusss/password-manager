import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAccountWithEmailAndPassword } from "../firebase/firebase";
import ErrorPopUp from "./ErrorPopUp";

export default function SignUpForm() {
  const [name, setName] = useState<string>("");
  const [isIncorrect, setIsIncorrect] = useState<boolean>(false);
  const [mail, setMail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigation = useNavigate();
  const register = () => {
    if (
      name.length >= 2 &&
      password.length >= 6 &&
      String(mail)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      createAccountWithEmailAndPassword(mail, password, name).then();
      navigation("/");
    } else {
      setIsIncorrect(true);
    }
  };

  return (
    <form>
      <h1 className="form-title">Sign Up</h1>
      <input
        className="form-input"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="name"
      />
      <input
        className="form-input"
        type={"email"}
        value={mail}
        onChange={(e) => {
          setMail(e.target.value);
        }}
        placeholder="email"
      />
      <input
        className="form-input"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="password"
      />
      <div
        className="form-button"
        onClick={() => {
          register();
        }}
      >
        Sign Up
      </div>
      <a className="form-link" href="/login ">
        Login
      </a>
      {isIncorrect && (
        <ErrorPopUp
          text="Your name, password or email is incorrect"
          setIsIncorrect={setIsIncorrect}
        />
      )}
    </form>
  );
}
