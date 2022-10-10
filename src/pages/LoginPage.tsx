import React from "react";
import LoginForm from "../components/LoginForm";

interface LoginPageProps {}

const LoginPage: React.FunctionComponent<LoginPageProps> = () => {
  return (
    <div className="auth-wrapper">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
