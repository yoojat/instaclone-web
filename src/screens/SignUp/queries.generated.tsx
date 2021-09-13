import * as Types from '../../types/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {};
export type CreateAccountMutationVariables = Types.Exact<{
  firstName: Types.Scalars['String'];
  lastName?: Types.Maybe<Types.Scalars['String']>;
  username: Types.Scalars['String'];
  email: Types.Scalars['String'];
  password: Types.Scalars['String'];
}>;

export type CreateAccountMutation = {
  __typename?: 'Mutation';
  createAccount: { __typename?: 'MutationResponse'; ok: boolean; error?: Types.Maybe<string> };
};

export const CreateAccountDocument = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(firstName: $firstName, lastName: $lastName, username: $username, email: $email, password: $password) {
      ok
      error
    }
  }
`;
export type CreateAccountMutationFn = Apollo.MutationFunction<CreateAccountMutation, CreateAccountMutationVariables>;

/**
 * __useCreateAccountMutation__
 *
 * To run a mutation, you first call `useCreateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAccountMutation, { data, loading, error }] = useCreateAccountMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useCreateAccountMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateAccountMutation, CreateAccountMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateAccountMutation, CreateAccountMutationVariables>(CreateAccountDocument, options);
}
export type CreateAccountMutationHookResult = ReturnType<typeof useCreateAccountMutation>;
export type CreateAccountMutationResult = Apollo.MutationResult<CreateAccountMutation>;
export type CreateAccountMutationOptions = Apollo.BaseMutationOptions<
  CreateAccountMutation,
  CreateAccountMutationVariables
>;
