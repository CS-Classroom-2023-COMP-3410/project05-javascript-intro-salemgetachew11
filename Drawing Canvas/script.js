document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const brushSizeControl = document.getElementById('brush-size');
    const brushColorControl = document.getElementById('brush-color');
    const canvasColorControl = document.getElementById('canvas-color');
    const movesDisplay = document.getElementById('moves');
    const timeDisplay = document.getElementById('time');

    canvas.width = window.innerWidth - 100;
    canvas.height = 500;

    let painting = false;
    let brushSize = brushSizeControl.value;
    let brushColor = brushColorControl.value;
    let canvasColor = canvasColorControl.value;
    let undoStack = [];

    ctx.fillStyle = canvasColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    function startPosition(e) {
        painting = true;
        draw(e); // Start drawing immediately on click, not just on move
    }

    function finishedPosition() {
        painting = false;
        ctx.beginPath();
        undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    }

    function draw(e) {
        if (!painting) return;
        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';
        ctx.strokeStyle = brushColor;

        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    }

    function undo() {
        if (undoStack.length > 0) {
            ctx.putImageData(undoStack.pop(), 0, 0);
        }
    }

    function clearCanvas() {
        ctx.fillStyle = canvasColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        undoStack = []; // Clear undo stack when canvas is cleared
    }

    function saveCanvas() {
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'my-cute-drawing.png';
        link.href = dataURL;
        link.click();
    }

    // Event listeners for tool controls
    brushSizeControl.addEventListener('change', (e) => {
        brushSize = e.target.value;
    });

    brushColorControl.addEventListener('change', (e) => {
        brushColor = e.target.value;
    });

    canvasColorControl.addEventListener('change', (e) => {
        canvasColor = e.target.value;
        clearCanvas(); // Update the canvas background color
    });

    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', finishedPosition);
    canvas.addEventListener('mousemove', draw);
    document.querySelector('button[onclick="undo()"]').addEventListener('click', undo);
    document.querySelector('button[onclick="clearCanvas()"]').addEventListener('click', clearCanvas);
    document.querySelector('button[onclick="saveCanvas()"]').addEventListener('click', saveCanvas);
});
