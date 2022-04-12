import {
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import Avatar from "../Avatar";
import { FatText } from "../shared";
import {
  faBookBookmark,
  faHeart as SolidHeart,
} from "@fortawesome/free-solid-svg-icons";
import { gql, useMutation } from "@apollo/client";
import Comments from "./Comments";

const PhotoContainer = styled.div`
  background-color: white;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 20px;
`;

const PhotoHeader = styled.div`
  padding: 15px;
  display: flex;
  max-width: 615;
  align-items: center;
`;

const Username = styled(FatText)`
  margin-left: 15px;
`;

const PhotoFile = styled.img`
  min-width: 100%;
`;

const PhotoData = styled.div`
  padding: 15px;
`;

const PhotoActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
  }
  svg {
    font-size: 20px;
  }
`;

const PhotoAction = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;

const Likes = styled(FatText)`
  margin-top: 10px;
  display: block;
`;

interface PhotoProps {
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
  createdAt: string;
  isMine: string;
  isLiked: boolean;
  commentNumber: number;
}

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

function Photo({
  id,
  user,
  file,
  isLiked,
  likes,
  comments,
  ...rest
}: PhotoProps) {
  const updateToggleLike = (cache: any, result: any) => {
    const {
      data: {
        toggleLike: { ok },
      },
    } = result;
    if (ok) {
      const photoId = `Photo:${id}`;
      cache.modify({
        id: photoId,
        fields: {
          isLiked(prev: any) {
            return !prev;
          },
          likes(prev: any) {
            if (isLiked) {
              return prev - 1;
            }
            return prev + 1;
          },
        },
      });
    }
  };
  const [toggleLikeMutation, { loading }] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: {
      id,
    },
    update: updateToggleLike,
  });
  return (
    <PhotoContainer key={id}>
      <PhotoHeader>
        <Avatar lg={true} url={user.avatar} />
        <Username>{user.username}</Username>
      </PhotoHeader>
      <PhotoFile src={file} />
      <PhotoData>
        <PhotoActions>
          <div>
            <PhotoAction onClick={() => toggleLikeMutation()}>
              <FontAwesomeIcon
                style={{ color: isLiked ? " tomato" : "inherit" }}
                size="1x"
                icon={isLiked ? SolidHeart : faHeart}
              />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon size="2x" icon={faComment} />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon size="2x" icon={faPaperPlane} />
            </PhotoAction>
          </div>
          <div>
            <FontAwesomeIcon size="2x" icon={faBookBookmark} />
          </div>
        </PhotoActions>
        <Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
      </PhotoData>
      <Comments
        photoId={id}
        comments={comments}
        commentNumber={rest.commentNumber}
        user={user}
        caption={rest.caption}
      />
    </PhotoContainer>
  );
}

export default Photo;
