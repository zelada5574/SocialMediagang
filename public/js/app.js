const $username = document.getElementById('username');
const $email = document.getElementById('email');
const $password = document.getElementById('password');
const $submitBtn = document.getElementById('submitBtn');
const $loginsubmitBtn = document.getElementById('loginsubmitBtn');
const $postsListEl = document.getElementById('fullList');
const $comment = document.getElementById('comment');
const $commentSubmitBtn = document.getElementById('commentSubmitBtn');

const $todosubmitBtn = document.getElementById('todosubmitBtn');
const $logoutBtn = document.getElementById('logoutBtn');
const $todoInput = document.getElementById('chirp');
const $imageInput = document.getElementById('image');
const $deleteBtn = document.getElementById('deleteBtn');


let filePath = '';

if ($deleteBtn) {
$deleteBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  const id = $deleteBtn.getAttribute('class');
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
});
}

if($todosubmitBtn) {
$todosubmitBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  if ($imageInput.files[0]){
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
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({content, blogId}),
      });
      const data = await response.json();
      if (data.message) {
        return alert(data.message);
      }
      alert('Comment added');
      console.log(data);
      // location.reload();
    }
    catch (error) {
      console.log(error);
      alert(error);
    }
  });
}


if ($postsListEl) {
  $postsListEl.addEventListener('click', async (event) => {
    console.log(event.target.offsetParent.id);
    const blogId = event.target.offsetParent.id;
    location.href = `/blogs/${blogId}`;
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
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username, password}),
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
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username, password, email}),
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