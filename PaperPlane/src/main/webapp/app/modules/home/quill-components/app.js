//import React from 'react';
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import TextEditor from './TextEditor'; // Import your TextEditor component
//import QuillEditorPage from './QuillEditorPage'; // Import your QuillEditorPage component
//
//function App() {
//  return (
//    <Router>
//      <Switch>
//        <Route exact path="/" component={TextEditor} />
//        {/* Define a route for the Quill editor page */}
//        <Route path="/quill-editor" component={QuillEditorPage} />
//      </Switch>
//    </Router>
//  );
//}
//
//export default App;



import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TextEditor from './TextEditor';
import QuillEditorPage from './QuillEditorPage';

function App() {
  const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated);

  return (
    <Router>
      <Switch>
        {/* Public routes */}
        <Route exact path="/" component={TextEditor} />

        {/* Protected route for TextEditor */}
        <Route
          path="/text-editor"
          render={() => (isAuthenticated ? <TextEditor /> : <Redirect to="/login" />)}
        />

        {/* Define a route for the Quill editor page */}
        <Route path="/quill-editor" component={QuillEditorPage} />

        {/* Add more routes here if needed */}
      </Switch>
    </Router>
  );
}

export default App;
