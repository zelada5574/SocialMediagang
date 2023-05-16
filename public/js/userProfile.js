const $todosubmitBtn = document.getElementById('todosubmitBtn');
const $logoutBtn = document.getElementById('logoutBtn');
const $todoInput = document.getElementById('todo');
const $imageInput = document.getElementById('image');
let filePath = '';



$todosubmitBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  if ($imageInput.files[0]){
    console.log($imageInput.files[0].name);
    console.log($imageInput.files[0]);
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
    return alert('Please enter a todo');
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
    // location.reload();

  } catch (error) {
    console.log(error);
  }


});

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