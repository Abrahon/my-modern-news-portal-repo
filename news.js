const loadNewses = () => {
    spinner(true)
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
        .catch(error => displayCategories(error))



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
    spinner(true)

    // console.log(id)
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    //console.log(id)
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsDetailes(data.data))
        .catch(error => displayNewsDetailes(error))

}

const displayNewsDetailes = details => {
    // console.log(news);
    displayNewsCount(details.length)
    const newsDetail = document.getElementById('news-detail');
    newsDetail.innerHTML = ''
    details.forEach(detail => {
        // console.log(detail);
        const cardDiv = document.createElement('div');
        cardDiv.innerHTML = `
        <div class="card mb-3 p-4" >
                <div class="row g-0">
                    <div class="col-md-4">
                    <img class="w-100"src="${detail.thumbnail_url ? detail.thumbnail_url : 'No img found'}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                    <div class="card-body">
                    <h4 class="card-title">${detail.title}</h4>
                    <p class="card-text my-3">${detail.details.slice(0, 700)}...</p>
                    <div class="row">
                    <div class="col-md-4 d-flex justify-content-between"">
                        <img class="w-25 rounded-circle me-3" src="${detail.author.img}" alt="">
                        <div>
                        <h6>${detail.author.name ? detail.author.name : 'NO Name Found'}</h6>
                        <p> ${detail.author.published_date ? detail.author.published_date : 'NO Date Found'}</p>
                         </div>
                       
                    </div>
                    <div class="col-md-4">
                        <h4> ${detail.total_view ? detail.total_view : '00'}K</h4>
                    </div>
                    <div class="col-md-4">
                    <button onclick="loadData()" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    More view
                  </button>
                    </div>

                </div>
            </div>
                `;

        newsDetail.appendChild(cardDiv);



    })


    spinner(false)
}

// // spinner function
function spinner(isLoading) {
    const loderSection = document.getElementById("loader");


    if (isLoading) {
        loderSection.classList.remove("d-none");
    }
    else {
        loderSection.classList.add("d-none");
    }
}

const displayNewsCount = (newslength) => {
    const newsLenthCounter = document.getElementById('newslength-container');
    newsLenthCounter.innerText = newslength;
}

loadCategoryNews('08')



loadNewses();
