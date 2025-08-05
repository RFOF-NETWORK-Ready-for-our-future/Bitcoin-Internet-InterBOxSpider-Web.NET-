//
// assets/js/main.js
//
// Custom JavaScript for the #BitcoinInternet public website.
// Enhances interactivity and dynamic content.
//
// --- PRAIAI Axiomatic Design Principles Applied ---
// This JavaScript aims for:
// - Performance and Responsiveness (PZQQET-AXIOM-P1: Speed)
// - User Experience Enhancement (PZQQET-AXIOM-U2: Intuitive Interaction)
// - Modularity and Maintainability

console.log("PRAIAI Protocol: #BitcoinInternet Frontend Initiated.");

document.addEventListener('DOMContentLoaded', () => {
    // --- Hero Section Motto Click Interaction ---
    const mottoElement = document.getElementById('bitcoin-internet-motto');
    if (mottoElement) {
        mottoElement.addEventListener('click', () => {
            // Simple alert, could be replaced with a more elaborate modal or animation
            alert('Axiomatic Integrity, Quantum Leap! - Powered by PRAIAI');
            console.log('User interacted with motto: Axiomatic Integrity, Quantum Leap!');
        });
    }

    // --- Dynamic System Status Display (Placeholder for future API calls) ---
    // This function would fetch data from the public status endpoints (api_gateway_public_status.rs, system_status_endpoint.rs)
    async function updateSystemStatus() {
        const statusDisplayElement = document.getElementById('system-status-display');
        if (!statusDisplayElement) return;

        try {
            // Placeholder: In a real scenario, fetch from actual public endpoints
            const response = await fetch('/status/public'); // Or use the URL from global_config_public.toml
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            // Render status (example)
            statusDisplayElement.innerHTML = `
                <p><strong>Overall Status:</strong> <span style="color: ${data.overall_status === 'Operational' ? '#00FF00' : '#FF0000'};">${data.overall_status}</span></p>
                <p><strong>Network Health:</strong> ${data.network_health}</p>
                <p><strong>PRAIAI Status:</strong> ${data.praiai_status}</p>
                <p><strong>Last Updated (UTC):</strong> ${data.last_updated_utc}</p>
                ${data.public_message ? `<p><em>"${data.public_message}"</em></p>` : ''}
            `;
            console.log('System status updated.', data);

        } catch (error) {
            console.error('Failed to fetch system status:', error);
            statusDisplayElement.innerHTML = `<p style="color: #FF0000;">System status unavailable. Please try again later.</p>`;
        }
    }

    // Call status update on page load and periodically
    updateSystemStatus();
    // setInterval(updateSystemStatus, 60000); // Update every minute (adjust as needed)

    // --- Smooth Scrolling for Internal Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add more interactive features here as needed for the project's visual and functional goals.
    // Examples:
    // - Parallax scrolling effects
    // - Dynamic content loading for sections
    // - Small interactive 3D elements (if a lightweight JS 3D library is included)
    // - Integration with GitHub API for displaying latest commits or contributors (public data only)
});
