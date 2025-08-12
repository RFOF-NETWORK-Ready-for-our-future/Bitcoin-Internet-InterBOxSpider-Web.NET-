JavaScript

/*
 * Schablone für das interaktive 3D-Logo
 *
 * Funktionalität:
 * - Eine große BOX "BOxchain" dreht sich nach links.
 * - Eine kleinere BOX "EXtention" umkreist sie und dreht sich nach rechts.
 * - Beide sind durch einen Neon-Strich verbunden.
 * - User-Interaktion: Berührung einer BOX und Bewegung des Fingers führt dazu,
 * dass sich die andere BOX in die entgegengesetzte Richtung bewegt.
 * - Nach dem Loslassen schwingen die BOXen kurz aus, bevor sie zur
 * Standard-Animation zurückkehren.
 *
 * Dies ist die Yggdrasil-Simulation für BOxchain-EXtentions.
 */
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('logo-canvas');
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 45 / 45, 0.1, 1000);
    camera.position.z = 2.5;

    // Licht
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 0, 5);
    scene.add(directionalLight);

    // Großer Würfel (BOxchain)
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const boxMaterial = new THREE.MeshPhongMaterial({ color: 0x0088cc });
    const boxchainBox = new THREE.Mesh(boxGeometry, boxMaterial);
    scene.add(boxchainBox);
    
    // Text auf der BOxchain-BOX
    const fontLoader = new THREE.FontLoader();
    fontLoader.load('https://raw.githubusercontent.com/RFOF-NETWORK/RFOF-NETWORK/main/assets/fonts/Orbitron_Bold.json', (font) => {
        const textGeometry = new THREE.TextGeometry('BOxchain', {
            font: font,
            size: 0.15,
            height: 0.05,
        });
        const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const boxchainText = new THREE.Mesh(textGeometry, textMaterial);
        boxchainText.position.set(-0.4, 0.4, 0.51);
        boxchainBox.add(boxchainText);
    });

    // Kleiner Würfel (EXtention)
    const smallBoxGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    const smallBoxMaterial = new THREE.MeshPhongMaterial({ color: 0xffa500 });
    const extentionBox = new THREE.Mesh(smallBoxGeometry, smallBoxMaterial);
    
    // Text auf der EXtention-BOX
    fontLoader.load('https://raw.githubusercontent.com/RFOF-NETWORK/RFOF-NETWORK/main/assets/fonts/Orbitron_Bold.json', (font) => {
        const textGeometry = new THREE.TextGeometry('EXtention', {
            font: font,
            size: 0.05,
            height: 0.02,
        });
        const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const extentionText = new THREE.Mesh(textGeometry, textMaterial);
        extentionText.position.set(-0.12, 0.1, 0.16);
        extentionBox.add(extentionText);
    });
    
    scene.add(extentionBox);

    // Neon-Linie
    const points = [];
    points.push(boxchainBox.position);
    points.push(extentionBox.position);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0x00ffff, linewidth: 2 });
    const line = new THREE.Line(geometry, material);
    scene.add(line);

    // Positionierung der kleinen BOX
    const radius = 1.2;
    let angle = 0;
    
    // Animationsvariablen
    let isInteracting = false;
    let lastMouseX = 0;
    let interactionVelocity = 0;
    let animationVelocity = 0.005;

    // Maus- und Touch-Events
    function onInteractionStart(event) {
        isInteracting = true;
        lastMouseX = (event.touches ? event.touches[0].clientX : event.clientX) || lastMouseX;
    }
    
    function onInteractionMove(event) {
        if (!isInteracting) return;
        const clientX = (event.touches ? event.touches[0].clientX : event.clientX) || lastMouseX;
        const deltaX = clientX - lastMouseX;
        interactionVelocity = -deltaX * 0.001;
        lastMouseX = clientX;
    }

    function onInteractionEnd() {
        isInteracting = false;
        // Die Animation geht in die neue Richtung weiter, aber schwingt kurz aus
        animationVelocity = -interactionVelocity * 1.5;
        interactionVelocity = 0;
    }

    canvas.addEventListener('mousedown', onInteractionStart, false);
    canvas.addEventListener('mousemove', onInteractionMove, false);
    canvas.addEventListener('mouseup', onInteractionEnd, false);
    canvas.addEventListener('mouseleave', onInteractionEnd, false);

    canvas.addEventListener('touchstart', onInteractionStart, false);
    canvas.addEventListener('touchmove', onInteractionMove, false);
    canvas.addEventListener('touchend', onInteractionEnd, false);

    // @RFOF-NETWORK Signatur
    const sigElement = document.createElement('div');
    sigElement.textContent = '@RFOF-NETWORK BOx Erden Mond simulation for BOxchain-EXtentions';
    Object.assign(sigElement.style, {
        position: 'absolute', bottom: '5px', left: '5px', color: '#333', fontSize: '8px',
        fontFamily: 'Roboto, sans-serif'
    });
    document.body.appendChild(sigElement);

    // Animations-Loop
    function animate() {
        requestAnimationFrame(animate);

        // Langsame, linke Drehung des BOxchain-Würfels
        boxchainBox.rotation.y -= 0.002;

        // Bewegung des EXtention-Würfels
        if (isInteracting) {
            angle += interactionVelocity;
            boxchainBox.rotation.y += -interactionVelocity;
        } else {
            // Ausklingende Geschwindigkeit
            angle += animationVelocity;
            animationVelocity *= 0.98;
            if (Math.abs(animationVelocity) < 0.0001) { animationVelocity = 0.005; }
            extentionBox.rotation.y += 0.01;
        }
        
        extentionBox.position.x = Math.cos(angle) * radius;
        extentionBox.position.y = Math.sin(angle) * radius * 0.3; // Ellipsenförmige Bahn
        extentionBox.position.z = Math.sin(angle) * radius;
        extentionBox.rotation.y += 0.01; // Rechte Drehung

        // Linie aktualisieren
        line.geometry.setFromPoints([boxchainBox.position, extentionBox.position]);
        line.geometry.verticesNeedUpdate = true;

        renderer.render(scene, camera);
    }
    
    function onResize() {
        const parent = canvas.parentElement;
        const width = parent.clientWidth;
        const height = parent.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }
    
    window.addEventListener('resize', onResize);
    onResize();

    animate();
});
