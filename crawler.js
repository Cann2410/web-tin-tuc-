// ==========================================
// CRAWLER PAGE
// ==========================================

// Bài viết vừa crawl
let crawledPost = null;


// ==========================================
// CRAWL BÀI VIẾT
// ==========================================

async function crawlArticle() {

    const urlInput =
        document.getElementById("articleUrl");

    const status =
        document.getElementById("crawlStatus");

    const result =
        document.getElementById("crawlResult");

    const jsonOutput =
        document.getElementById("jsonOutput");

    const saveButton =
        document.getElementById("saveButton");


    const url = urlInput.value.trim();


    // Kiểm tra URL
    if (!url) {

        status.textContent =
            "Vui lòng nhập URL bài viết.";

        return;
    }


    try {

        new URL(url);

    } catch (error) {

        status.textContent =
            "URL không hợp lệ.";

        return;
    }


    // Hiển thị trạng thái
    status.textContent =
        "Đang xử lý bài viết...";


    result.innerHTML = "";

    jsonOutput.textContent =
        "Đang xử lý...";

    saveButton.disabled = true;


    try {

        /*
         * LƯU Ý:
         * GitHub Pages có thể bị CORS khi lấy
         * trực tiếp nội dung từ website bên ngoài.
         *
         * Phần này sử dụng một CORS proxy
         * để phục vụ demo bài tập.
         */

        const proxyUrl =
            "https://api.allorigins.win/raw?url=" +
            encodeURIComponent(url);


        const response =
            await fetch(proxyUrl);


        if (!response.ok) {

            throw new Error(
                "Không thể tải bài viết."
            );

        }


        const html =
            await response.text();


        // Phân tích HTML
        const parser =
            new DOMParser();

        const doc =
            parser.parseFromString(
                html,
                "text/html"
            );


        // Chuẩn hóa dữ liệu
        crawledPost =
            extractArticleData(doc, url);


        // Hiển thị kết quả
        displayCrawledPost(
            crawledPost
        );


        // Hiển thị JSON
        jsonOutput.textContent =
            JSON.stringify(
                crawledPost,
                null,
                4
            );


        status.textContent =
            "Crawl bài viết thành công.";

        saveButton.disabled = false;


    } catch (error) {

        console.error(error);

        status.textContent =
            "Không thể crawl bài viết. " +
            "Website có thể chặn truy cập hoặc " +
            "CORS proxy không hoạt động.";

        jsonOutput.textContent =
            "Không có dữ liệu.";

    }

}


// ==========================================
// TRÍCH XUẤT THÔNG TIN
// ==========================================

function extractArticleData(doc, url) {


    // TITLE
    const title =
        getMetaContent(
            doc,
            "og:title"
        ) ||
        getMetaContent(
            doc,
            "twitter:title"
        ) ||
        doc.querySelector("h1")?.textContent.trim() ||
        doc.title ||
        "";


    // EXCERPT
    const excerpt =
        getMetaContent(
            doc,
            "description"
        ) ||
        getMetaContent(
            doc,
            "og:description"
        ) ||
        "";


    // CONTENT
    const contentElement =
        doc.querySelector(
            "article"
        ) ||
        doc.querySelector(
            "[class*='article']"
        ) ||
        doc.querySelector(
            "[class*='content']"
        );


    let content = "";


    if (contentElement) {

        content =
            contentElement.innerText.trim();

    }


    // AUTHOR
    const author =
        getMetaContent(
            doc,
            "author"
        ) ||
        doc.querySelector(
            "[class*='author']"
        )?.textContent.trim() ||
        "";


    // PUBLISHED DATE
    const publishedAt =
        getMetaContent(
            doc,
            "article:published_time"
        ) ||
        doc.querySelector(
            "time"
        )?.getAttribute("datetime") ||
        doc.querySelector(
            "time"
        )?.textContent.trim() ||
        "";


    // CATEGORY
    const category =
        getMetaContent(
            doc,
            "article:section"
        ) ||
        "";


    // SOURCE
    let source = "";

    try {

        source =
            new URL(url).hostname;

    } catch (error) {

        source = "";

    }


    // ID
    const id =
        createArticleId(
            url,
            title
        );


    // SLUG
    const slug =
        createSlug(title);


    return {

        id: id,

        title: title,

        slug: slug,

        excerpt: excerpt,

        content: content,

        author: author,

        category: category,

        publishedAt: publishedAt,

        source: source,

        url: url

    };

}


