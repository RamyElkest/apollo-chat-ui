import React from 'react';
import { Link } from 'react-router';

const Layout = ({ children, params, location }) => (
  <div>
    <nav className="navbar navbar-default">
      <div className="container">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/feed/top">GitHunt</Link>
        </div>

        <ul className="nav navbar-nav">
        </ul>

      </div>
    </nav>
    <div className="container">
      {children}
    </div>
  </div>
);

Layout.propTypes = {
  location: React.PropTypes.shape({
    pathname: React.PropTypes.string.isRequired,
  }).isRequired,
  params: React.PropTypes.shape({
    type: React.PropTypes.string,
  }).isRequired,
  children: React.PropTypes.element,
};

export default Layout;
