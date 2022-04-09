import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import routes from "../routes";
import AuthLayout from "../components/auth/AuthLayout";
import { Button } from "../components/auth/Button";
import { Input } from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import styled from "styled-components";
import { FatLink } from "../components/shared";
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SubTitle = styled(FatLink)`
  margin-top: 10px;
  font-size: 16px;
  text-align: center;
`;

interface SignUpForm {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

const SignUp = () => {
  const navigate = useNavigate();
  const onCompleted = (data: any) => {
    const { username, password } = getValues();
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      return;
    }
    navigate(routes.home, {
      state: { username, password, message: "Plz log in." },
    });
  };
  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });
  const { register, handleSubmit, formState, getValues } = useForm<SignUpForm>({
    mode: "onChange",
  });
  const onValid = (data: SignUpForm) => {
    if (loading) return;
    //const { firstName, lastName, username, email, password } = data;
    createAccount({
      variables: {
        ...data,
      },
    });
  };
  return (
    <AuthLayout>
      <PageTitle title="Sign Up" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <SubTitle>Sign up to see photo and videos from your friends</SubTitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onValid)}>
          <Input
            {...register("firstName", { required: "firstName is required" })}
            type="text"
            placeholder="First Name"
          />
          <Input
            {...register("lastName", { required: "lastName is required" })}
            type="text"
            placeholder="Last Name"
          />
          <Input
            {...register("email", { required: "Email is required" })}
            type="text"
            placeholder="Email"
          />
          <Input
            {...register("username", { required: "password is required" })}
            type="text"
            placeholder="Username"
          />
          <Input
            {...register("password")}
            type="password"
            placeholder="Password"
          />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Sign Up"}
            disabled={!formState.isValid || loading}
          />
        </form>
      </FormBox>
      <BottomBox ctx="Have an account" linkText="Log in" link={routes.home} />
    </AuthLayout>
  );
};

export default SignUp;
