import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import useUser from "../../hooks/useUser";
import Comment from "./Comment";

const CommentsContainer = styled.div`
  margin-top: 20px;
`;

const CommentCount = styled.span`
  opacity: 0.7;
  font-size: 12px;
  margin: 10px 0px;
  display: block;
  font-weight: 600;
`;

const PostCommentContainer = styled.div`
  margin-top: 10px;
  padding-top: 15px;
  padding-bottom: 10px;
  border-top: 1px solid ${(props) => props.theme.borderColor};
`;

const PostCommentInput = styled.input`
  width: 100%;
  &::placeholder {
    font-size: 12px;
  }
`;

interface CommentsProps {
  photoId: number;
  caption: string;
  user: {
    username: string;
    avatar: string;
  };
  commentNumber: number;
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
}

interface WriteComment {
  payload: string;
  //[key: string]: any;
}

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($id: Int!, $payload: String!) {
    createComment(id: $id, payload: $payload) {
      ok
      error
      id
    }
  }
`;

const Comments = ({
  photoId,
  comments,
  commentNumber,
  user,
  caption,
}: CommentsProps) => {
  const { data: userData } = useUser();

  const createCommentMutationUpdate = (cache: any, result: any) => {
    const payload = getValues("payload");
    setValue("payload", payload);
    const {
      data: {
        createComment: { ok, id },
      },
    } = result;
    if (ok && userData?.me) {
      const newComment = {
        __typename: "Comment",
        createdAt: Date.now(),
        id,
        isMine: true,
        payload,
        user: {
          ...userData.me,
        },
      };
      const newCacheComment = cache.writeFragment({
        data: newComment,
        fragment: gql`
          fragment BSName on Comment {
            id
            createdAt
            isMine
            payload
            user {
              username
              avatar
            }
          }
        `,
      });

      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          comments(prev: any) {
            return [...prev, newCacheComment];
          },
          commentNumber(prev: any) {
            return prev + 1;
          },
        },
      });
    }
  };
  const [createCommentMutation, { loading }] = useMutation(
    CREATE_COMMENT_MUTATION,
    {
      update: createCommentMutationUpdate,
    }
  );

  const { register, handleSubmit, reset, getValues, setValue } =
    useForm<WriteComment>();
  const onValid = (data: WriteComment) => {
    const { payload } = data;
    if (loading) return;
    createCommentMutation({
      variables: {
        id: photoId,
        payload,
      },
    });
  };
  return (
    <CommentsContainer>
      <Comment user={user} payload={caption} />
      <CommentCount>
        {commentNumber === 1 ? "1 comment" : `${commentNumber}`}
      </CommentCount>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          {...comment}
          user={user}
          payload={comment.payload}
          id={comment.id}
          isMine={comment.isMine}
          photoId={photoId}
        />
      ))}
      <PostCommentContainer>
        <form onSubmit={handleSubmit(onValid)}>
          <PostCommentInput
            {...register("payload", { required: true })}
            type="text"
            placeholder="Write a comment..."
          />
        </form>
      </PostCommentContainer>
    </CommentsContainer>
  );
};

export default Comments;
