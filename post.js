// ==========================================
// POST DETAIL PAGE
// ==========================================

// Lấy ID bài viết từ URL
// Ví dụ:
// post.html?id=dtri-20260928122246655

const params = new URLSearchParams(window.location.search);
const postId = params.get("id");


// ==========================================
// TẢI DỮ LIỆU BÀI VIẾT
// ==========================================

async function loadPost() {

    try {

        const response = await fetch("./data/posts.json");

        if (!response.ok) {
            throw new Error("Không thể tải posts.json");
        }

        const posts = await response.json();


        // Tìm bài viết có ID tương ứng
        const post = posts.find(item => item.id === postId);


        // Nếu không tìm thấy
        if (!post) {

            document.getElementById("postDetail").innerHTML = `
                <h1>Không tìm thấy bài viết</h1>
                <p>Bài viết bạn đang tìm không tồn tại.</p>

                <a href="index.html">
                    ← Quay về trang chủ
                </a>
            `;

            return;
        }


        // Hiển thị bài viết
        renderPost(post);


    } catch (error) {

        console.error(error);

        document.getElementById("postDetail").innerHTML = `
            <h1>Có lỗi xảy ra</h1>

            <p>
                Không thể tải dữ liệu bài viết.
            </p>
        `;

    }

}


// ==========================================
// HIỂN THỊ BÀI VIẾT
// ==========================================

function renderPost(post) {

    const container =
        document.getElementById("postDetail");


    // Xử lý category nếu là mảng
    let category = post.category;

    if (Array.isArray(category)) {

        category = category.join(", ");

    }


    container.innerHTML = `

        <div class="post-category">
            ${category || "Tin tức"}
        </div>


        <h1 class="post-title">
            ${post.title || "Không có tiêu đề"}
        </h1>


        <div class="post-meta">

            <span>
                Tác giả:
                ${post.author || "Không rõ"}
            </span>

            <span>
                ${post.publishedAt || ""}
            </span>

        </div>


        <p class="post-excerpt">
            ${post.excerpt || ""}
        </p>


        <div class="post-content">

            ${formatContent(post.content)}

        </div>


        <div class="post-source">

            Nguồn:
            ${post.source || ""}

        </div>


        <a
            href="index.html"
            class="back-home"
        >
            ← Quay về trang chủ
        </a>

    `;


    // Đổi tiêu đề trình duyệt
    document.title =
        post.title || "Chi tiết bài viết";

}


// ==========================================
// XỬ LÝ NỘI DUNG
// ==========================================

function formatContent(content) {

    if (!content) {

        return "<p>Chưa có nội dung bài viết.</p>";

    }


    // Tách các đoạn văn bằng xuống dòng
    return content
        .split(/\n+/)
        .map(paragraph => {

            if (!paragraph.trim()) {
                return "";
            }

            return `<p>${paragraph.trim()}</p>`;

        })
        .join("");

}


// ==========================================
// CHẠY CHƯƠNG TRÌNH
// ==========================================

loadPost();