// ==========================================
// LẤY META
// ==========================================

function getMetaContent(
    doc,
    property
) {

    const element =
        doc.querySelector(
            `meta[property="${property}"]`
        ) ||
        doc.querySelector(
            `meta[name="${property}"]`
        );


    return element
        ? element.getAttribute("content") || ""
        : "";

}


// ==========================================
// TẠO ID
// ==========================================

function createArticleId(
    url,
    title
) {

    const text =
        url + title;


    let hash = 0;


    for (
        let i = 0;
        i < text.length;
        i++
    ) {

        hash =
            ((hash << 5) - hash) +
            text.charCodeAt(i);

        hash |= 0;

    }


    return "crawl-" +
        Math.abs(hash);

}


// ==========================================
// TẠO SLUG
// ==========================================

function createSlug(text) {

    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        )
        .replace(
            /đ/g,
            "d"
        )
        .replace(
            /[^a-z0-9\s-]/g,
            ""
        )
        .trim()
        .replace(
            /\s+/g,
            "-"
        );

}


// ==========================================
// HIỂN THỊ KẾT QUẢ
// ==========================================

function displayCrawledPost(post) {

    const result =
        document.getElementById(
            "crawlResult"
        );


    result.innerHTML = `

        <div class="crawler-card">

            <h2>
                ${escapeHTML(post.title)}
            </h2>

            <p>
                <strong>ID:</strong>
                ${escapeHTML(post.id)}
            </p>

            <p>
                <strong>Slug:</strong>
                ${escapeHTML(post.slug)}
            </p>

            <p>
                <strong>Excerpt:</strong>
                ${escapeHTML(post.excerpt)}
            </p>

            <p>
                <strong>Author:</strong>
                ${escapeHTML(post.author)}
            </p>

            <p>
                <strong>Category:</strong>
                ${escapeHTML(post.category)}
            </p>

            <p>
                <strong>Published:</strong>
                ${escapeHTML(post.publishedAt)}
            </p>

            <p>
                <strong>Source:</strong>
                ${escapeHTML(post.source)}
            </p>

        </div>

    `;

}


// ==========================================
// CHỐNG CHÈN HTML
// ==========================================

function escapeHTML(text) {

    if (!text) return "";

    return String(text)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


// ==========================================
// LƯU VÀO LOCAL STORAGE
// ==========================================

function saveCrawledPost() {

    if (!crawledPost) {

        alert(
            "Chưa có bài viết để lưu."
        );

        return;
    }


    // Lấy dữ liệu cũ
    const savedPosts =
        JSON.parse(
            localStorage.getItem(
                "crawledPosts"
            )
        ) || [];


    // Kiểm tra trùng ID
    const exists =
        savedPosts.some(
            post =>
                post.id === crawledPost.id
        );


    if (!exists) {

        savedPosts.push(
            crawledPost
        );

    }


    // Lưu lại
    localStorage.setItem(
        "crawledPosts",
        JSON.stringify(
            savedPosts
        )
    );


    alert(
        "Đã lưu bài viết vào LocalStorage."
    );

}


// ==========================================
// GÁN SỰ KIỆN
// ==========================================

document
    .getElementById("crawlButton")
    ?.addEventListener(
        "click",
        crawlArticle
    );


document
    .getElementById("saveButton")
    ?.addEventListener(
        "click",
        saveCrawledPost
    );
