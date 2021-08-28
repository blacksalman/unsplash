const input = document.getElementById('input');
const grid = document.getElementsByClassName('grid')[0];

window.addEventListener('load', dayNightMode);

input.addEventListener('keydown', function(event){
    if(event.key === 'Enter')
      loadImg();
})

function loadImg(){
    removeImages();

    const clientAccessId = 'SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo';
    const totalSearchImage = '9';
    const url = `https://api.unsplash.com/search/photos?query=${input.value}&per_page=${totalSearchImage}&client_id=${clientAccessId}`;

    fetch(url)

    .then(response => {
        if(response.ok)
          return response.json();
        else
          alert(response.status)
    })

    .then(data => {
        const imageNodes = [];
        for(let i = 0; i < data.results.length;i++){
            imageNodes[i] = document.createElement('div');
            imageNodes[i].className = 'img';
            imageNodes[i].style.backgroundImage = 'url('+data.results[i].urls.raw +')';
            imageNodes[i].addEventListener('dblclick', function(){
                window.open(data.results[i].links.download,'_blank');
            })
            grid.appendChild(imageNodes[i]);
        }
    })
}

function removeImages(){
    grid.innerHTML = '';
}

function dayNightMode(){
    const date = new Date();
    const hour = date.getHours();

    if(hour >= 7 && hour <= 19){
        document.body.style.backgroundColor = 'whitesmoke';
        document.body.style.color = 'black';
    }
    else{
        document.body.style.backgroundColor = 'black';
        document.body.style.color = 'white';

    }
}