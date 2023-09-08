import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TextEditor from './TextEditor'; // Import your TextEditor component
import QuillEditorPage from './QuillEditorPage'; // Import your QuillEditorPage component

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={TextEditor} />
        {/* Define a route for the Quill editor page */}
        <Route path="/quill-editor" component={QuillEditorPage} />
      </Switch>
    </Router>
  );
}

export default App;
