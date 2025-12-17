function toggle_network_status(folder_id) {
    const icon = document.getElementById(`network-toggle`);
    // Get current icon state
    const currentNetworkStatus = icon.classList.contains('fas') ? 0 : 1;
    console.log(currentNetworkStatus)
    console.log(icon.classList)
    if (currentNetworkStatus === 0) {
        icon.classList.remove('fas', 'fa-desktop');
        icon.classList.add('fa', 'fa-globe');
        updateNetworkStatus(1);
        window.location.href = '/folders?id=' + folder_id ;
    } else {
        // If currently unliked, clicking will like
        icon.classList.remove('fa', 'fa-globe');
        icon.classList.add('fas', 'fa-desktop');
        updateNetworkStatus(0);
        window.location.href = '/folders?id=' + folder_id ;
    }
}

// update like status in DB
function updateNetworkStatus(networkStatus) {
    fetch('/update_network_status', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ network_status: networkStatus })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Network status updated successfully');
        }
    })
    .catch(error => {
        console.error('更新失败', error);
    });
}
