import styled from "styled-components";
import { FatText } from "../shared";
import { Link } from "react-router-dom";
import React from "react";
import { gql, useMutation } from "@apollo/client";

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
      error
    }
  }
`;

interface CommentProps {
  photoId?: number;
  isMine?: boolean;
  id?: number;
  payload: string;
  user: {
    username: string;
    avatar: string;
  };
}

const CommentCaption = styled.span`
  margin-left: 10px;
  a {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const CommentContainer = styled.div`
  margin-bottom: 7px;
`;

const Comment = ({ user, payload, id, isMine, photoId }: CommentProps) => {
  const updateDeleteComment = (cache: any, result: any) => {
    const {
      data: {
        deleteComment: { ok },
      },
    } = result;
    if (ok) {
      cache.evict({
        id: `Comment:${id}`,
      });
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          commentNumber(prev: any) {
            return prev - 1;
          },
        },
      });
    }
  };

  const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: {
      id,
    },
    update: updateDeleteComment,
  });
  const onDeleteClick = () => {
    deleteCommentMutation();
  };
  return (
    <CommentContainer>
      <FatText>{user?.username}</FatText>
      <CommentCaption>
        {payload.split(" ").map((word, i) =>
          /#[\w]+/.test(word) ? (
            <React.Fragment key={i}>
              <Link to={`/hashtags/${word}`}>{word}</Link>{" "}
            </React.Fragment>
          ) : (
            <React.Fragment key={i}>{word}</React.Fragment>
          )
        )}
      </CommentCaption>
      {isMine ? <button onClick={onDeleteClick}>❌</button> : null}
    </CommentContainer>
  );
};

export default Comment;
