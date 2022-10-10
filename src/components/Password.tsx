import { useState } from "react";
import { deletePassword } from "../firebase/firebase";
import { IPassword } from "../types";

export type Props = {
  password: string;
  label: string;
  id: string | undefined;
  uid: string | undefined;
  deletePasswordFunc: (id: string) => void;
  setShowFunc: (password: IPassword) => void;
};

function Password({
  password,
  label,
  id,
  uid,
  deletePasswordFunc,
  setShowFunc,
}: Props) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const deleteItem = () => {
    const passwordItem: IPassword = {
      label: label,
      password: password,
      id: id,
    };
    deletePassword(uid, passwordItem);
    id && deletePasswordFunc(id);
  };
  return (
    <div className="password">
      <div className="label">{label}</div>
      <input
        className="password-input"
        value={password}
        type={showPassword ? "text" : "password"}
        disabled
      />
      <div className="buttons-container password-buttons">
        <div
          className="form-button"
          onClick={() => {
            setShowPassword(!showPassword);
          }}
        >
          {showPassword ? "Hide" : "Show"}
        </div>
        <div
          className="form-button"
          onClick={() => {
            setShowFunc({ label: label, password: password, id: id });
          }}
        >
          Edit
        </div>
        <div
          className="form-button delete"
          onClick={() => {
            deleteItem();
          }}
        >
          Delete
        </div>
      </div>
    </div>
  );
}

export default Password;
