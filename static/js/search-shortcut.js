// Global keyboard shortcut: Ctrl + / to navigate to search
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('keydown', function(event) {
        // Check for Ctrl + / (or Cmd + / on Mac)
        // The '/' key has keyCode 191, and can be typed as '?' with Shift
        if ((event.ctrlKey || event.metaKey) && (event.key === '/' || event.keyCode === 191)) {
            event.preventDefault();
            window.location.href = '/search/';
        }
    });
});
