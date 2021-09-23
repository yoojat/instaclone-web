import { ApolloCache, FetchResult, gql } from '@apollo/client';
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components/macro';
import useUser from '../../hooks/useUser';
import Comment from './Comment';
import { CommentProps } from './interfaces';
import { CreateCommentMutation, useCreateCommentMutation } from './queries.generated';

const CommentsContainer = styled.div`
  margin-top: 20px;
`;
const CommentCount = styled.span`
  opacity: 0.7;
  margin: 10px 0px;
  display: block;
  font-weight: 600;
  font-size: 10px;
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

// interface CommentsProps {
//   id: number;
//   user: {
//     avatar?: string;
//     username: string;
//   };
//   payload: string;
//   isMine: boolean;
//   createdAt: string;
// }

interface Props {
  photoId: number;
  author: string;
  caption?: string;
  commentNumber: number;
  comments?: Array<CommentProps | null> | null;
}

const Comments: React.FC<Props> = ({ photoId, author, caption, commentNumber, comments }) => {
  const { data: userData } = useUser();
  const { register, handleSubmit, setValue, getValues } = useForm();
  const createCommentUpdate = (
    cache: ApolloCache<CreateCommentMutation>,
    result: Omit<FetchResult<CreateCommentMutation>, 'context'>,
  ) => {
    const { payload } = getValues();
    setValue('payload', '');

    if (result.data?.createComment) {
      const {
        data: {
          createComment: { ok, id },
        },
      } = result;

      if (ok && userData?.me) {
        const newComment = {
          __typename: 'Comment',
          id,
          createdAt: Date.now() + '',
          isMine: true,
          payload,
          user: {
            ...userData.me,
          },
        };

        // cache에 대한 reference를 받을수 있음
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
            comments(prev) {
              return [...prev, newCacheComment];
            },
            commentNumber(prev) {
              return prev + 1;
            },
          },
        });
      }
    }
  };
  const [createCommentMutation, { loading }] = useCreateCommentMutation({ update: createCommentUpdate });
  const onValid = (data: { payload: string }) => {
    if (data) {
      const { payload } = data;
      if (loading) {
        return;
      }
      createCommentMutation({
        variables: {
          photoId,
          payload,
        },
      });
    }
  };
  return (
    <CommentsContainer>
      <Comment author={author} payload={caption || ''} />
      <CommentCount>{commentNumber === 1 ? '1 comment' : `${commentNumber} comments`}</CommentCount>
      {comments?.map(
        (comment) =>
          comment && (
            <Comment
              key={comment.id}
              id={comment.id}
              photoId={photoId}
              author={comment.user.username}
              payload={comment.payload}
              isMine={comment.isMine}
            />
          ),
      )}
      <PostCommentContainer>
        <form onSubmit={handleSubmit(onValid)}>
          <PostCommentInput
            name="payload"
            ref={register({ required: true })}
            type="text"
            placeholder="Write a comment.."
          />
        </form>
      </PostCommentContainer>
    </CommentsContainer>
  );
};

export default Comments;
