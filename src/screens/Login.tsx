import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import { isLoggedInVar } from "../apollo";

import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const WhiteBox = styled.div`
  background-color: white;
  border: 1px solid ${(props) => props.theme.borderColor};
  width: 100%;
`;

const TopBox = styled(WhiteBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 35px 40px 20px 40px;
  margin-bottom: 20px;
  form {
    margin-top: 35px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 7px;
  background-color: #fafafa;
  border: 0.5px solid ${(props) => props.theme.borderColor};
  border-radius: 3px;
  margin-top: 5px;
  box-sizing: border-box;
  &::placeholder {
    font-size: 12px;
  }
`;

const Button = styled.input`
  margin-top: 12px;
  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  padding: 5px 0;
  width: 100%;
  border: 0;
  font-weight: 600;
  font-size: 12px;
`;

const BottomBox = styled(WhiteBox)`
  padding: 20px 0px;
  text-align: center;
  a {
    font-weight: 600;
    color: ${(props) => props.theme.accent};
    margin-left: 5px;
  }
`;

const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`;

const Seperator = styled.div`
  margin: 15px 0 30px 0px;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  div {
    width: 100%;
    height: 2px;
    background-color: ${(props) => props.theme.borderColor};
  }
  span {
    margin: 0 10px;
    color: #8e8e8e;
  }
`;

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const Login = () => {
  return (
    <Container>
      <Wrapper>
        <TopBox>
          <div>
            <FontAwesomeIcon icon={faInstagram} size="3x" />
          </div>
          <form>
            <Input type="text" placeholder="Username" />
            <Input type="password" placeholder="Password" />
            <Button type="submit" value="Log in" placeholder="Log in" />
          </form>
          <Seperator>
            <div></div>
            <span>or</span>
            <div></div>
          </Seperator>
          <FacebookLogin>
            <FontAwesomeIcon icon={faFacebookSquare} />
            <span>Log ini with Facebook</span>
          </FacebookLogin>
        </TopBox>
        <BottomBox>
          <span>Don't have an account?</span>
          <Link to={`/sign-up`}>Sign up</Link>
        </BottomBox>
      </Wrapper>
    </Container>
  );
};

export default Login;
