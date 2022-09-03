const loadNewses = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category));
}
const displayCategories = categories => {
    const categoriesContainer = document.getElementById('categories-container');
    categories.forEach(category => {
        console.log(category)


        const newsList = document.createElement('li');
        newsList.classList.add("nav-item")
        newsList.innerHTML = `
        <a onclick="loadCategoryNews('${category.category_id}')"class="nav-link active">${category.category_name}</a>
      

        `;
        categoriesContainer.appendChild(newsList)



    });

}
loadCategoryNews = (id) => {
    // console.log(id)
    const url = `https://openapi.programming-hero.com/api/news/category/01${id}`
    console.log(id)
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsDetailes(data.data))
        .catch(error => displayNewsDetailes(error))

}
const displayNewsDetailes = details => {
    // console.log(news);
    const newsDetail = document.getElementById('news-detail');
    newsDetail.innerHTML = ''
    details.forEach(detail => {
        console.log(detail);
        const cardDiv = document.createElement('div');
        cardDiv.innerHTML = `

        `


    })

}
loadNewses();
