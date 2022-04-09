import styled from "styled-components";

interface InputProps {
  hasError: boolean;
  [key: string]: any;
}

export const Input = styled.input<InputProps>`
  width: 100%;
  padding: 7px;
  background-color: #fafafa;
  border: 0.5px solid
    ${(props) => (props.hasError ? "tomato" : props.theme.borderColor)};
  border-radius: 3px;
  margin-top: 5px;
  box-sizing: border-box;
  &::placeholder {
    font-size: 12px;
  }
`;
