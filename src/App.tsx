import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './Page/Home';
import About from './Page/About';

const App: React.FC = () => (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* <Route component = {NotFound}/> */}
        </Routes>
      </div>
    </Router>
  );
export default App;
