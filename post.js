document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');
  const container = document.getElementById('post-detail');

  const posts = JSON.parse(localStorage.getItem('news_posts')) || [];
  const post = posts.find(p => p.id === postId);

  if (!container) return;

  if (!post) {
    container.innerHTML = '<h2>Bài viết không tồn tại!</h2><p><a href="index.html">Về trang chủ</a></p>';
    return;
  }

  container.innerHTML = `
    <a href="index.html" style="color:#b70000; text-decoration:none; font-weight:bold;">&larr; Trang chủ</a>
    <h1 style="font-size:28px; margin:20px 0; color:#111;">${post.title}</h1>
    <div style="color:#666; font-size:14px; margin-bottom:20px;">
      <span>Ngày đăng: ${post.publishedAt}</span> | 
      <span>Tác giả: ${post.author}</span> | 
      <span>Chuyên mục: ${post.category}</span>
    </div>
    <p style="font-weight:bold; font-size:16px; margin-bottom:20px; color:#444;">${post.excerpt}</p>
    ${post.image ? `<img src="${post.image}" style="max-width:100%; border-radius:6px; margin-bottom:20px;">` : ''}
    <div style="font-size:16px; line-height:1.8; color:#222;">${post.content}</div>
  `;
});
