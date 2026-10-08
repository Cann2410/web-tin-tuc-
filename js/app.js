// DỮ LIỆU DỰ PHÒNG CHỐNG LỖI CẶP TRANG
const DEFAULT_CATEGORIES = [
  { "id": "home", "title": "Trang chủ", "url": "index.html", "type": "home" },
  { "id": "dt360", "title": "Dân trí 360", "url": "https://dantri.com.vn/dt360.htm", "type": "external" },
  { "id": "moi-nhat", "title": "Mới nhất", "url": "category.html?cat=moi-nhat", "type": "category" },
  {
    "id": "the-gioi",
    "title": "Thế giới",
    "url": "category.html?cat=the-gioi",
    "type": "category",
    "children": [
      { "id": "quan-su", "title": "Quân sự", "url": "category.html?cat=quan-su" },
      { "id": "phan-tich", "title": "Phân tích - Bình luận", "url": "category.html?cat=phan-tich" },
      { "id": "the-gioi-do-day", "title": "Thế giới đó đây", "url": "category.html?cat=the-gioi-do-day" },
      { "id": "kieu-bao", "title": "Kiều bào", "url": "category.html?cat=kieu-bao" }
    ]
  },
  {
    "id": "thoi-su",
    "title": "Thời sự",
    "url": "category.html?cat=thoi-su",
    "type": "category",
    "children": [
      { "id": "chinh-tri", "title": "Chính trị", "url": "category.html?cat=chinh-tri" },
      { "id": "giao-thong", "title": "Giao thông", "url": "category.html?cat=giao-thong" },
      { "id": "moi-truong", "title": "Môi trường", "url": "category.html?cat=moi-truong" },
      { "id": "nong-tren-mang", "title": "Nóng trên mạng", "url": "category.html?cat=nong-tren-mang" }
    ]
  },
  { "id": "bat-dong-san", "title": "Bất động sản", "url": "category.html?cat=bat-dong-san", "type": "category" }
];

