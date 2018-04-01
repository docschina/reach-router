// WORKS!
import React from "react";
import { render } from "react-dom";
import { browserHistory, Router, Route, Link } from "@reactions/router/compat";

class User extends React.Component {
  render() {
    let { userID } = this.props.params;
    let { query } = this.props.location;
    let age = query && query.showAge ? "33" : "";

    return (
      <div className="User">
        <h1>User id: {userID}</h1>
        {age}
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/no/where" activeClassName="active">
              Not Found Page
            </Link>
          </li>
          <li>
            <Link to="/user/bob" activeClassName="active">
              Bob
            </Link>
          </li>
          <li>
            <Link
              to={{ pathname: "/user/bob", query: { showAge: true } }}
              activeClassName="active"
            >
              Bob With Query Params
            </Link>
          </li>
          <li>
            <Link to="/user/sally" activeClassName="active">
              Sally
            </Link>
          </li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}

class PageNotFound extends React.Component {
  render() {
    return (
      <div>
        <h1>Page Not Found.</h1>
        <p>
          Go to <Link to="/">Home Page</Link>
        </p>
      </div>
    );
  }
}

const Index = () => <div>Hey!</div>;

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/" component={Index} />
      <Route path="user/:userID" component={User} />
      <Route path="*" component={PageNotFound} />
    </Route>
  </Router>,
  document.getElementById("root")
);
