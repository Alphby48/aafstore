import AuthLayout from "../components/layouts/authLayout";
import FormRegister from "../components/fragment/formRegister";
const RegisterPage = () => {
  return (
    <AuthLayout title="Register" type="register">
      <FormRegister />
    </AuthLayout>
  );
};

export default RegisterPage;
