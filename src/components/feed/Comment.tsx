import React from 'react';
import styled from 'styled-components/macro';
import { FatText } from '../shared';
import { Link } from 'react-router-dom';
import { ApolloCache, FetchResult } from '@apollo/client';
import { DeleteCommentMutation, useDeleteCommentMutation } from './queries.generated';

const CommentContainer = styled.div`
  margin-bottom: 7px;
`;
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
export interface Props {
  id?: number;
  photoId?: number;
  isMine?: boolean;
  author: string;
  payload: string;
}

const Comment: React.FC<Props> = ({ id, photoId, isMine, author, payload }) => {
  // const cleanedPayload = sanitizeHtml(payload.replace(/#[\w]+/g, '<mark>$&</mark>'), {
  //   allowedTags: ['mark'],
  // });
  const updateDeleteComment = (
    cache: ApolloCache<DeleteCommentMutation>,
    result: Omit<FetchResult<DeleteCommentMutation>, 'context'>,
  ) => {
    if (result.data?.deleteComment) {
      const {
        data: {
          deleteComment: { ok },
        },
      } = result;
      if (ok) {
        cache.evict({ id: `Comment:${id}` });
        cache.modify({
          id: `Photo:${photoId}`,
          fields: {
            commentNumber(prev) {
              return prev - 1;
            },
          },
        });
      }
    }
  };

  const [deleteCommentMutation] = useDeleteCommentMutation({ update: updateDeleteComment });
  const onDeleteClick = () => {
    if (id) {
      deleteCommentMutation({ variables: { id } });
    }
  };
  return (
    <CommentContainer>
      <CommentCaption>
        <Link to={`/users/${author}`}>
          <FatText>{author}</FatText>
        </Link>
        {payload.split(' ').map((word, index) =>
          /#[\w]+/.test(word) ? (
            <React.Fragment key={index}>
              <Link to={`/hashtags/${word}`}>{word}</Link>{' '}
            </React.Fragment>
          ) : (
            <React.Fragment key={index}>{word} </React.Fragment>
          ),
        )}
      </CommentCaption>
      {isMine ? <button onClick={onDeleteClick}>❌</button> : null}
      {/* <CommentCaption dangerouslySetInnerHTML={{ __html: cleanedPayload }} /> */}
    </CommentContainer>
  );
};

export default Comment;
