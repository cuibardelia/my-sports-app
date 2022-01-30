import * as React from 'react';
import { Link } from 'react-router-dom';

import Button from '../Component/Button.css';
import PageContainer from '../Component/PageContainer.css';

const About: React.FC = () => {
  return (
    <PageContainer>
      <main>
        <h2>Who are we?</h2>
        <p>
          No idea yet
        </p>
      </main>
      <nav>
        <Link to="/">Home</Link>
        <br />
        <Button>Here</Button>

      </nav>
    </PageContainer>
  );
}
export default About;
