import React, { useState } from 'react';
import TextEditor from 'app/modules/home/quill-components/TextEditor';

function TextEditorWithSelectedDocumentName() {
  const [selectedDocumentName, setSelectedDocumentName] = useState('');

  return <TextEditor setSelectedDocumentName={setSelectedDocumentName} />;
}

export default TextEditorWithSelectedDocumentName;
