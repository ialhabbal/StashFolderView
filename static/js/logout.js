function logout() {
    fetch('/logout', {
        method: 'GET',
        credentials: 'same-origin' // ensure current session info is sent with the request
    })
    .then(response => {
        if (response.ok) {
            window.location.href = '/'; // redirect to login page
        } else {
            alert('Logout failed, please try again later');
        }
    })
    .catch(error => {
        console.error('退出时发生错误:', error);
        alert('退出失败，请稍后再试');
    });
}