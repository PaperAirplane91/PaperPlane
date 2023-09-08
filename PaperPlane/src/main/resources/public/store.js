// Initialize Quill.js editor
const editor = new Quill('#editor-container', {
  theme: 'snow'
});

// Handle the button click event
document.getElementById('createDocument').addEventListener('click', () => {
  const title = document.getElementById('title').value;
  const content = editor.root.innerHTML;
  const archived = true;

  // Send a POST request to document post endpoint
  fetch('/api/documents', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title,
      content,
      archived
    })
  })
    .then(response => {
      if (response.ok) {
        // Handle success, e.g., show a success message
        console.log('Document created successfully');
      } else {
        // Handle errors, e.g., show an error message
        console.error('Error creating document');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

