function toggleLike(folderId) {
    // Get heart icon element
    const icon = document.getElementById(`heart-icon-${folderId}`);

    // Get current icon state
    const currentLikeStatus = icon.classList.contains('fas') ? 1 : 0;

    // If currently liked, clicking will unlike
    if (currentLikeStatus === 1) {
        // switch to unliked state
        icon.classList.remove('fas', 'fa-heart');  // remove liked icon
        icon.classList.add('far', 'fa-heart');     // add unliked icon
        icon.style.color = 'white';                  // set to gray
        // update DB status to unliked
        updateLikeStatus(folderId, 0);
    } else {
        // If currently unliked, clicking will like
        icon.classList.remove('far', 'fa-heart');  // remove unliked icon
        icon.classList.add('fas', 'fa-heart');     // 添加已点赞图标
        icon.style.color = 'red';                   // 设置为红色
        // 更新数据库状态为已点赞
        updateLikeStatus(folderId, 1);
    }
}

// 更新数据库中的 like 状态
function updateLikeStatus(folderId, likeStatus) {
    fetch('/update_like_status', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ folder_id: folderId, like_status: likeStatus })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('点赞状态更新成功');
        }
    })
    .catch(error => {
        console.error('更新失败', error);
    });
}
