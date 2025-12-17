function toggleDelete(folderId) {
    // Get trash icon element
    const icon = document.getElementById(`delete-icon-${folderId}-icon`);

    // Get current delete icon state
    const currentDeleteStatus = icon.getAttribute('datatype') === '1' ? 1 : 0;

    // If currently not deleted, clicking will mark as deleted
    if (currentDeleteStatus === 0) {
        icon.style.color = 'black';  // 设置为红色表示已删除
        icon.setAttribute('datatype', '1'); // 更新状态为已删除
        // 更新数据库状态为已删除
        updateDeleteStatus(folderId, 1);
    } else {
        icon.style.color = 'white';  // 设置为灰色表示未删除
        icon.setAttribute('datatype', '0'); // 更新状态为未删除
        // 更新数据库状态为未删除
        updateDeleteStatus(folderId, 0);
    }
}

// 更新数据库中的 delete 状态
function updateDeleteStatus(folderId, deleteStatus) {
    fetch('/update_delete_status', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ folder_id: folderId, delete_status: deleteStatus })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('删除状态更新成功');
        }
    })
    .catch(error => {
        console.error('更新失败', error);
    });
}
