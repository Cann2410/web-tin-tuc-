document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const catId = urlParams.get('cat');

  const titleEl = document.getElementById('cat-title');
  const postsContainer = document.getElementById('cat-posts');

  if (titleEl) titleEl.innerText = `Chuyên mục: ${catId || 'Tất cả'}`;

  let posts = JSON.parse(localStorage.getItem('news_posts')) || [];

  if (catId && catId !== 'moi-nhat') {
    posts = posts.filter(p => p.category && p.category.toLowerCase().replace(/\s+/g, '-') === catId.toLowerCase());
  }

  if (!postsContainer) return;

  if (posts.length === 0) {
    postsContainer.innerHTML = '<p style="padding: 20px;">Không tìm thấy bài viết nào trong chuyên mục này.</p>';
    return;
  }

  let html = '';
  posts.forEach(post => {
    html += `
      <div class="post-card">
        <img src="${post.image || 'https://via.placeholder.com/220x140'}" alt="${post.title}">
        <div class="post-card-body">
          <h3><a href="post.html?id=${post.id}">${post.title}</a></h3>
          <div class="meta">${post.publishedAt || ''} | Tác giả: ${post.author || 'Dân trí'}</div>
          <p>${post.excerpt || ''}</p>
        </div>
      </div>
    `;
  });
  postsContainer.innerHTML = html;
});
