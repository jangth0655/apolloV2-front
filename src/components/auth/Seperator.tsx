import styled from "styled-components";

const SSeperator = styled.div`
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

const Seperator = () => {
  return (
    <SSeperator>
      <div></div>
      <span>or</span>
      <div></div>
    </SSeperator>
  );
};

export default Seperator;
