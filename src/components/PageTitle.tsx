import { Helmet } from "react-helmet";

type PageTitleProps = {
  title: string;
};

const PageTitle = ({ title }: PageTitleProps) => {
  return (
    <Helmet>
      <title>{title} | Insta Clone</title>
    </Helmet>
  );
};

export default PageTitle;
