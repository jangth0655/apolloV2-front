import styled from "styled-components";

export const Button = styled.input`
  margin-top: 12px;
  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  padding: 5px 0;
  width: 100%;
  border: 0;
  font-weight: 600;
  font-size: 12px;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`;
