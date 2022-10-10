import { getAuth } from "firebase/auth";
import { useState } from "react";
import { IPassword } from "../types";
import ErrorPopUp from "./ErrorPopUp";

type Props = {
  editPasswordFunc: (password: IPassword) => void;
  closePopUp: () => void;
  password: IPassword;
};

const EditForm = (props: Props) => {
  const [label, setLabel] = useState<string>(props.password.label);
  const [password, setPassword] = useState<string>(props.password.password);
  const [isIncorrect, setIsIncorrect] = useState<boolean>(false);
  const userId = getAuth().currentUser?.uid;
  const editPasswordHandler = () => {
    if (password.length >= 6 && label.length >= 1) {
      userId &&
        props.editPasswordFunc({
          label: label,
          password: password,
          id: props.password.id,
        });
      setPassword("");
      setLabel("");
    } else {
      setIsIncorrect(true);
    }
  };
  return (
    <div className="absolute">
      <div className="edit-wrapper">
        <form>
          <h1 className="form-title">Edit</h1>
          <input
            className="form-input"
            minLength={2}
            value={label}
            onChange={(e) => {
              setLabel(e.target.value);
            }}
            placeholder="label"
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
              editPasswordHandler();
            }}
          >
            Edit
          </div>
          <div
            className="form-button cancel"
            onClick={() => {
              props.closePopUp();
            }}
          >
            Cancel
          </div>
          {isIncorrect && (
            <ErrorPopUp
              text="Your password or label is incorrect"
              setIsIncorrect={setIsIncorrect}
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default EditForm;
