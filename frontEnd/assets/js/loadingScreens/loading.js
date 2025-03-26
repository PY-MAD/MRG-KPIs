const showLoader = () => {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.remove('hidden');
        loader.style.opacity = '1';
    }
};
function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => loader.remove(), 300);
    }
  }

// Hide loader after page loads
window.addEventListener('load', hideLoader);
window.addEventListener('pageshow', hideLoader); 

// Show loader when link is clicked
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#') && !href.startsWith('javascript:')) {
                showLoader();
            }
        });
    });

    // Show loader on form submit
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', () => {
            showLoader();
        });
    });

    // Optional: Show loader on button clicks
    document.querySelectorAll('button[type="submit"], .show-loader').forEach(btn => {
        btn.addEventListener('click', () => {
            showLoader();
        });
    });
});