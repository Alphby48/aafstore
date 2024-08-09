import { Link } from "react-router-dom";
const AuthLayout = (props) => {
  const { title, type, children } = props;
  return (
    <div className="authlayout">
      <div className="image">
        <Link to={"/"}>
          <img src="./img/logo.png " alt="" />
        </Link>
      </div>
      <div className="auth-box">
        <h1>{title}</h1>
        {children}
        <p className="text-auth">
          {type === "login"
            ? "Dont have account? "
            : "Already have an account? "}
          {type === "login" && (
            <Link to="/register" className="text-auth-link">
              Register
            </Link>
          )}
          {type === "register" && (
            <Link to="/login" className="text-auth-link">
              Login
            </Link>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
