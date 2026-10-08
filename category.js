// ==========================================
// CATEGORY PAGE
// ==========================================

// Lấy ID danh mục từ URL
// Ví dụ:
// category.html?id=the-gioi
const params = new URLSearchParams(window.location.search);
const categoryId = params.get("id");


// ------------------------------------------
// Đọc dữ liệu bài viết
// ------------------------------------------
async function loadCategoryPosts() {

    try {

        const response = await fetch("./data/posts.json");

        if (!response.ok) {
            throw new Error("Không thể tải posts.json");
        }

        const posts = await response.json();

        // Lọc bài viết theo category
        const categoryPosts = posts.filter(post => {

            if (Array.isArray(post.category)) {
                return post.category.includes(categoryId);
            }

            return post.category === categoryId;
        });


        // Sắp xếp bài viết mới nhất trước
        categoryPosts.sort((a, b) => {

            return new Date(b.publishedAt) -
                   new Date(a.publishedAt);

        });


        // Hiển thị tên danh mục
        const title = document.getElementById("categoryTitle");

        if (title) {
            title.textContent =
                categoryId
                    ? categoryId
                    : "Danh mục";
        }


        // Hiển thị 3 bài mới nhất
        renderTopPosts(categoryPosts.slice(0, 3));


        // Hiển thị các bài còn lại
        renderRemainingPosts(categoryPosts.slice(3));


    } catch (error) {

        console.error(error);

        const title =
            document.getElementById("categoryTitle");

        if (title) {

            title.textContent =
                "Không thể tải dữ liệu bài viết";

        }

    }

}


// ------------------------------------------
// Hiển thị 3 bài mới nhất
// ------------------------------------------
function renderTopPosts(posts) {

    const container =
        document.getElementById("topPosts");

    if (!container) return;


    container.innerHTML = "";


    if (posts.length === 0) {

        container.innerHTML =
            "<p>Chưa có bài viết trong danh mục này.</p>";

        return;
    }


    // Bài lớn
    if (posts[0]) {

        const featured =
            createPostCard(posts[0], "featured");

        container.appendChild(featured);

    }


    // Hai bài nhỏ
    const sideContainer =
        document.createElement("div");

    sideContainer.className =
        "side-posts";


    posts.slice(1, 3).forEach(post => {

        const card =
            createPostCard(post, "small");

        sideContainer.appendChild(card);

    });


    container.appendChild(sideContainer);

}


// ------------------------------------------
// Hiển thị các bài còn lại
// ------------------------------------------
function renderRemainingPosts(posts) {

    const container =
        document.getElementById("categoryPostList");

    if (!container) return;


    container.innerHTML = "";


    posts.forEach(post => {

        const card =
            createPostCard(post, "list");

        container.appendChild(card);

    });

}


// ------------------------------------------
// Tạo thẻ bài viết
// ------------------------------------------
function createPostCard(post, type) {

    const article =
        document.createElement("article");

    article.className =
        `post-card ${type}`;


    article.innerHTML = `

        <div class="post-content">

            <h2>
                ${post.title || "Không có tiêu đề"}
            </h2>

            <p>
                ${post.excerpt || ""}
            </p>

            <div class="post-meta">

                <span>
                    ${post.author || "Không rõ tác giả"}
                </span>

                <span>
                    ${post.publishedAt || ""}
                </span>

            </div>

            <a
                href="post.html?id=${encodeURIComponent(post.id)}"
                class="read-more"
            >
                Đọc bài viết →
            </a>

        </div>

    `;


    return article;

}


// ------------------------------------------
// Chạy chương trình
// ------------------------------------------
loadCategoryPosts();
