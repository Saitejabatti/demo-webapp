src/script.js << 'EOF'
document.addEventListener('DOMContentLoaded', function() {
    // Set current time as deployment time
    const now = new Date();
    document.getElementById('deployment-time').textContent = now.toLocaleString();
});
EOF
