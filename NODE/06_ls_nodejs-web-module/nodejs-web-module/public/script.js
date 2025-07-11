// script.js - Клієнтська логіка для магазину продуктів

const productsContainer = document.getElementById("productsContainer");
const sortByNameBtn = document.getElementById("sortByNameBtn");
const sortByPriceAscBtn = document.getElementById("sortByPriceAscBtn");
const sortByPriceDescBtn = document.getElementById("sortByPriceDescBtn");
const messageContainer = document.getElementById("messageContainer");

let allProducts = []; // Зберігаємо всі продукти після завантаження

// --- Допоміжна функція для відображення повідомлень ---
function showMessage(message, type = "info") {
  messageContainer.textContent = message;
  messageContainer.className = "text-center text-lg font-medium mb-6"; // Скидаємо стилі
  if (type === "success") {
    messageContainer.classList.add("text-green-700");
  } else if (type === "error") {
    messageContainer.classList.add("text-red-700");
  } else {
    messageContainer.classList.add("text-gray-700");
  }
  // Очистити повідомлення через 5 секунд
  setTimeout(() => {
    messageContainer.textContent = "";
  }, 5000);
}

// --- Функція для відображення продуктів на сторінці ---
function displayProducts(products) {
  productsContainer.innerHTML = ""; // Очищаємо контейнер перед відображенням
  if (products.length === 0) {
    productsContainer.innerHTML =
      '<p class="col-span-full text-center text-gray-500">Продукти не знайдено.</p>';
    return;
  }

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className =
      "product-card p-4 flex flex-col items-center text-center";
    productCard.innerHTML = `
            <img src="${product.image}" alt="${
      product.title
    }" class="w-32 h-32 object-contain mb-4 rounded-lg">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">${
              product.title
            }</h3>
            <p class="text-gray-600 mb-1">Категорія: ${product.category}</p>
            <p class="text-2xl font-bold text-blue-600 mb-3">${product.price.toFixed(
              2
            )} €</p>
            <p class="text-sm text-gray-500 mb-4">В наявності: <span id="stock-${
              product.id
            }" class="font-bold ${
      product.availableStock === 0 ? "text-red-500" : "text-green-600"
    }">${product.availableStock}</span></p>

            <div class="flex items-center gap-2 mt-auto w-full">
                <input type="number" id="quantity-${
                  product.id
                }" value="1" min="1" max="${product.availableStock}"
                       class="w-full p-2 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-400">
                <button data-product-id="${product.id}"
                        class="buy-btn flex-shrink-0 px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition-colors duration-200 ${
                          product.availableStock === 0
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }"
                        ${product.availableStock === 0 ? "disabled" : ""}>
                    Купити
                </button>
            </div>
        `;
    productsContainer.appendChild(productCard);
  });

  // Додаємо слухачів подій для кнопок "Купити"
  document.querySelectorAll(".buy-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.target.dataset.productId;
      const quantityInput = document.getElementById(`quantity-${productId}`);
      const quantity = parseInt(quantityInput.value);
      handlePurchase(productId, quantity);
    });
  });
}

// --- Функція для завантаження продуктів з сервера ---
async function fetchProducts() {
  showMessage("Завантаження продуктів...");
  try {
    const response = await fetch("/products");
    if (!response.ok) {
      throw new Error(`HTTP помилка! Статус: ${response.status}`);
    }
    allProducts = await response.json();
    displayProducts(allProducts);
    showMessage("Продукти успішно завантажено.", "success");
  } catch (error) {
    console.error("Помилка при завантаженні продуктів:", error);
    showMessage(`Помилка завантаження продуктів: ${error.message}`, "error");
  }
}

// --- Функція для сортування продуктів ---
function sortProducts(products, type) {
  let sortedProducts = [...products]; // Створюємо копію, щоб не змінювати оригінал

  switch (type) {
    case "name":
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "price-asc":
      sortedProducts.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      sortedProducts.sort((a, b) => b.price - a.price);
      break;
    default:
      // Залишаємо як є
      break;
  }
  displayProducts(sortedProducts);
  sendSortPreference(type); // Відправляємо перевагу сортування на сервер
}

// --- Функція для відправки переваг сортування на сервер (POST-запит) ---
async function sendSortPreference(sortByType) {
  try {
    const response = await fetch("/sort-preference", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sortBy: sortByType,
        order: sortByType.includes("price")
          ? sortByType.includes("asc")
            ? "asc"
            : "desc"
          : "alphabetical",
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP помилка! Статус: ${response.status}`);
    }
    const data = await response.json();
    console.log("Сервер отримав перевагу сортування:", data.message);
  } catch (error) {
    console.error("Помилка відправки переваг сортування:", error);
  }
}

// --- Функція для обробки покупки (POST-запит) ---
async function handlePurchase(productId, quantity) {
  showMessage("Оформлення покупки...");
  try {
    const response = await fetch("/purchase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, quantity }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Помилка покупки");
    }

    // Оновлюємо відображення залишку на клієнті
    const stockSpan = document.getElementById(`stock-${productId}`);
    if (stockSpan) {
      stockSpan.textContent = data.newStock;
      if (data.newStock === 0) {
        stockSpan.classList.remove("text-green-600");
        stockSpan.classList.add("text-red-500");
        // Деактивуємо кнопку та поле вводу, якщо товар закінчився
        const buyButton = document.querySelector(
          `.buy-btn[data-product-id="${productId}"]`
        );
        const quantityInput = document.getElementById(`quantity-${productId}`);
        if (buyButton) {
          buyButton.disabled = true;
          buyButton.classList.add("opacity-50", "cursor-not-allowed");
        }
        if (quantityInput) {
          quantityInput.disabled = true;
          quantityInput.value = 0;
        }
      }
    }
    showMessage(data.message, "success");
    // Оновлюємо allProducts, щоб сортування працювало з актуальними залишками
    allProducts = allProducts.map((p) =>
      p.id === productId ? { ...p, availableStock: data.newStock } : p
    );
  } catch (error) {
    console.error("Помилка покупки:", error);
    showMessage(`Помилка покупки: ${error.message}`, "error");
  }
}

// --- Слухачі подій для кнопок сортування ---
sortByNameBtn.addEventListener("click", () =>
  sortProducts(allProducts, "name")
);
sortByPriceAscBtn.addEventListener("click", () =>
  sortProducts(allProducts, "price-asc")
);
sortByPriceDescBtn.addEventListener("click", () =>
  sortProducts(allProducts, "price-desc")
);

// --- Завантажуємо продукти при завантаженні сторінки ---
document.addEventListener("DOMContentLoaded", fetchProducts);
