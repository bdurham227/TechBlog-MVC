const newFormHandler = async (event) => {
    event.PreventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();

    if (title && content) {
        const response = await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify({ title, content}),
            headers: { 'Content-Type' : 'application/json'},
        });

        if (response.ok) {
            document.location.replace('/login');
        } else {
            alert('Failed to create a new post');
        }
    }
};

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);