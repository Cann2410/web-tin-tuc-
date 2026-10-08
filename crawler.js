async function startCrawl() {
  const urlInput = document.getElementById('crawl-url').value.trim();
  const statusMsg = document.getElementById('status-msg');
  const jsonOutput = document.getElementById('json-output');

  if (!urlInput) {
    alert('Vui lòng nhập URL!');
    return;
  }

  statusMsg.style.color = '#d35400';
  statusMsg.innerText = 'Đang cào dữ liệu qua Proxy...';
  jsonOutput.innerText = '';

  try {
    const proxyUrl = 'https://corsproxy.io/?' + encodeURIComponent(urlInput);
    const res = await fetch(proxyUrl);
    if (!res.ok) throw new Error('Không thể tải bài viết từ URL này!');

    const htmlText = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');

    const title = doc.querySelector('.e-magazine__title, .title-page, h1')?.innerText.trim() || 'Không có tiêu đề';
    const excerpt = doc.querySelector('.singular-sapo, .sapo')?.innerText.trim() || '';
    const content = doc.querySelector('.singular-content, .f-req')?.innerHTML.trim() || '';
    const author = doc.querySelector('.author-name, .author-name b')?.innerText.trim() || 'Dân trí';
    const publishedAt = doc.querySelector('.author-time, .time')?.innerText.trim() || new Date().toLocaleString();
    const category = doc.querySelector('.bread-crumb li:nth-child(2) a')?.innerText.trim() || 'Thời sự';
    const image = doc.querySelector('.singular-content img, .e-magazine__cover img')?.getAttribute('src') || '';

    const idMatch = urlInput.match(/(\d+)\.htm/);
    const id = idMatch ? `dtri-${idMatch[1]}` : `dtri-${Date.now()}`;

    const postObj = {
      id: id,
      title: title,
      slug: title.toLowerCase().replace(/([^0-9a-z-\s])/g, '').replace(/(\s+)/g, '-'),
      excerpt: excerpt,
      content: content,
      author: author,
      category: category,
      publishedAt: publishedAt,
      source: "dantri.com.vn",
      url: urlInput,
      image: image
    };

    // Lưu vào LocalStorage[cite: 1]
    let posts = JSON.parse(localStorage.getItem('news_posts')) || [];
    const index = posts.findIndex(p => p.id === postObj.id);
    if (index !== -1) {
      posts[index] = postObj;
    } else {
      posts.unshift(postObj);
    }
    localStorage.setItem('news_posts', JSON.stringify(posts));

    statusMsg.style.color = '#27ae60';
    statusMsg.innerText = 'Cào tin thành công và đã lưu vào LocalStorage!';
    jsonOutput.innerText = JSON.stringify(postObj, null, 2);

  } catch (err) {
    statusMsg.style.color = '#c0392b';
    statusMsg.innerText = 'Lỗi cào tin: ' + err.message;
  }
}
