// Toggle read/unread state
function toggleReadStatus(folderId) {
    // Get checkmark icon element
    const icon = document.getElementById(`check-icon-${folderId}-icon`);

    // Get current icon state (read status)
    const currentReadStatus = icon.classList.contains('fas') ? 1 : 0;

    // If currently read, clicking will mark as unread
    if (currentReadStatus === 1) {
        // switch to unread state
        icon.classList.remove('fas', 'fa-check-square');  // remove read icon
        icon.classList.add('far', 'fa-check-square');     // add unread icon
        icon.style.color = 'white';
        // update DB status to unread
        updateReadStatus(folderId, 0);
    } else {
        // If currently unread, clicking will mark as read
        icon.classList.remove('far', 'fa-check-square');  // remove unread icon
        icon.classList.add('fas', 'fa-check-square');     // add read icon
        icon.style.color = 'lightgray';
        // update DB status to read
        updateReadStatus(folderId, 1);
    }
}

// update read status in DB
function updateReadStatus(folderId, readStatus) {
    fetch('/update_read_status', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ folder_id: folderId, read_status: readStatus })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Read status updated successfully');
        }
    })
    .catch(error => {
        console.error('Update failed', error);
    });
}
