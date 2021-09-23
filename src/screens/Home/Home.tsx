import React from 'react';
// import { useHistory } from 'react-router';
// import { logUserOut } from '../../apollo';
import Photo from '../../components/feed/Photo';
import PageTitle from '../../components/PageTitle';
import { useSeeFeedQuery } from './queries.generated';

const Home: React.FC = () => {
  const { data } = useSeeFeedQuery();
  // const history = useHistory();
  return (
    <div>
      {/* <button onClick={() => logUserOut(history)}>Log out now!</button> */}
      <PageTitle title="Home" />
      {data?.seeFeed?.map((photo) => photo && <Photo key={photo?.id} {...photo} />)}
    </div>
  );
};

export default Home;
