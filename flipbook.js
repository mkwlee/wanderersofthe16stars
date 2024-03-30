// References to DOM Elements
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.getElementById("#book");

// const paper1 = document.querySelector("#p1");
// const paper2 = document.querySelector("#p2");
// const paper3 = document.querySelector("#p3");

var papers = [];
for (var p = 0; p < NumofPages; p++) {
    papers[p] = document.getElementById('#p'+p);
}
console.log(papers)

// Event Listener
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

// Business Logic
let currentLocation = 0;
let numOfPapers = NumofPages;

function openBook() {
    book.style.transform = "translateX(50%)";
    prevBtn.style.transform = "translateX(-32.6923076923vh)";
    nextBtn.style.transform = "translateX(32.6923076923vh)";
}

function closeBook(isAtBeginning) {
    if(isAtBeginning) {
        book.style.transform = "translateX(0%)";
    } else {
        book.style.transform = "translateX(100%)";
    }

    prevBtn.style.transform = "translateX(0vh)";
    nextBtn.style.transform = "translateX(0vh)";
}

function goNextPage() {
    if(currentLocation < numOfPapers) {
        if (currentLocation === 0) {openBook()}
        papers[currentLocation].classList.add("flipped");
        papers[currentLocation].style.zIndex = currentLocation;

        if (currentLocation === numOfPapers-1) {closeBook(false)}
        // console.log('Next to page ' + currentLocation)
        currentLocation++;
    }
}

function goPrevPage() {
    if(currentLocation > 0) {
        if (currentLocation === 1) {closeBook(true)}

        papers[currentLocation-1].classList.remove("flipped");
        papers[currentLocation-1].style.zIndex = numOfPapers-(currentLocation-1);

        if (currentLocation === numOfPapers) {openBook()}
        // console.log('Back to page ' + currentLocation)
        currentLocation--;
    }
}