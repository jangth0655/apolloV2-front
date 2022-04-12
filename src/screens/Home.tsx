import { gql, useQuery } from "@apollo/client";
import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTitle";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      ...PhotoFragment
      user {
        username
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
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
    comments: {
      createdAt: string;
      isMine: boolean;
      payload: string;
      id: number;
      user: {
        username: string;
        avatar: string;
      };
    }[];
    commentNumber: number;
    createdAt: string;
    isMine: string;
    isLiked: boolean;
  }[];
}

const Home = () => {
  const { data } = useQuery<SeeFeedResponse>(FEED_QUERY);
  console.log(data);

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
