import React from 'react';
import { faFacebookSquare, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components/macro';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import FormBox from '../../components/auth/FormBox';
import Input from '../../components/auth/Input';
import Button from '../../components/auth/Button';
import Separator from '../../components/auth/Separator';
import BottomBox from '../../components/auth/BottomBox';
import routes from '../../routes';
import PageTitle from '../../components/PageTitle';
import FormError from '../../components/auth/FormError';
import { logUserIn } from '../../apollo';
import { LoginMutation, useLoginMutation } from './queries.generated';

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const Notification = styled.div`
  color: #2ecc71;
`;

type FormValues = {
  username: string;
  password: string;
  result: string;
};

interface LocationState {
  message: string;
  username: string;
  password: string;
  string: string;
}

const Login: React.FC = () => {
  const location = useLocation<LocationState>();
  const { register, handleSubmit, errors, formState, getValues, setError, clearErrors } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      username: location?.state?.username || '',
      password: location?.state?.password || '',
    },
  });

  const onCompleted = (data: LoginMutation) => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok && error) {
      setError('result', {
        message: error,
      });
      return;
    }

    if (token) {
      logUserIn(token);
    }
  };

  const [login, { loading }] = useLoginMutation({ onCompleted });

  // const [login, { loading }] = useMutation<LoginMutation, LoginMutationVariables>(LOGIN_MUTATION, {
  //   onCompleted,
  // });

  const clearLoginError = () => {
    clearErrors('result');
  };
  const onSubmitValid = () => {
    if (loading) {
      return;
    }
    const { username, password } = getValues();
    login({ variables: { username, password } });
  };

  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <Notification>{location?.state?.message}</Notification>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            ref={register({
              required: 'Username is required',
              minLength: {
                value: 4,
                message: 'Username should be longer than 4chars.',
              },
            })}
            onChange={clearLoginError}
            name="username"
            type="text"
            placeholder="Username"
            hasError={Boolean(errors?.username?.message)}
          />
          <FormError message={errors?.username?.message} />
          <Input
            ref={register({
              required: 'Password is Required',
            })}
            onChange={clearLoginError}
            name="password"
            type="password"
            placeholder="Password"
            hasError={Boolean(errors?.password?.message)}
          />
          <FormError message={errors?.password?.message} />
          <Button type="submit" value={loading ? 'Loading...' : 'Log in'} disabled={!formState.isValid || loading} />
          <FormError message={errors?.result?.message} />
        </form>
        <Separator />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </FacebookLogin>
      </FormBox>
      <BottomBox cta="Don't hav an account?" linkText="Sign up" link={routes.signUp} />
    </AuthLayout>
  );
};

export default Login;
