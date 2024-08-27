/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Divider } from "antd";
import MainForm from "../../components/form/MainForm";
import FormInput from "../../components/form/FormInput";
import { Link, useNavigate } from "react-router-dom";
import { GoogleCircleFilled } from "@ant-design/icons";
import { useAppDispatch } from "../../redux/hook";
import { useLoginMutation } from "../../redux/features/authApi";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { verifyToken } from "../../utils/verifyToken";
import { setUser, TUser } from "../../redux/features/authSlice";

const Login = () => {
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  const defaultValues = {
    email: "jonyu@gmail.com",
    password: "123456",
  };

  const [login] = useLoginMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Login In...");

    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.token) as TUser;
      dispatch(
        setUser({
          user,
          token: res.token,
        })
      );
      toast.success("Success Login", { id: toastId, duration: 1000 });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!", { id: toastId, duration: 1000 });
    }
  };
  return (
    <div className="flex bg-[#f9f9f6] justify-center items-center h-full py-12">
      <Col span={7} className="bg-white p-6 shadow rounded-lg">
        <h2 className="text-2xl font-bold text-[#333] text-center ">Login</h2>

        <div className="my-6 text-center">
          <MainForm onSubmit={onSubmit} defaultValues={defaultValues}>
            <FormInput type={"email"} name={"email"} placeholder="Email" />
            <FormInput
              type={"password"}
              name={"password"}
              placeholder="Password"
            />
            <Link to="" className="text-blue-600 ">
              Forgot Password?
            </Link>
            <Button
              type="primary"
              size="large"
              className="btn-block mt-5"
              htmlType="submit"
            >
              Login
            </Button>
          </MainForm>
          <div className="mt-4">
            <span>
              Don't have an account ?{" "}
              <Link className="text-blue-400" to="/register">
                Register
              </Link>
            </span>
            <Divider>Or</Divider>
            <button className="btn border-[#ccc] btn-outline btn-neutral btn-block btn-md">
              <GoogleCircleFilled className="text-xl" />
              Login with Google
            </button>
          </div>
        </div>
      </Col>
    </div>
  );
};

export default Login;
