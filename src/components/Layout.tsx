import styled from "styled-components";
import Header from "./auth/Header";

const Content = styled.main`
  margin: 0 auto;
  margin-top: 45px;
  max-width: 930px;
  width: 100%;
`;

interface LayoutChildren {
  [key: string]: React.ReactNode;
}

function Layout({ children }: LayoutChildren) {
  return (
    <>
      <Header />
      <Content>{children}</Content>
    </>
  );
}

export default Layout;
