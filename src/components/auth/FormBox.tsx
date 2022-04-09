import styled from "styled-components";
import { BaseBox } from "../shared";
import { AuxProps } from "./AuthLayout";

const Container = styled(BaseBox)`
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

const FormBox = ({ children }: AuxProps) => {
  return <Container>{children}</Container>;
};

export default FormBox;
