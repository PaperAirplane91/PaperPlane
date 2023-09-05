import './home.scss';
import Quill from "quill/quill";
import TextEditor from './quill-components/TextEditor';
import React from 'react';
import { Link } from 'react-router-dom';

import { Row, Col, Alert } from 'reactstrap';

import { useAppSelector } from 'app/config/store';

export const Home = () => {
  const account = useAppSelector(state => state.authentication.account);

  return (
    <Row>
{/*       <Col md="3" className="pad"> */}
{/*         <span className="hipster rounded" /> */}
{/*       </Col> */}
      <Col md="9">
        <h2>PaperPlane</h2>
        <p className="lead">This is your homepage</p>
        {account?.login ? (
          <div>
            <Alert color="success">You are logged in as user &quot;{account.login}&quot;.</Alert>

          </div>
        ) : (
          <div>
            <Alert color="warning">
              If you want to
              <span>&nbsp;</span>
              <Link to="/login" className="alert-link">
                sign in
              </Link>
              , you can try the default accounts:
              <br />- Administrator (login=&quot;admin&quot; and password=&quot;admin&quot;) <br />- User (login=&quot;user&quot; and
              password=&quot;user&quot;).
            </Alert>

            <Alert color="warning">
              You don&apos;t have an account yet?&nbsp;
              <Link to="/account/register" className="alert-link">
                Register a new account
              </Link>
            </Alert>
          </div>
        )}
        <h1>Quill Text Editor Demo</h1>
        <TextEditor />



              <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
      </Col>
    </Row>

  );
};

export default Home;
