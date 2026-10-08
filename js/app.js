document.addEventListener('DOMContentLoaded', async () => {
  await renderNavbar();
  await renderHomePage();
});

// 1. Tải & Render Menu Chuyên Mục
async function renderNavbar() {
  const menuContainer = document.getElementById('categories-menu');
  if (!menuContainer) return;

  try {
    const res = await fetch('./data/categories.json');
    const categories = await res.json();

    let html = '';
    categories.forEach(cat => {
      html += `<li class="nav-item">`;
      html += `<a href="${cat.url}">${cat.title}</a>`;

      if (cat.children && cat.children.length > 0) {
        html += `<ul class="dropdown">`;
        cat.children.forEach(child => {
          html += `<li><a href="${child.url}">${child.title}</a></li>`;
        });
        html += `</ul>`;
      }
      html += `</li>`;
    });

    menuContainer.innerHTML = html;
  } catch (err) {
    console.error("Lỗi nạp categories.json:", err);
  }
}

// 2. Tải bài viết từ LocalStorage hoặc file posts.json
async function getPostsData() {
  let posts = [];
  const localData = localStorage.getItem('news_posts');

  if (localData) {
    posts = JSON.parse(localData);
  } else {
    try {
      const res = await fetch('./data/posts.json');
      const data = await res.json();
      posts = Array.isArray(data) ? data : (data.posts || []);
      localStorage.setItem('news_posts', JSON.stringify(posts));
    } catch (err) {
      console.error("Lỗi nạp posts.json:", err);
    }
  }
  return posts;
}

// 3. Render giao diện Trang chủ
async function renderHomePage() {
  const posts = await getPostsData();
  const topSection = document.getElementById('top-section');
  const remainingSection = document.getElementById('remaining-posts');

  if (!posts || posts.length === 0) {
    if (topSection) topSection.innerHTML = '<p>Chưa có bài viết nào.</p>';
    return;
  }

  // Sắp xếp bài mới nhất lên đầu[cite: 1]
  posts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  // Render Top Section (3 bài đầu)[cite: 1]
  const top3 = posts.slice(0, 3);
  if (topSection && top3.length > 0) {
    let topHtml = '';
    
    // Bài nổi bật bên trái
    const feat = top3[0];
    topHtml += `
      <div class="featured-post">
        <img src="${feat.image || 'https://via.placeholder.com/600x350'}" alt="${feat.title}">
        <h2><a href="post.html?id=${feat.id}">${feat.title}</a></h2>
        <p>${feat.excerpt || ''}</p>
      </div>
    `;

    // 2 bài nhỏ bên phải
    topHtml += `<div class="small-posts">`;
    for (let i = 1; i < top3.length; i++) {
      topHtml += `
        <div class="small-post-item">
          <img src="${top3[i].image || 'https://via.placeholder.com/120x85'}" alt="${top3[i].title}">
          <h4><a href="post.html?id=${top3[i].id}">${top3[i].title}</a></h4>
        </div>
      `;
    }
    topHtml += `</div>`;
    topSection.innerHTML = topHtml;
  }

  // Render các bài viết còn lại dạng danh sách dọc[cite: 1]
  const remaining = posts.slice(3);
  if (remainingSection) {
    let listHtml = '';
    remaining.forEach(post => {
      listHtml += `
        <div class="post-card">
          <img src="${post.image || 'https://via.placeholder.com/220x140'}" alt="${post.title}">
          <div class="post-card-body">
            <h3><a href="post.html?id=${post.id}">${post.title}</a></h3>
            <div class="meta">${post.publishedAt || ''} | Tác giả: ${post.author || 'Dân trí'} | Nguồn: ${post.source || 'dantri.com.vn'}</div>
            <p>${post.excerpt || ''}</p>
          </div>
        </div>
      `;
    });
    remainingSection.innerHTML = listHtml;
  }
}
