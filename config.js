// API Configuration
// Change this to your Render.com URL after deployment
const API_CONFIG = {
    // For local testing: 'http://localhost:5000'
    // After deployment: 'https://your-app-name.onrender.com'
    BASE_URL: 'http://10.153.198.122:5000'
};

// Export for use in script.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = API_CONFIG;
}
