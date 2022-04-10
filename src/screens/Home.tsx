import { gql, useQuery } from "@apollo/client";
import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTitle";

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      id
      user {
        username
        avatar
      }
      file
      caption
      likes
      comments
      createdAt
      isMine
      isLiked
    }
  }
`;

interface SeeFeedResponse {
  seeFeed: {
    id: number;
    user: {
      username: string;
      avatar: string;
    };
    file: string;
    caption: string;
    likes: number;
    comments: string;
    createdAt: string;
    isMine: string;
    isLiked: boolean;
  }[];
}

const Home = () => {
  const { data } = useQuery<SeeFeedResponse>(FEED_QUERY);

  return (
    <div>
      <PageTitle title="Home" />
      {data?.seeFeed?.map((photo) => (
        <Photo key={photo.id} {...photo} />
      ))}
    </div>
  );
};

export default Home;
