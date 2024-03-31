// References to DOM Elements
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const book = document.getElementById('book');


var papers = [];
for (var p = 0; p < NumofPages; p++) {
    papers[p] = document.getElementById('#p'+p);
}

// Event Listener
prevBtn.addEventListener('click', goPrevPage);
nextBtn.addEventListener('click', goNextPage);

// Business Logic
let currentLocation = 0;
let numOfPapers = NumofPages;

function openBook() {
    book.style.transform = 'translateX(50%)';
    prevBtn.style.transform = 'translateX(-29.4230769231vh)';
    nextBtn.style.transform = 'translateX(29.4230769231vh)';
}

function closeBook(isAtBeginning) {
    if(isAtBeginning) {
        book.style.transform = 'translateX(0%)';
    } else {
        book.style.transform = 'translateX(100%)';
    }

    prevBtn.style.transform = 'translateX(0vh)';
    nextBtn.style.transform = 'translateX(0vh)';
}

function goNextPage() {
    if(currentLocation < numOfPapers) {
        if (currentLocation === 0) {openBook()}
        var page1 = pages[2*currentLocation+preload].firstElementChild
        var page2 = pages[2*currentLocation+preload+1].firstElementChild
        page1.src = 'pages/' +'Wanderers'+(2*currentLocation+preload+1)+'.png';
        // page1.alt = 'Page ' + 2*currentLocation+3;

        page2.src = 'pages/' +'Wanderers'+(2*currentLocation+preload+2)+'.png';
        // page2.alt = 'Page ' + 2*currentLocation+4;
        papers[currentLocation].classList.add('flipped');
        papers[currentLocation].style.zIndex = currentLocation;

        if (currentLocation === numOfPapers-1) {closeBook(false)}
        currentLocation++;
    }
}

function goPrevPage() {
    if(currentLocation > 0) {
        if (currentLocation === 1) {closeBook(true)}

        papers[currentLocation-1].classList.remove('flipped');
        papers[currentLocation-1].style.zIndex = numOfPapers-(currentLocation-1);

        if (currentLocation === numOfPapers) {openBook()}
        currentLocation--;
    }
}