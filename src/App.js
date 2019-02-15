import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

import Summary from './components/Summary';
import Productions from './components/Productions';
import Expenses from './components/Expenses';

class App extends Component {
  render() {
    return (
      <div>
        <div className="page-header text-center">
          <h1>EGGspenses</h1>
        </div>

        <Router>
          <div>
            <div className="container">
              <ul className="nav nav-pills">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/productions">Productions</Link></li>
                <li><Link to="/expenses">Expenses</Link></li>
              </ul>
            </div>

            <main>
              <Route exact path="/" component={ Summary } />
              <Route path="/productions" component={ Productions } />
              <Route path="/expenses" component={ Expenses } />
            </main>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
