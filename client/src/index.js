import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from "react-router-dom";

const Index = () => {
  return (
    <div>
      <Router>
        <App />
      </Router>
    </div>);

}

ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();