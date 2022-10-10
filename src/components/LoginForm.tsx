import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUserByPasswordAndEmail,
  loginWithEmailAndPassword,
} from "../firebase/firebase";
import ErrorPopUp from "./ErrorPopUp";

export default function LoginForm() {
  const [mail, setMail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isIncorrect, setIsIncorrect] = useState<boolean>(false);
  const [res, setRes] = useState<boolean | undefined>(false);
  const navigation = useNavigate();
  const auth = getAuth();
  getUserByPasswordAndEmail(password, mail).then((res) => setRes(res));
  const login = () => {
    if (
      res &&
      password.length >= 6 &&
      String(mail)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      loginWithEmailAndPassword(mail, password).then();
      onAuthStateChanged(auth, (user) => {
        if (!user) {
          setIsIncorrect(true);
        } else {
          navigation("/");
        }
      });
    } else {
      setIsIncorrect(true);
    }
  };
  return (
    <div className="form-wrapper">
      <form>
        <h1 className="form-title">Login</h1>
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
          minLength={6}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="password"
        />
        <div
          className="form-button"
          onClick={() => {
            login();
          }}
        >
          Login
        </div>
        <a className="form-link" href="/register">
          Register
        </a>
        {isIncorrect && (
          <ErrorPopUp
            text="Your password or email is incorrect"
            setIsIncorrect={setIsIncorrect}
            res={res}
          />
        )}
      </form>
    </div>
  );
}
