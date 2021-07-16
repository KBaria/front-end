const container = document.querySelector('.container');
const input = document.querySelector('#input');
let page_count = 1;

// enter key event listener for search bar
input.addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){
        searchImages();
    }
})

// remove images 
const removeImages = () => {
    container.innerHTML = '';
}
// search images 
const searchImages = () => {
    page_count = 1;
    removeImages();
    unsplash();
}
// unsplash api returns results based on search input
const unsplash = async () => {
    try {
        const url = `https://api.unsplash.com/search/photos?page=${page_count}&query=${input.value}&per_page=25&client_id=P6-47wvuTNpcOTmSvATX7kYVjPryuRN1l3ekwpYZ1EM`;
        const response = await fetch(url)
        const data = await response.json();
        console.log(data);
        page_count++;
        data.results.forEach((element) => {
            const second = document.createElement('div');
            second.classList.add('image-holder')
            second.innerHTML = `<a href=${element.urls.full}><img  src=${element.urls.regular}></a>`;
            container.appendChild(second);
    });
    }catch(err) {
        console.log(err);
    }
}

// infinite scroll upto 5 pages
let page_limit = 5;

window.addEventListener('scroll', () => {
    const {scrollHeight, scrollTop, clientHeight} = document.documentElement;
    if ((scrollTop+clientHeight >= scrollHeight) && page_count <= page_limit) {
        unsplash();
    }
})