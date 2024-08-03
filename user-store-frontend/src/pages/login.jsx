import AuthLayout from "../components/layouts/authLayout";
import FormLogin from "../components/fragment/formLogin";
const LoginPage = () => {
  return (
    <AuthLayout title="Login" type="login">
      <FormLogin />
    </AuthLayout>
  );
};

export default LoginPage;
