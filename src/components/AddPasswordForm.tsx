import { getAuth } from "firebase/auth";
import { useState } from "react";
import { addPassword } from "../firebase/firebase";
import ErrorPopUp from "./ErrorPopUp";

type Props = {
  addPasswordFunc: (label: string, password: string, id: string) => void;
};

export default function AddPasswordForm({ addPasswordFunc }: Props) {
  const [label, setLabel] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isIncorrect, setIsIncorrect] = useState<boolean>(false);
  const userId = getAuth().currentUser?.uid;
  const addNewPassword = () => {
    if (password.length >= 6 && label.length >= 1) {
      const id = Date.now().toString();
      userId &&
        addPassword(userId, { label: label, password: password, id: id });
      addPasswordFunc(label, password, id);
      setPassword("");
      setLabel("");
    } else {
      setIsIncorrect(true);
    }
  };
  return (
    <form className="add-form">
      <input
        className="form-input"
        value={label}
        onChange={(e) => {
          setLabel(e.target.value);
        }}
        placeholder="label"
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
          addNewPassword();
        }}
      >
        Add
      </div>
      {isIncorrect && (
        <ErrorPopUp
          text="Your password or label is incorrect"
          setIsIncorrect={setIsIncorrect}
        />
      )}
    </form>
  );
}
