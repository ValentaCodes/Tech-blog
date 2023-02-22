const commentHandler = async (event) => {
  event.preventDefault();

  const comment = document.querySelector('#comment').value.trim(); //targets the comment input
  const id =
    window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ]; //this allows us to grab the specific post id the website is currently displaying

  if (comment) {
    const response = await fetch(`/api/post/${id}/comment`, {
        method: 'POST',
        body: JSON.stringify({body: comment}),
        headers: {'Content-Type': 'application/json'}
    });
    
    if (response.ok) {
        document.location.replace(`/post/${id}`)
    } else {
        alert(response.statusText)
    }
  }
};

document.querySelector('.comment-form').addEventListener('submit', commentHandler)