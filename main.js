const URL = "https://fakestoreapi.com/products";

document.addEventListener("DOMContentLoaded", function () {
    const infoContainer = document.getElementById("info");
    const rangeFilterCountMin = document.getElementById("rangeFilterCountMin");
    const rangeFilterCountMax = document.getElementById("rangeFilterCountMax");
    const rangeFilterCountBtn = document.getElementById("rangeFilterCount");
    const clearRangeFilterBtn = document.getElementById("clearRangeFilter");

    let products = [];

    // Función para renderizar la lista de productos
    function renderProducts(productsToShow) {
        infoContainer.innerHTML = "";
        productsToShow.forEach(product => {
            const productItem = document.createElement("a");
            productItem.classList.add("list-group-item", "list-group-item-action");
            productItem.innerHTML = `<strong>${product.title}</strong> - $${product.price}`;
            infoContainer.appendChild(productItem);
        });
    }

    // El fetch
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            products = data;
            renderProducts(products);
        })
        .catch(error => console.error("Error fetching products:", error));

    //De acá arranco con el filtro
    function filterProductsByPrice(minPrice, maxPrice) {
        return products.filter(product => product.price >= minPrice && product.price <= maxPrice);
    }

    // evento de clic en el botón de filtro por rango de precios
    rangeFilterCountBtn.addEventListener("click", () => {
        const minPrice = parseFloat(rangeFilterCountMin.value) || 0;
        const maxPrice = parseFloat(rangeFilterCountMax.value) || Infinity;

        const filteredProducts = filterProductsByPrice(minPrice, maxPrice);
        renderProducts(filteredProducts);
    });

    // evento de clic en el botón de limpiar filtro
    clearRangeFilterBtn.addEventListener("click", () => {
        rangeFilterCountMin.value = "";
        rangeFilterCountMax.value = "";
        renderProducts(products);
    });
});
