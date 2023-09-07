document.addEventListener('DOMContentLoaded', () => {
    const quill = new Quill('#editor', {
        theme: 'snow'
    });

    document.getElementById('postForm').addEventListener('submit', (e) => {
        e.preventDefault();

        const postContent = quill.root.innerHTML;
        const post = { content: postContent };

        fetch('/api/**', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        })
            .then(response => response.json())
            .then(data => {
                alert(JSON.stringify(post));
                console.log(JSON.stringify(post));
                console.log(post);
                // Optionally, reset the form or perform other actions
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error saving post.');
            });
    });
});

