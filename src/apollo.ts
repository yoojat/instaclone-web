import { ApolloClient, createHttpLink, InMemoryCache, makeVar } from '@apollo/client';
import { History } from 'history';
import routes from './routes';
import { setContext } from '@apollo/client/link/context';

const TOKEN = 'token';
const DARK_MODE = 'DARK_MODE';

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const logUserIn = (token: string): void => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const logUserOut = (history?: History<unknown>): void => {
  localStorage.removeItem(TOKEN);
  history?.replace(routes.home, null);
  window.location.reload();
};

export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));

export const enableDarkMode = (): void => {
  localStorage.setItem(DARK_MODE, 'enabled');
  darkModeVar(true);
};

export const disableDarkMode = (): void => {
  localStorage.removeItem(DARK_MODE);
  darkModeVar(false);
};

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: localStorage.getItem(TOKEN),
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        keyFields: (obj) => `User:${obj.username}`,
      },
    },
  }),
});
