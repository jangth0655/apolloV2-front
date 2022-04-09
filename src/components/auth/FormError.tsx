import styled from "styled-components";

const SFormError = styled.div`
  color: tomato;
  font-weight: 600;
  font-size: 18;
  margin: 5px 0 10px 0;
`;

type ErrorMessage = {
  message?: string;
};

const FormError = ({ message }: ErrorMessage) => {
  return message === "" || !message ? null : <SFormError>{message}</SFormError>;
};

export default FormError;
