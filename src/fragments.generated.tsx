import * as Types from './types/graphql';

import { gql } from '@apollo/client';
export type PhotoFragmentFragment = {
  __typename?: 'Photo';
  id: number;
  file: string;
  likes: number;
  commentNumber: number;
  isLiked: boolean;
};

export type CommentFragmentFragment = {
  __typename?: 'Comment';
  id: number;
  payload: string;
  isMine: boolean;
  createdAt?: Types.Maybe<string>;
  user: { __typename?: 'User'; username: string; avatar?: Types.Maybe<string> };
};

export const PhotoFragmentFragmentDoc = gql`
  fragment PhotoFragment on Photo {
    id
    file
    likes
    commentNumber
    isLiked
  }
`;
export const CommentFragmentFragmentDoc = gql`
  fragment CommentFragment on Comment {
    id
    user {
      username
      avatar
    }
    payload
    isMine
    createdAt
  }
`;
