// Wii-style warning screen for small resolutions
document.addEventListener('DOMContentLoaded', () => {
    const MIN_WIDTH = 1526;
    const MIN_HEIGHT = 948;

    function checkResolution() {
        if (window.innerWidth < MIN_WIDTH || window.innerHeight < MIN_HEIGHT) {
            showWarning();
        }
    }

    function showWarning() {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.id = 'wii-warning-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #000;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: Arial, sans-serif;
        `;

        // Create warning container
        const container = document.createElement('div');
        container.style.cssText = `
            text-align: center;
            color: #fff;
            max-width: 600px;
            padding: 40px;
        `;

        // Warning header with triangle
        const header = document.createElement('div');
        header.style.cssText = `
            font-size: 32px;
            font-weight: bold;
            margin-bottom: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
        `;

        // Yellow triangle
        const triangle = document.createElement('div');
        triangle.style.cssText = `
            width: 0;
            height: 0;
            border-left: 30px solid transparent;
            border-right: 30px solid transparent;
            border-bottom: 52px solid #ffff00;
            flex-shrink: 0;
        `;
        header.appendChild(triangle);

        const headerText = document.createElement('div');
        headerText.textContent = 'WARNING-SCREEN RESOLUTION';
        headerText.style.cssText = `
            color: #ffff00;
            font-weight: bold;
        `;
        header.appendChild(headerText);
        container.appendChild(header);

        // Main warning text
        const mainText = document.createElement('div');
        mainText.style.cssText = `
            font-size: 20px;
            line-height: 1.6;
            margin-bottom: 50px;
            font-weight: bold;
            letter-spacing: 1px;
        `;
        mainText.textContent = 'SINCE I\'M TOO STUPID TO FIGURE OUT HOW TO MAKE THE COOL BG ELEMENTS NOT LOOK WEIRD ON SMALLER DEVICES, PLEASE GO INTO LANDSCAPE MODE (or find a PC) TO CONTINUE';
        container.appendChild(mainText);

        // Online text
        const onlineText = document.createElement('div');
        onlineText.style.cssText = `
            font-size: 16px;
            margin-bottom: 30px;
        `;
        onlineText.innerHTML = 'Also online at<br><span style="color: #00ccff; text-decoration: underline;">www.cybuds.com/thisisntareallink</span>';
        container.appendChild(onlineText);

        // Press enter instruction
        const instructionText = document.createElement('div');
        instructionText.style.cssText = `
            font-size: 18px;
            margin-top: 60px;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            flex-wrap: wrap;
        `;
        instructionText.innerHTML = 'Press <span id="enter-key" style="display: inline-flex; align-items: center; justify-content: center; width: 45px; height: 45px; border: 3px solid #fff; border-radius: 8px; font-weight: bold; font-size: 14px; background: #333;">⏎</span> to continue.';
        container.appendChild(instructionText);

        overlay.appendChild(container);
        document.body.appendChild(overlay);

        // Event listeners
        function dismissWarning() {
            overlay.remove();
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                dismissWarning();
            }
        });

        overlay.addEventListener('click', dismissWarning);
    }

    checkResolution();
    window.addEventListener('resize', checkResolution);
});