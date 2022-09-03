const loadNewses = () => {
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
    // console.log(id)
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
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
                    <p class="card-text my-3">${detail.details.slice(0, 800)}</p>
                    <div class="row">
                    <div class="col-md-4 d-flex justify-content-between"">
                        <img class="w-25 rounded-circle me-3" src="${detail.author.img}" alt="">
                        <div>
                        <h6>${detail.author.name ? detail.author.name : 'NO Name Found'}</h6>
                        <p> ${detail.author.published_date ? detail.author.published_date : 'NO Date Found'}</p>
                         </div>
                       
                    </div>
                    <div class="col-md-4">
                        <p></p>
                        <h4> ${detail.total_view ? detail.total_view : '00'} M</h4>
                    </div>
                    <div class="col-md-4">
                        <h4 class='btn btn-primary'>Details</h4>
                    </div>

                </div>
            </div>
                `;

        newsDetail.appendChild(cardDiv);



    })
    spinner(false)
}
//    spenir showing
document.getElementById("news-detail").innerHTML = addEventListener("click", function () {
    //     // start loding
    spinner(true)

})
// // spinner function
const spinner = isLoading => {
    const loderSection = document.getElementById("loader");


    if (isLoading === true) {
        loderSection.classList.remove("d-none");
    }
    else {
        loderSection.classList.add("d-none");
    }
}


loadNewses();
