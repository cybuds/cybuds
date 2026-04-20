// Prop positioning tool
document.addEventListener('DOMContentLoaded', () => {
    // Prop configurations with editable positions
    let props = [
        { name: 'Paper 1', src: 'paper.png', top: -80, left: -60, width: 500, height: 500, rotation: 0 },
        { name: 'Paper 2', src: 'paper.png', top: -40, right: -100, width: 550, height: 550, rotation: 0 },
        { name: 'Paperclip 1', src: 'paperclip.png', bottom: -120, left: -80, width: 480, height: 480, rotation: 0 },
        { name: 'Paperclip 2', src: 'paperclip2.png', bottom: -100, right: -60, width: 520, height: 520, rotation: 0 }
    ];

    // Create control panel
    const panel = document.createElement('div');
    panel.id = 'prop-control-panel';
    panel.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.9);
        border: 2px solid #fff;
        padding: 20px;
        border-radius: 8px;
        z-index: 9999;
        max-height: 80vh;
        overflow-y: auto;
        font-family: monospace;
        color: #0f0;
        width: 400px;
        max-width: 90vw;
    `;

    const title = document.createElement('div');
    title.style.cssText = 'font-size: 16px; font-weight: bold; margin-bottom: 15px; color: #0f0;';
    title.textContent = 'PROP POSITIONING TOOL';
    panel.appendChild(title);

    // Create controls for each prop
    props.forEach((prop, i) => {
        const propSection = document.createElement('div');
        propSection.style.cssText = `
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid #0f0;
        `;

        const propTitle = document.createElement('div');
        propTitle.style.cssText = 'font-weight: bold; margin-bottom: 8px; color: #0f0;';
        propTitle.textContent = `${prop.name} (${prop.src})`;
        propSection.appendChild(propTitle);

        // Top position
        if ('top' in prop) {
            const label = document.createElement('div');
            label.textContent = `top: ${prop.top}px`;
            label.style.marginBottom = '3px';
            propSection.appendChild(label);

            const slider = document.createElement('input');
            slider.type = 'range';
            slider.min = '-500';
            slider.max = '1000';
            slider.value = prop.top;
            slider.style.width = '100%';
            slider.addEventListener('input', (e) => {
                prop.top = parseInt(e.target.value);
                label.textContent = `top: ${prop.top}px`;
                updateDisplay();
            });
            propSection.appendChild(slider);
        }

        // Bottom position
        if ('bottom' in prop) {
            const label = document.createElement('div');
            label.textContent = `bottom: ${prop.bottom}px`;
            label.style.marginBottom = '3px';
            propSection.appendChild(label);

            const slider = document.createElement('input');
            slider.type = 'range';
            slider.min = '-500';
            slider.max = '1000';
            slider.value = prop.bottom;
            slider.style.width = '100%';
            slider.addEventListener('input', (e) => {
                prop.bottom = parseInt(e.target.value);
                label.textContent = `bottom: ${prop.bottom}px`;
                updateDisplay();
            });
            propSection.appendChild(slider);
        }

        // Left position
        if ('left' in prop) {
            const label = document.createElement('div');
            label.textContent = `left: ${prop.left}px`;
            label.style.marginBottom = '3px';
            propSection.appendChild(label);

            const slider = document.createElement('input');
            slider.type = 'range';
            slider.min = '-500';
            slider.max = '1000';
            slider.value = prop.left;
            slider.style.width = '100%';
            slider.addEventListener('input', (e) => {
                prop.left = parseInt(e.target.value);
                label.textContent = `left: ${prop.left}px`;
                updateDisplay();
            });
            propSection.appendChild(slider);
        }

        // Right position
        if ('right' in prop) {
            const label = document.createElement('div');
            label.textContent = `right: ${prop.right}px`;
            label.style.marginBottom = '3px';
            propSection.appendChild(label);

            const slider = document.createElement('input');
            slider.type = 'range';
            slider.min = '-500';
            slider.max = '1000';
            slider.value = prop.right;
            slider.style.width = '100%';
            slider.addEventListener('input', (e) => {
                prop.right = parseInt(e.target.value);
                label.textContent = `right: ${prop.right}px`;
                updateDisplay();
            });
            propSection.appendChild(slider);
        }

        // Width
        const widthLabel = document.createElement('div');
        widthLabel.textContent = `width: ${prop.width}px`;
        widthLabel.style.marginBottom = '3px';
        widthLabel.style.marginTop = '8px';
        propSection.appendChild(widthLabel);

        const widthSlider = document.createElement('input');
        widthSlider.type = 'range';
        widthSlider.min = '100';
        widthSlider.max = '800';
        widthSlider.value = prop.width;
        widthSlider.style.width = '100%';
        widthSlider.addEventListener('input', (e) => {
            prop.width = parseInt(e.target.value);
            widthLabel.textContent = `width: ${prop.width}px`;
            updateDisplay();
        });
        propSection.appendChild(widthSlider);

        // Height
        const heightLabel = document.createElement('div');
        heightLabel.textContent = `height: ${prop.height}px`;
        heightLabel.style.marginBottom = '3px';
        heightLabel.style.marginTop = '8px';
        propSection.appendChild(heightLabel);

        const heightSlider = document.createElement('input');
        heightSlider.type = 'range';
        heightSlider.min = '100';
        heightSlider.max = '800';
        heightSlider.value = prop.height;
        heightSlider.style.width = '100%';
        heightSlider.addEventListener('input', (e) => {
            prop.height = parseInt(e.target.value);
            heightLabel.textContent = `height: ${prop.height}px`;
            updateDisplay();
        });
        propSection.appendChild(heightSlider);

        // Rotation
        const rotationLabel = document.createElement('div');
        rotationLabel.textContent = `rotation: ${prop.rotation}°`;
        rotationLabel.style.marginBottom = '3px';
        rotationLabel.style.marginTop = '8px';
        propSection.appendChild(rotationLabel);

        const rotationSlider = document.createElement('input');
        rotationSlider.type = 'range';
        rotationSlider.min = '-360';
        rotationSlider.max = '360';
        rotationSlider.value = prop.rotation;
        rotationSlider.style.width = '100%';
        rotationSlider.addEventListener('input', (e) => {
            prop.rotation = parseInt(e.target.value);
            rotationLabel.textContent = `rotation: ${prop.rotation}°`;
            updateDisplay();
        });
        propSection.appendChild(rotationSlider);

        panel.appendChild(propSection);
    });

    // Export button
    const exportBtn = document.createElement('button');
    exportBtn.textContent = 'COPY HTML CODE';
    exportBtn.style.cssText = `
        width: 100%;
        padding: 10px;
        margin-top: 15px;
        background: #0f0;
        color: #000;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 4px;
        font-family: monospace;
    `;
    exportBtn.addEventListener('click', copyCode);
    panel.appendChild(exportBtn);

    document.body.appendChild(panel);

    function updateDisplay() {
        // Update prop elements
        props.forEach((prop, i) => {
            const elem = document.querySelector(`[data-prop-index="${i}"]`);
            if (elem) {
                let posCSS = '';
                if ('top' in prop) posCSS += `top: ${prop.top}px; `;
                if ('bottom' in prop) posCSS += `bottom: ${prop.bottom}px; `;
                if ('left' in prop) posCSS += `left: ${prop.left}px; `;
                if ('right' in prop) posCSS += `right: ${prop.right}px; `;
                
                elem.style.cssText = `position: fixed; ${posCSS}width: ${prop.width}px; height: ${prop.height}px; z-index: 0; pointer-events: none; filter: drop-shadow(-14px -14px 0 rgba(0,0,0,0.47)); transform: rotate(${prop.rotation}deg);`;
            }
        });
    }

    function copyCode() {
        let html = '';
        props.forEach((prop) => {
            let posCSS = '';
            if ('top' in prop) posCSS += `top: ${prop.top}px; `;
            if ('bottom' in prop) posCSS += `bottom: ${prop.bottom}px; `;
            if ('left' in prop) posCSS += `left: ${prop.left}px; `;
            if ('right' in prop) posCSS += `right: ${prop.right}px; `;

            html += `    <div style="position: fixed; ${posCSS}width: ${prop.width}px; height: ${prop.height}px; z-index: 0; pointer-events: none; filter: drop-shadow(-14px -14px 0 rgba(0,0,0,0.47)); transform: rotate(${prop.rotation}deg);">\n`;
            html += `        <img src="images/bg-props/${prop.src}" style="width: 100%; height: 100%; object-fit: contain;">\n`;
            html += `    </div>\n\n`;
        });

        navigator.clipboard.writeText(html).then(() => {
            exportBtn.textContent = '✓ COPIED!';
            setTimeout(() => {
                exportBtn.textContent = 'COPY HTML CODE';
            }, 2000);
        });
    }

    // Create prop elements with data attributes
    props.forEach((prop, i) => {
        let posCSS = '';
        if ('top' in prop) posCSS += `top: ${prop.top}px; `;
        if ('bottom' in prop) posCSS += `bottom: ${prop.bottom}px; `;
        if ('left' in prop) posCSS += `left: ${prop.left}px; `;
        if ('right' in prop) posCSS += `right: ${prop.right}px; `;

        const div = document.createElement('div');
        div.setAttribute('data-prop-index', i);
        div.style.cssText = `position: fixed; ${posCSS}width: ${prop.width}px; height: ${prop.height}px; z-index: 0; pointer-events: none; filter: drop-shadow(-14px -14px 0 rgba(0,0,0,0.47)); transform: rotate(${prop.rotation}deg);`;

        const img = document.createElement('img');
        img.src = `images/bg-props/${prop.src}`;
        img.style.cssText = 'width: 100%; height: 100%; object-fit: contain;';

        div.appendChild(img);
        document.body.appendChild(div);
    });
});