const DEFAULT_POSTS = [
  {
    "id": "dtri-20260928122246655",
    "title": "Hà Nội tính cơ chế bồi thường đất đặc biệt cho 7 dự án đường sắt",
    "slug": "ha-noi-tinh-co-che-boi-thuong-dat-dac-biet-cho-7-du-an-duong-sat",
    "excerpt": "Hà Nội đang xem xét cơ chế bồi thường, hỗ trợ và tái định cư đặc biệt để triển khai 7 dự án đường sắt quan trọng trên địa bàn thành phố.",
    "content": "<p>Hà Nội đang nghiên cứu và đề xuất cơ chế bồi thường, hỗ trợ và tái định cư đặc biệt nhằm tháo gỡ khó khăn trong công tác giải phóng mặt bằng cho 7 dự án đường sắt trọng điểm.</p><p>Đây là nhóm dự án hạ tầng giao thông có vai trò quan trọng trong việc phát triển mạng lưới vận tải công cộng và giảm ùn tắc đô thị.</p>",
    "author": "Văn Hưng",
    "category": "Bất động sản",
    "publishedAt": "2026-09-28 12:22",
    "source": "dantri.com.vn",
    "url": "https://dantri.com.vn/bat-dong-san/ha-noi-tinh-co-che-boi-thuong-dat-dac-biet-cho-7-du-an-duong-sat-20260928122246655.htm",
    "image": "https://icdn.dantri.com.vn/2023/09/28/duong-sat-1695882000.jpg"
  },
  {
    "id": "dtri-20260928101500000",
    "title": "Thiếu gia Ấn Độ quyết cưới cô gái Việt Nam vì hành động không ngờ",
    "slug": "thieu-gia-an-do-quyet-cuoi-co-gai-viet-nam",
    "excerpt": "Yêu cô gái Việt, Abhishek (đến từ Ấn Độ) vấp phải sự phản đối từ gia đình vì khác biệt văn hoá, khoảng cách địa lý.",
    "content": "<p>Yêu cô gái Việt, Abhishek vấp phải sự phản đối từ gia đình. Anh và bạn gái đã tìm nhiều cách thuyết phục bố mẹ để được kết hôn và có một cái kết viên mãn.</p>",
    "author": "Thùy Linh",
    "category": "Thế giới",
    "publishedAt": "2026-09-28 10:15",
    "source": "dantri.com.vn",
    "url": "https://dantri.com.vn/",
    "image": "https://icdn.dantri.com.vn/2023/09/28/dam-cuoi-1695881000.jpg"
  },
  {
    "id": "dtri-20260928090000000",
    "title": "Cô gái Việt tiết lộ cảnh chưa từng thấy giữa Bangkok ngập lụt diện rộng",
    "slug": "co-gai-viet-tiet-lo-canh-chua-tung-thay-giua-bangkok-ngap-lut",
    "excerpt": "Trận mưa lớn khiến nhiều tuyến phố ở Bangkok bị ngập sâu, ảnh hưởng nghiêm trọng đến đời sống người dân.",
    "content": "<p>Nhiều du khách và người dân Việt Nam sinh sống tại Bangkok chia sẻ những hình ảnh ấn tượng trong trận ngập lịch sử vừa qua.</p>",
    "author": "Minh Nhân",
    "category": "Thế giới",
    "publishedAt": "2026-09-28 09:00",
    "source": "dantri.com.vn",
    "url": "https://dantri.com.vn/",
    "image": "https://icdn.dantri.com.vn/2023/09/28/bangkok-ngap-1695880000.jpg"
  },
  {
    "id": "dtri-20260928083000000",
    "title": "Ông bố ở Bắc Ninh khóc như mưa tiễn con gái về nhà chồng chỉ cách 6km",
    "slug": "ong-bo-bac-ninh-khoc-tien-con-gai-ve-nha-chong",
    "excerpt": "Khoảnh khắc xúc động của hai bố con trong ngày đám cưới khiến nhiều cư dân mạng không khỏi bồi hồi.",
    "content": "<p>Dù nhà chồng con gái chỉ cách 6km nhưng ông bố không nén được giọt nước mắt nghẹn ngào khi trao tay con cho con rể.</p>",
    "author": "Hải Yến",
    "category": "Thời sự",
    "publishedAt": "2026-09-28 08:30",
    "source": "dantri.com.vn",
    "url": "https://dantri.com.vn/",
    "image": "https://icdn.dantri.com.vn/2023/09/28/dam-cuoi-bac-ninh-1695879000.jpg"
  },
  {
    "id": "dtri-20260928071500000",
    "title": "Cô gái Việt trồng rau, làm vườn 100m2 trên đất Mỹ để đỡ nhớ nhà",
    "slug": "co-gai-viet-trong-rau-lam-vuon-100m2-tren-dat-my",
    "excerpt": "Để vơi đi nỗi nhớ quê nhà, chị Trinh cải tạo lại mảnh đất trống quanh nhà thành khu vườn 100m2 trồng nhiều loại rau Việt Nam.",
    "content": "<p>Để vơi đi nỗi nhớ quê nhà, chị Trinh đã tự tay quy hoạch và chăm sóc khu vườn 100m2 đầy đủ các loại rau thơm, củ quả thuần Việt tại Mỹ.</p>",
    "author": "Ánh Dương",
    "category": "Thế giới",
    "publishedAt": "2026-09-28 07:15",
    "source": "dantri.com.vn",
    "url": "https://dantri.com.vn/",
    "image": "https://icdn.dantri.com.vn/2023/09/28/trong-rau-my-1695878000.jpg"
  },
  {
    "id": "dtri-20260928064500000",
    "title": "28 năm đi bộ vòng quanh thế giới, nhà khám hiểm Anh còn một thử thách cuối",
    "slug": "28-nam-di-bo-vong-quanh-the-gioi",
    "excerpt": "Sau 28 năm và hành trình dài khoảng 50.000km, nhà khám hiểm người Anh Karl Bushby đang đứng trước thử thách cuối cùng.",
    "content": "<p>Karl Bushby đã dành gần ba thập kỷ chinh phục các vùng đất trên hành tinh bằng chính đôi chân của mình.</p>",
    "author": "Hoàng Nam",
    "category": "Thế giới",
    "publishedAt": "2026-09-28 06:45",
    "source": "dantri.com.vn",
    "url": "https://dantri.com.vn/",
    "image": "https://icdn.dantri.com.vn/2023/09/28/nha-kham-pha-1695877000.jpg"
  }
];

