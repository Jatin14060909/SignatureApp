document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');

    // Your signature pad code
    var canvas = document.getElementById('signature-pad');
    var ctx = canvas.getContext('2d');

    // Set initial properties
    var penColor = '#000000';
    var backgroundColor = '#ffffff';
    var penThickness = 2;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Function to clear the canvas
    function clearCanvas() {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Initialize canvas
    clearCanvas();

    // Event listeners
    document.getElementById('clear-btn').addEventListener('click', function () {
        clearCanvas();
    });

    document.getElementById('download-btn').addEventListener('click', function () {
        var dataURL = canvas.toDataURL();
        var link = document.createElement("a");
        link.href = dataURL;
        link.download = "signature.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    document.getElementById('color-picker').addEventListener('change', function () {
        penColor = this.value;
    });

    document.getElementById('background-color-picker').addEventListener('change', function () {
        backgroundColor = this.value;
        clearCanvas();
    });

    document.getElementById('pen-thickness').addEventListener('input', function () {
        penThickness = parseInt(this.value, 10);
    });

    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('touchstart', startDrawTouch);

    canvas.addEventListener('mouseup', stopDraw);
    canvas.addEventListener('mouseleave', stopDraw);
    canvas.addEventListener('touchend', stopDrawTouch);

    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('touchmove', drawTouch);

    // Draw function
    function draw(e) {
        if (!e.buttons) return; // Exit if not mouse click
        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.strokeStyle = penColor;
        ctx.lineWidth = penThickness;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
    }

    function drawTouch(e) {
        e.preventDefault();
        var touch = e.touches[0];
        ctx.lineTo(touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop);
        ctx.strokeStyle = penColor;
        ctx.lineWidth = penThickness;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
    }

    function startDraw(e) {
        if (e.button !== 0) return; // Exit if not left mouse button
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        canvas.addEventListener('mousemove', draw);
    }

    function startDrawTouch(e) {
        var touch = e.touches[0];
        ctx.beginPath();
        ctx.moveTo(touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop);
        canvas.addEventListener('touchmove', drawTouch);
    }

    function stopDraw() {
        canvas.removeEventListener('mousemove', draw);
    }

    function stopDrawTouch() {
        canvas.removeEventListener('touchmove', drawTouch);
    }
}
