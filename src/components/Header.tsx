import { getAuth, signOut, User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigation = useNavigate();
  const auth = getAuth();
  const [user, setUser] = useState<User | null>(auth.currentUser);

  useEffect(() => {
    auth.onAuthStateChanged((user) => setUser(user));
  }, [auth]);

  return (
    <div className="header">
      <div className="logo">Passwords Manager</div>
      <div className="buttons-container">
        {user ? (
          <div
            className="header-button"
            onClick={() => {
              signOut(auth);
            }}
          >
            Sign Out
          </div>
        ) : (
          <>
            {" "}
            <div
              className="header-button"
              onClick={() => {
                navigation("/login");
              }}
            >
              {" "}
              Login
            </div>{" "}
            <div
              className="header-button"
              onClick={() => {
                navigation("/register");
              }}
            >
              {" "}
              Register
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