// Nạp Menu Navbar
async function loadCategories() {
  let categories = [];
  const localCats = localStorage.getItem('news_categories');
  if (localCats) {
    try { categories = JSON.parse(localCats); } catch (e) {}
  }

  if (!categories || categories.length === 0) {
    try {
      const res = await fetch('./data/categories.json');
      if (res.ok) {
        categories = await res.json();
      }
    } catch (err) {}
  }

  if (!categories || categories.length === 0) {
    categories = DEFAULT_CATEGORIES;
  }

  localStorage.setItem('news_categories', JSON.stringify(categories));
  return categories;
}

// Nạp Bài Viết
async function loadPosts() {
  let posts = [];
  const localPosts = localStorage.getItem('news_posts');
  if (localPosts) {
    try { posts = JSON.parse(localPosts); } catch (e) {}
  }

  if (!posts || posts.length === 0) {
    try {
      const res = await fetch('./data/posts.json');
      if (res.ok) {
        const data = await res.json();
        posts = Array.isArray(data) ? data : (data.posts || []);
      }
    } catch (err) {}
  }

  if (!posts || posts.length === 0) {
    posts = DEFAULT_POSTS;
  }

  localStorage.setItem('news_posts', JSON.stringify(posts));
  return posts;
}

// Render Menu Navbar
async function renderNavbar() {
  const menuContainer = document.getElementById('categories-menu');
  if (!menuContainer) return;

  const categories = await loadCategories();
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
}

// Render Trang Chủ
async function renderHomePage() {
  const topSection = document.getElementById('top-section');
  const remainingSection = document.getElementById('remaining-posts');
  if (!topSection && !remainingSection) return;

  const posts = await loadPosts();

  if (!posts || posts.length === 0) {
    if (topSection) topSection.innerHTML = '<p>Chưa có bài viết nào.</p>';
    return;
  }

  // Sắp xếp bài mới nhất lên đầu
  posts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  // Top section: 3 bài đầu (1 bài lớn left + 2 bài nhỏ right)
  const top3 = posts.slice(0, 3);
  if (topSection && top3.length > 0) {
    let topHtml = '';

    const feat = top3[0];
    topHtml += `
      <div class="featured-post">
        <img src="${feat.image || 'https://via.placeholder.com/600x340'}" alt="${feat.title}">
        <h2><a href="post.html?id=${feat.id}">${feat.title}</a></h2>
        <p>${feat.excerpt || ''}</p>
      </div>
    `;

    topHtml += `<div class="small-posts">`;
    for (let i = 1; i < top3.length; i++) {
      topHtml += `
        <div class="small-post-item">
          <img src="${top3[i].image || 'https://via.placeholder.com/130x90'}" alt="${top3[i].title}">
          <h4><a href="post.html?id=${top3[i].id}">${top3[i].title}</a></h4>
        </div>
      `;
    }
    topHtml += `</div>`;
    topSection.innerHTML = topHtml;
  }

  // Các bài viết còn lại (Danh sách dọc)
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

document.addEventListener('DOMContentLoaded', async () => {
  await renderNavbar();
  await renderHomePage();
});
