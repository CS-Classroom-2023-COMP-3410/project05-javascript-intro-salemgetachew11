const appleContainer = document.getElementById('appleContainer');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const speedControl = document.getElementById('speedControl');
const algorithmSelector = document.getElementById('algorithmSelector');
let apples = [];

function generateApples() {
    appleContainer.innerHTML = '';
    apples = [];
    const colors = ['red', 'green', 'yellow', 'pink', 'orange']; // Different apple colors
    for (let i = 0; i < 30; i++) {
        let colorIndex = Math.floor(Math.random() * colors.length);
        let apple = document.createElement('img');
        apple.src = `images/apple-${colors[colorIndex]}.png`; // Ensure these images exist
        apple.classList.add('apple');
        appleContainer.appendChild(apple);
        apples.push(apple);
    }
}

function resetApples() {
    generateApples();
}

async function bubbleSort() {
    let n = apples.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            apples[j].style.border = '2px solid red';
            apples[j + 1].style.border = '2px solid red';
            await new Promise(resolve => setTimeout(resolve, 600 - speedControl.value));
            if (j % 2 === 0) { // Just a placeholder condition for demo
                let temp = apples[j].src;
                apples[j].src = apples[j + 1].src;
                apples[j + 1].src = temp;
            }
            apples[j].style.border = '';
            apples[j + 1].style.border = '';
        }
    }
}

function startSorting() {
    const algorithm = algorithmSelector.value;
    switch (algorithm) {
        case 'bubbleSort':
            bubbleSort();
            break;
        case 'quickSort':
            // Implement quickSort similarly
            break;
    }
}

resetBtn.addEventListener('click', resetApples);
startBtn.addEventListener('click', startSorting);
window.onload = resetApples;
