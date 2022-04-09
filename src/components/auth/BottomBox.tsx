import { Link } from "react-router-dom";
import styled from "styled-components";
import { BaseBox } from "../shared";

interface BottomBoxProps {
  ctx: string;
  link: string;
  linkText: string;
  [key: string]: any;
}

const SBottomBox = styled(BaseBox)`
  padding: 20px 0px;
  text-align: center;
  a {
    font-weight: 600;
    color: ${(props) => props.theme.accent};
    margin-left: 5px;
  }
`;

const BottomBox = ({ ctx, link, linkText }: BottomBoxProps) => {
  return (
    <SBottomBox>
      <span>{ctx}</span>
      <Link to={link}>{linkText}</Link>
    </SBottomBox>
  );
};

export default BottomBox;
