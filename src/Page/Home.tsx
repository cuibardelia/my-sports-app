import * as React from 'react';
import { Link } from 'react-router-dom';
import PageContainer from '../Component/PageContainer.css';

const Home: React.FC = () => {
  return (
    <PageContainer>
      <main>
        <h2>Welcome to the homepage!</h2>
        <p>Lots of things to implement here...</p>
      </main>
      <nav>
        <Link to="/about">About</Link>
      </nav>
    </PageContainer>
  );
};

export default Home;
