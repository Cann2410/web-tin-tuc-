// ===============================
// TẢI MENU TỪ FILE menu.json
// ===============================

fetch("data/menu.json")
    .then(response => response.json())
    .then(data => {
        const menu = document.getElementById("categoryMenu");

        menu.innerHTML = "";

        // Hàm tạo menu
        function createMenu(items, parentElement) {

            items.forEach(item => {

                const li = document.createElement("li");

                const link = document.createElement("a");

                link.textContent = item.label;
                link.href = item.url;

                if (item.type === "external") {
                    link.target = "_blank";
                }

                li.appendChild(link);

                // Nếu có danh mục con
                if (item.children && item.children.length > 0) {

                    const subMenu = document.createElement("ul");

                    createMenu(item.children, subMenu);

                    li.appendChild(subMenu);
                }

                parentElement.appendChild(li);
            });
        }

        createMenu(data.menu, menu);
    })

    .catch(error => {
        console.error("Không thể tải menu:", error);
    });
