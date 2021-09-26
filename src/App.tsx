import { ApolloProvider, useReactiveVar } from '@apollo/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components/macro';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Home from './screens/Home/Home';
import Login from './screens/Login/Login';
import NotFound from './screens/NotFound';
import { client, darkModeVar, isLoggedInVar } from './apollo';
import { darkTheme, lightTheme, GlobalStyles } from './styles';
import SignUp from './screens/SignUp/SignUp';
import routes from './routes';
import Layout from './components/Layout';
import Profile from './screens/Profile/Profile';

const App: React.FC = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <Router>
            <Switch>
              <Route path={routes.home} exact>
                {isLoggedIn ? (
                  <Layout>
                    <Home />
                  </Layout>
                ) : (
                  <Login />
                )}
              </Route>
              {!isLoggedIn ? (
                //  로그인 하지 않았을 때만 접속 가능
                <Route path={routes.signUp}>
                  <SignUp />
                </Route>
              ) : null}
              <Route path={`/users/:username`}>
                <Layout>
                  <Profile />
                </Layout>
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
};

export default App;
