import * as Types from '../../types/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {};
export type SeeFeedQueryVariables = Types.Exact<{ [key: string]: never }>;

export type SeeFeedQuery = {
  __typename?: 'Query';
  seeFeed?: Types.Maybe<
    Array<
      Types.Maybe<{
        __typename?: 'Photo';
        id: number;
        file: string;
        caption?: Types.Maybe<string>;
        likes: number;
        commentNumber: number;
        createdAt: string;
        isMine: boolean;
        isLiked: boolean;
        user: { __typename?: 'User'; username: string; avatar?: Types.Maybe<string> };
        comments: Array<
          Types.Maybe<{
            __typename?: 'Comment';
            id: number;
            payload: string;
            isMine: boolean;
            createdAt?: Types.Maybe<string>;
            user: { __typename?: 'User'; username: string; avatar?: Types.Maybe<string> };
          }>
        >;
      }>
    >
  >;
};

export const SeeFeedDocument = gql`
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
      comments {
        id
        user {
          username
          avatar
        }
        payload
        isMine
        createdAt
      }
      commentNumber
      createdAt
      isMine
      isLiked
    }
  }
`;

/**
 * __useSeeFeedQuery__
 *
 * To run a query within a React component, call `useSeeFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeFeedQuery({
 *   variables: {
 *   },
 * });
 */
export function useSeeFeedQuery(baseOptions?: Apollo.QueryHookOptions<SeeFeedQuery, SeeFeedQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SeeFeedQuery, SeeFeedQueryVariables>(SeeFeedDocument, options);
}
export function useSeeFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeeFeedQuery, SeeFeedQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SeeFeedQuery, SeeFeedQueryVariables>(SeeFeedDocument, options);
}
export type SeeFeedQueryHookResult = ReturnType<typeof useSeeFeedQuery>;
export type SeeFeedLazyQueryHookResult = ReturnType<typeof useSeeFeedLazyQuery>;
export type SeeFeedQueryResult = Apollo.QueryResult<SeeFeedQuery, SeeFeedQueryVariables>;
