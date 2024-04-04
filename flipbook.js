preload = 5;
const numOfPages = 226;
const numOfPapers = Math.ceil(numOfPages / 2);

let currentLocation = 0;
const book = document.createElement('div');
book.className = 'book';



let pages = [];
let papers = [];
for (let p = 0; p < numOfPages; p++) {
    if (p % 2 === 0) {
        pages[p] = document.createElement('div');
        pages[p].className = 'front';
        const frontContent = document.createElement('img');
        frontContent.className = 'front-content';
        if (p < preload) {
            frontContent.src = 'pages/' +'Wandererss'+(p+1)+'.png';
        }
        pages[p].appendChild(frontContent)
    } else {
        pages[p] = document.createElement('div');
        pages[p].className = 'back';
        const backContent = document.createElement('img');
        backContent.className = 'back-content';
        if (p < preload) {
            backContent.src = 'pages/' +'Wandererss'+(p+1)+'.png';
        }
        pages[p].appendChild(backContent)

        papers[(p-1)/2] = document.createElement('div');
        papers[(p-1)/2].className = 'paper';
        papers[(p-1)/2].id = '#p'+ Math.floor(p / 2)
        papers[(p-1)/2].style.zIndex = (numOfPapers - Math.floor(p / 2)).toString();
        papers[(p-1)/2].appendChild(pages[p-1]);
        papers[(p-1)/2].appendChild(pages[p]);
        book.appendChild(papers[(p-1)/2]);
    }
}
document.body.appendChild(book);

let images = [];
const imageSize = 0.4;
const numOfImages = 2;
const picBoxWidth = 40;
currentImageExpand = -1;
pictureBox = document.createElement('div');
pictureBox.style.opacity = '0.5';

dimOverlay = document.createElement('div');
dimOverlay.style.position = 'fixed';
dimOverlay.style.position = 'fixed';
dimOverlay.style.top = '0';
dimOverlay.style.right = '0';
dimOverlay.style.width = '200%';
dimOverlay.style.height = '100%';
dimOverlay.style.backgroundColor = 'rgba(0, 0, 0)';
dimOverlay.style.opacity = '0';
dimOverlay.style.transition = 'opacity 0.5s'
pages[16].appendChild(dimOverlay);

for (let i = 0; i < numOfImages; i++) {

    images[i] = document.createElement('img');
    images[i].src = 'images/image'+(i+1)+'.PNG';
    images[i].style.width = pages[16].offsetWidth*imageSize+'px';
    images[i].style.height = pages[16].offsetWidth*imageSize*( images[i].height/ images[i].width)+'px';
    images[i].style.position = 'absolute';
    images[i].style.zIndex = (i).toString();
    images[i].style.bottom = '0';
    images[i].style.right = (i*(picBoxWidth/numOfImages))+'%';
    images[i].style.transition = 'transform 0.5s';
    images[i].style.transformOrigin = 'right bottom';
    pictureBox.appendChild(images[i])

    images[i].addEventListener('mousedown', function() {
        if (currentImageExpand === -1) {
            pictureBox.removeChild(images[i]);
            pages[16].appendChild(images[i]);
            setTimeout(function() {
                console.log(Math.abs(50-(i*(picBoxWidth/numOfImages))));
                images[i].style.transform = 'scale(2) translate(-'+Math.abs(75-(i*(picBoxWidth/numOfImages)))+'%,' +
                    ' -50%)';
                dimOverlay.style.opacity = '0.7';
            }, 1);
            currentImageExpand = i;
        } else if(currentImageExpand === i) {
            pages[16].removeChild(images[i]);
            pictureBox.appendChild(images[i]);
            setTimeout(function() {
                images[i].style.transform = 'scale(1)';
                dimOverlay.style.opacity = '0';
            }, 1);
            currentImageExpand = -1;
        }
    });

    images[i].addEventListener('mouseenter', function() {
        if (currentImageExpand === -1) {
            images[i].style.transform = 'translate(0%, -10%)';
        }
    });
    images[i].addEventListener('mouseleave', function() {
        if (currentImageExpand === -1) {
            images[i].style.transform = 'translate(0%, 0%)';
        }
    });
    document.addEventListener('keydown', function(event) {

        if(event.key === 'Escape') {
            if(currentImageExpand === i) {
                pages[16].removeChild(images[i]);
                pictureBox.appendChild(images[i]);
                setTimeout(function() {
                    images[i].style.transform = 'scale(1)';
                    dimOverlay.style.opacity = '0';
                }, 1);
                currentImageExpand = -1;
            }
        }
    });
}
pages[16].appendChild(pictureBox);

function openBook() {
    book.style.transform = 'translateX(50%)';
}

function closeBook(isAtBeginning) {
    if(isAtBeginning) {
        book.style.transform = 'translateX(0%)';
    } else {
        book.style.transform = 'translateX(100%)';
    }
}

function goNextPage() {
    if(currentLocation < numOfPapers && currentImageExpand === -1) {
        if (currentLocation === 0) {openBook()}

        if (2*currentLocation+preload < numOfPages) {
            var page1 = pages[2 * currentLocation + preload].firstElementChild
            page1.src = 'pages/' + 'Wandererss' + (2 * currentLocation + preload + 1) + '.png';
        }
        if (2*currentLocation+preload+1 < numOfPages){
            var page2 = pages[2*currentLocation+preload+1].firstElementChild
            page2.src = 'pages/' +'Wandererss'+(2*currentLocation+preload+2)+'.png';
        }

        papers[currentLocation].classList.add('flipped');
        papers[currentLocation].style.zIndex = currentLocation;



        if (currentLocation === numOfPapers-1) {closeBook(false)}
        currentLocation++;
    }
}

function goPrevPage() {
    if(currentLocation > 0 && currentImageExpand === -1) {
        if (currentLocation === 1) {closeBook(true)}
        papers[currentLocation-1].classList.remove('flipped');
        papers[currentLocation-1].style.zIndex = numOfPapers-(currentLocation-1);
        if (currentLocation === numOfPapers) {openBook()}
        currentLocation--;
    }
}

let inputHistory = [];
const historyMax = 12;
const keys = ['torutum', 'pleasehelpme'];
document.addEventListener('keydown', function(event) {
    switch(event.key){
        case 'ArrowLeft':
            goPrevPage();
            break;
        case 'ArrowRight':
            goNextPage();
            break;
        default:
            inputHistory.push(event.key)
            break;
    }
    if (inputHistory.length > historyMax) {
        inputHistory.shift()
    }

    keys.forEach((element, index) => {
        if((inputHistory.slice(-element.length)).join('') === element) {
            switch(index) {
                case 0:
                    console.log('torutum')
                    const torutum = document.createElement('img');
                    torutum.src = 'images/image3.PNG';
                    torutum.style.position = 'fixed';
                    torutum.style.top = '0';
                    torutum.style.left = '0';
                    torutum.style.width = '100%';
                    torutum.style.height = '100%';
                    torutum.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                    torutum.style.zIndex = (numOfPapers+1).toString()
                    document.body.appendChild(torutum);
                    setTimeout(function() {
                        close();
                    }, 3000);
                    break;
                case 1:
                    const chaz = document.createElement('img');
                    chaz.src = 'images/image4.WEBP';
                    chaz.style.position = 'fixed';
                    chaz.style.top = '0';
                    chaz.style.left = '0';
                    chaz.style.width = '100%';
                    chaz.style.height = '100%';
                    chaz.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                    chaz.style.zIndex = (numOfPapers+1).toString()
                    document.body.appendChild(chaz);
                    break;
            }
        }
    });

});