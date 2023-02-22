const newBlogHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#blog-title').value.trim();
  const body = document.querySelector('#blog-body').value.trim();

  if (title && body) {
    const response = await fetch('/api/post', {
      method: 'POST',
      body: JSON.stringify({title, body}),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector('.blog-form').addEventListener('submit', newBlogHandler);