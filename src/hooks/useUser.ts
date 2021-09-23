import { logUserOut } from './../apollo';
import { MeQuery, useMeQuery } from './user.generated';
import { useReactiveVar } from '@apollo/client';
import { isLoggedInVar } from '../apollo';
import { useEffect } from 'react';

const useUser = (): {
  data: MeQuery | undefined;
} => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useMeQuery({ skip: !isLoggedIn });
  useEffect(() => {
    if (data?.me === null) {
      logUserOut();
    }
  }, [data]);
  return { data };
};
export default useUser;
