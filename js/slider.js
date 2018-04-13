console.log("connected")
let images = ["planter-1.jpg", "planter-2.jpg", "planter-3.jpg", "planter-4.jpg", "planter-5.jpg",
"planter-6.jpg", "planter-7.jpg", "planter-8.jpg", "planter-9.jpg"
];

let captions = ["Calgary Zoo", "C-train Station", "MRU Library", "East-Side Village", "Chinook Mall", "Glenbow Museum", "Banf's Old Downtown", "Olympic Plaza", "Banf's Canada Post"];


let imgA = document.getElementById('image-A');
let imgB = document.getElementById('image-B');

let gradient = ["linear-gradient( to right bottom,"+"rgba"+"(22, 46, 105, 0.11),"+"rgba"+"(14, 45, 71, 0.11)),"].join('');
let capB = document.querySelector('.caption-B');
let current = 0;
setCurrent();

function addCaption() {
    let div = document.createElement('div');
    div.setAttribute('class', "caption-B");
    div.innerHTML = captions[current];
    imgB.appendChild(div);
}
function next() {
    if (++current > images.length - 1)
        current = 0;
    imgA.style.backgroundImage = gradient+'url("../img/planter-' + (current+1) + '.jpg")';
    imgA.classList.add('inRight');
    imgB.classList.add('outLeft');
    imgB.innerHTML = "";
    setTimeout(setCurrent, 2000);

}

function prev() {
    if (--current < 0)
        current = images.length - 1;
    imgA.style.backgroundImage = gradient+'url("../img/planter-' + (current+1) + '.jpg")';
    imgA.classList.add('inLeft');
    imgB.classList.add('outRight');
    setTimeout(setCurrent, 2000);

}

function setCurrent() {
    imgB.style.backgroundImage = gradient+'url("../img/planter-' + (current+1)+ '.jpg")';
    imgA.classList.remove('inLeft');
    imgB.classList.remove('outRight');
    imgA.classList.remove('inRight');
    imgB.classList.remove('outLeft');

    imgB.innerHTML = "";
    addCaption();
    imgB.children[0].classList.add('inBot');



}

setInterval(next, 6000);