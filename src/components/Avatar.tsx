import styled from "styled-components";

const SAvatar = styled.div<{ lg: boolean }>`
  width: ${(props) => (props.lg ? "30px" : "25px")};
  height: ${(props) => (props.lg ? "30px" : "25px")};
  border-radius: 15px;
  background-color: ${(props) => props.theme.accent};
  overflow: hidden;
`;

const Img = styled.img`
  max-width: 80%;
`;

type AvatarProps = {
  url?: string;
  lg?: boolean;
};

const Avatar = ({ url, lg = false }: AvatarProps) => {
  return (
    <SAvatar lg>{url !== "" ? <Img src={url} alt="avatar" /> : null}</SAvatar>
  );
};

export default Avatar;
