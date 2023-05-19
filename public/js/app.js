const $username = document.getElementById('username');
const $email = document.getElementById('email');
const $password = document.getElementById('password');
const $submitBtn = document.getElementById('submitBtn');
const $loginsubmitBtn = document.getElementById('loginsubmitBtn');
const $postsListEl = document.getElementById('fullList');
const $profilePostsListEl = document.getElementById('fullList2');
const $comment = document.getElementById('comment');
const $commentSubmitBtn = document.getElementById('commentSubmitBtn');
const $todosubmitBtn = document.getElementById('todosubmitBtn');
const $logoutBtn = document.getElementById('logoutBtn');
const $todoInput = document.getElementById('chirp');
const $imageInput = document.getElementById('image');
const $deleteBtn = document.getElementById('deleteBtn');
const $modal = document.getElementById('modal');
let filePath = '';
let isLiked = false;

async function dislike(event) {
  try {
    console.log('dislike');
    const blogId = event.classList[0];
    let likes = event.classList[1];
    let isLiked = false;
    likes--;
    const dislikeData = await fetch(`/api/like/dislike/${blogId}`, {
      method: 'POST',
      body: JSON.stringify({ likes, isLiked }),
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await dislikeData.json();
    console.log(data);
    location.reload();
  } catch (error) {
    console.log(error);
  }
}


async function like(event) {
  try {
    const blogId = event.classList[0];
    let likes = event.classList[1];
    const userId = event.classList[2];
    console.log(userId);
    let isLiked = true;
    const getLikes = await fetch(`/api/like/get/${blogId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await getLikes.json();
    console.log(data);
    if (data.message) {
      alert(data.message);
    }
    if (data.length > 0) {
      console.log(data[0].userLikedId);
      console.log(userId);
      if (data[0].userLikedId == userId) {
        dislike(event);
        return;
      }
    }
    likes++;
    const likePost = await fetch(`/api/like/${blogId}`, {
      method: 'PUT',
      body: JSON.stringify({ likes, isLiked }),
      headers: { 'Content-Type': 'application/json' },
    })
    const data2 = await likePost.json();
    console.log(data2);
    location.reload();
  } catch (error) {
    console.log(error);
  }
}

if ($todosubmitBtn) {
  $todosubmitBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    if ($imageInput.files[0]) {
      const file = $imageInput.files[0];
      const formData = new FormData();
      formData.append('file', file);
      try {
        const response = await fetch('/upload', {
          method: 'POST',
          body: formData,
          files: file,
        });
        console.log(response);
        const data = await response.json();
        console.log(data);
        console.log(data.name);
        filePath = data.path;
      } catch (error) {
        console.log(error);
        return alert(error);
      }
    }
    if ($todoInput.value.trim() === '') {
      return alert('Please type the chirp');
    }

    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        body: JSON.stringify({
          content: $todoInput.value,
          image: filePath,
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data2 = await response.json();
      location.reload();

    } catch (error) {
      console.log(error);
    }


  });
}

if ($logoutBtn) {
  $logoutBtn.addEventListener('click', async () => {
    try {
      const response = await fetch('/api/users/logout', {
        method: 'POST',
      });
      const data = await response.json();
      location.href = '/login';
    } catch (error) {
      alert(error);
    }
  });
}




if ($commentSubmitBtn) {
  $commentSubmitBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const content = $comment.value;
    const blogId = location.href.split('/').slice(-1)[0];
    console.log(blogId);

    if (!content) {
      return alert('Comment must be provided');
    }

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, blogId }),
      });
      const data = await response.json();
      if (data.message) {
        return alert(data.message);
      }
      location.reload();
    }
    catch (error) {
      console.log(error);
      alert(error);
    }
  });
}

if ($profilePostsListEl) {
  $profilePostsListEl.addEventListener('click', async (event) => {
    if (event.target.id === 'deleteBtn') {
      event.preventDefault();
      console.log(event);
      const id = event.target.classList[0];
      try {
        const response = await fetch(`/api/blogs/${id}`, {
          method: 'DELETE',
        });
        const data = await response.json();
        console.log(data);
        location.reload();
      }
      catch (error) {
        console.log(error);
      }
      return;
    }
    if (event.target.id && event.target.id !== 'fullList2') {
      const profileBlogId = event.target.id;
      console.log(profileBlogId);
      location.href = `/blogs/${profileBlogId}`;
    }
  });
}

if ($postsListEl) {
  $postsListEl.addEventListener('click', async (event) => {
    if (event.target.id === 'likeBtn') {
      return;
    }
    if (event.target.offsetParent.id) {
      const blogId = event.target.offsetParent.id;
      location.href = `/blogs/${blogId}`;
    }
  });
}


if ($loginsubmitBtn) {
  $loginsubmitBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const username = $username.value;
    const password = $password.value;

    if (!username || !password) {
      return alert('Username and password must be provided');
    }

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.message) {
        return alert(data.message);
      } else {
        location.href = `/users/${data.id}`;
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  });
}


if ($submitBtn) {
  $submitBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const username = $username.value;
    const email = $email.value;
    const password = $password.value;

    if (!username || !password || !email) {
      return alert('Username, email and password must be provided');
    }

    try {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email }),
      });
      const data = await response.json();
      console.log(data);
      if (data.message) {
        return alert(data.message);
      }
      if (data.errors) {
        return alert(data.errors[0].message);
      }
      if (data.id) {
        location.href = `/users/${data.id}`;
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  });
}