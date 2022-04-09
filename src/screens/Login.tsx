import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { logUserIn } from "../apollo";
import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import routes from "../routes";
import AuthLayout from "../components/auth/AuthLayout";
import { Button } from "../components/auth/Button";
import Seperator from "../components/auth/Seperator";
import { Input } from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import { HelmetProvider } from "react-helmet-async";
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";
import { gql, useMutation } from "@apollo/client";
import { Location, useLocation } from "react-router-dom";

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

interface LoginForm {
  username: string;
  password: string;
  errors: string;
}

interface LoginState {
  username: string;
  password: string;
  message: string;
}

const Notification = styled.div`
  color: #2ecc71;
`;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

const Login = () => {
  const location: Location = useLocation();
  const state = location.state as LoginState | null;

  const { register, handleSubmit, formState, setError, clearErrors } =
    useForm<LoginForm>({
      mode: "onChange",
      defaultValues: {
        username: state?.username || "",
        password: state?.password || "",
      },
    });
  const onCompleted = (data: any) => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) {
      return setError("errors", { message: error });
    }
    if (token) {
      logUserIn(token);
    }
  };
  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });
  const onValid = (data: LoginForm) => {
    if (loading) return;
    const { username, password } = data;
    login({
      variables: {
        username,
        password,
      },
    });
  };

  //console.log(formState.isValid);
  const clearLoginError = () => {
    clearErrors("errors");
  };

  return (
    <HelmetProvider>
      <AuthLayout>
        <PageTitle title="Log in" />
        <FormBox>
          <div>
            <FontAwesomeIcon icon={faInstagram} size="3x" />
          </div>
          <Notification>{state?.message}</Notification>
          <form onSubmit={handleSubmit(onValid)}>
            <Input
              {...register("username", {
                onChange: clearLoginError,
                required: true,
                minLength: {
                  value: 3,
                  message: "Username should be longer then 3",
                },
              })}
              type="text"
              placeholder="Username"
              hasError={Boolean(formState.errors.username?.message)}
            />
            <FormError message={formState.errors.username?.message} />
            <Input
              {...register("password", {
                onChange: clearLoginError,
                required: true,
              })}
              type="password"
              placeholder="Password"
            />
            <Button
              type="submit"
              value={loading ? "Loading..." : "Log in"}
              placeholder="Log in"
              disabled={!formState.isValid || loading}
            />
          </form>
          <FormError message={formState.errors?.errors?.message} />
          <Seperator />
          <FacebookLogin>
            <FontAwesomeIcon icon={faFacebookSquare} />
            <span>Log ini with Facebook</span>
          </FacebookLogin>
        </FormBox>
        <BottomBox
          ctx="Don't have an account"
          link={routes.signUp}
          linkText="SignUp"
        />
      </AuthLayout>
    </HelmetProvider>
  );
};

export default Login;
