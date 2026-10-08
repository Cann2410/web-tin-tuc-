// ==========================================
// TẢI MENU TỪ FILE menu.json
// ==========================================

fetch("data/menu.json")
    .then(response => response.json())
    .then(data => {

        const menu =
            document.getElementById("categoryMenu");

        if (!menu) return;

        menu.innerHTML = "";


        // ======================================
        // TẠO MENU
        // ======================================

        function createMenu(items, parentElement) {

            items.forEach(item => {

                const li =
                    document.createElement("li");


                const link =
                    document.createElement("a");


                // Tên danh mục
                link.textContent =
                    item.title;


                // ==================================
                // XỬ LÝ LINK
                // ==================================

                if (
                    item.type === "home"
                ) {

                    // Trang chủ
                    link.href =
                        "index.html";

                }

                else {

                    // Danh mục
                    link.href =
                        "category.html?id=" +
                        encodeURIComponent(item.id);

                }


                // ==================================
                // DANH MỤC CON
                // ==================================

                li.appendChild(link);


                if (
                    item.children &&
                    item.children.length > 0
                ) {

                    const subMenu =
                        document.createElement("ul");

                    subMenu.className =
                        "submenu";


                    createMenu(
                        item.children,
                        subMenu
                    );


                    li.appendChild(subMenu);

                }


                parentElement.appendChild(li);

            });

        }


        // Tạo menu chính
        createMenu(
            data.menu,
            menu
        );

    })


    .catch(error => {

        console.error(
            "Không thể tải menu:",
            error
        );

    });
