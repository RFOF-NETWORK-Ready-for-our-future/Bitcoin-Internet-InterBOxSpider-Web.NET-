JavaScript

/*
 * Schablone für die Menü-Funktionalität.
 * Dieses Skript steuert das responsive Verhalten des Hamburger-Menüs.
 */
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navList = document.getElementById('navLinks');

    // Toggle-Funktionalität für das mobile Menü
    if (hamburger && navList) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            navList.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Schließt das Menü, wenn außerhalb geklickt wird
    document.addEventListener('click', (event) => {
        if (navList.classList.contains('active')) {
            if (!navList.contains(event.target) && !hamburger.contains(event.target)) {
                navList.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});
