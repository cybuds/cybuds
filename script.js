// Update the year in the footer
document.getElementById('year').textContent = new Date().getFullYear();

// Hide the recent videos sidebar
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.recent-videos');
    if (sidebar) {
        sidebar.style.display = 'none';
    }
});
