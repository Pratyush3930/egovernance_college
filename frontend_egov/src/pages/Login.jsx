import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div className="h-full flex flex-col items-center justify-start gap-4 flex-1">
      <div className="flex flex-col items-center gap-4">
        <img src="./logo.png" alt="" />
        <h2 className="text-2xl font-semibold">Bill Management System</h2>
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
