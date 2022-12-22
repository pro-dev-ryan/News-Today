resultView = async (categoryName, id = 08) => {
  loader(true);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/news/category/${id}`
  );
  const datas = await res.json();
  const array = datas.data;
  displayNews(array);
  const result = document.getElementById("category-result");
  result.textContent = "";
  const resultText = document.createElement("h4");
  resultText.classList.add("text-lg", "font-extralight", "text-stone-400");
  resultText.innerHTML = `${array.length} News Found in ${categoryName} Category`;
  result.appendChild(resultText);
};

navItems = async () => {
  const navUl = document.getElementById("nav-menu");
  const response = await fetch(
    "https://openapi.programming-hero.com/api/news/categories"
  );
  const data = await response.json();
  const categoriesArray = data.data.news_category;
  categoriesArray.forEach((category) => {
    const { category_id, category_name } = category;
    const id = category.catgory_id;
    const categoryName = category.category_name;
    const singleCategory = document.createElement("li");
    singleCategory.classList.add("hover:text-violet-700");
    singleCategory.innerHTML = `
        <a href="#" onclick="resultView('${categoryName}','${category_id}')" class="duration-1000">${categoryName}</a>
        `;
    navUl.appendChild(singleCategory);
  });
};

navItems();

displayNews = (data) => {
  const newsDiv = document.getElementById("newsDiv");
  newsDiv.textContent = "";
  data.forEach((contents) => {
    const { details, thumbnail_url, title, _id } = contents;
    const singleNews = document.createElement("div");
    singleNews.innerHTML = `
        <div class="card">
            <div>
              <img
                src="${thumbnail_url}"
                class=""
                alt=""
              />
            </div>
            <div class="card-content">
              <h2 class="title">${title}</h2>
              <p class="text-content text-gray-600">
                ${details.length > 35 ? details.slice(0, 50) + "..." : details}
              </p>
            </div>
            <div class="action-section">
              <button onclick="viewDetails('${_id}',)" class="btn modalBtn ">More...</button>
            </div>
          </div>
        `;
    newsDiv.appendChild(singleNews);
    loader(false);
  });
};

viewDetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/news/${id}`
  );
  const data = await res.json();
  const detailsObj = data.data[0];
  const { author, title, details, image_url, total_view } = detailsObj;
  const { name, published_date, img } = author;
  document.querySelector(".user-image").setAttribute("src", img);
  document.querySelector("#authorName").innerText = name ? name : "anonymous";
  document.querySelector("#published").innerText = published_date
    ? published_date
    : "N/A";
  document.querySelector(".postImage").setAttribute("src", image_url);
  document.querySelector(".heading").innerText = title;
  document.querySelector(".description").innerText = details;
  modal();
};

loader = (isLoading) => {
  const loaderDiv = document.getElementById("loader");
  const mainDiv = document.getElementById("mainDiv");
  if (isLoading) {
    loaderDiv.classList.remove("hidden");
    mainDiv.classList.add("hidden");
  } else {
    mainDiv.classList.remove("hidden");
    loaderDiv.classList.add("hidden");
  }
};

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("cls").addEventListener("click", modal);
});

mobileMenu = () => {
  const menu = document.getElementById("nav-menu");
  menu.classList.toggle("open");
  menu.classList.toggle("close");
  // menu.classList.add("hidden");
};

modal = () => {
  const modal = document.getElementById("modal");
  const overlay = document.getElementById("overlay");
  modal.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
  overlay.classList.toggle("flex");
};
