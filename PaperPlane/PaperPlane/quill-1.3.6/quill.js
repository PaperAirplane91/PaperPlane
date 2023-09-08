document.addEventListener('DOMContentLoaded', function () {
  // Function to handle changes in the Quill editor's content
  function handleContentChange(mutationsList, observer) {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        // Get the HTML content from the Quill editor
        var content = quill.root.innerHTML;

        console.log('Content to be saved:', content); // Debugging
      }
    }
  }

  // Initialize Quill editor with your custom toolbar options
  var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
  ];

  var quill = new Quill('#editor', {
    modules: {
      toolbar: toolbarOptions
    },
    theme: 'snow'
  });

  // Create a MutationObserver to watch for changes in the editor's content
  const observer = new MutationObserver(handleContentChange);

  // Configure the observer to watch for changes in the Quill editor
  observer.observe(quill.root, { childList: true, subtree: true });

  // Add an event listener to the "Save" button
  document.getElementById('save-button').addEventListener('click', function () {
    // Get the HTML content from the Quill editor
    var content = quill.root.innerHTML;

    console.log('Content to be saved:', content); // Debugging

    // Send the content to your Node.js server
    fetch('/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: content }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Server response:', data); // Debugging

        // Handle the response from the server
        if (data.success) {
          alert('Content saved successfully!');
        } else {
          alert('Error saving content: ' + data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while saving the content.');
      });
  });
});
