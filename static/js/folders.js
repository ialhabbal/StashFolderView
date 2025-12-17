// {#const go_folderId = document.getElementById('folder-icon').getAttribute('data-folder-id');#}

const toggleReadCheckbox = document.getElementById('toggleRead');
const selectVideoCheckbox = document.getElementById('select-video');
const folderList = document.getElementById('folderList');

function updateFolderVisibility() {
    // Get all folder items
    const folders = folderList.getElementsByClassName('folder');

    for (let folder of folders) {
        const folderRead = folder.getAttribute('data-folder-read');
        const folderRelativePath = folder.getAttribute('data-folder-relative-path');

        // Determine checkbox state and folder visibility
            if (toggleReadCheckbox.checked === false) {
                // If toggle is off, show all folders
            folder.style.display = 'block';
        } else {
                // If toggle is on, hide read folders except the 'Up' entry
                if (folderRelativePath !== 'Up' && folderRead === '1') {
                folder.style.display = 'none';
            } else {
                folder.style.display = 'block';
            }
        }
    }
}

// Listen for checkbox state changes
selectVideoCheckbox.addEventListener('change', function (){
    localStorage.setItem('newWindowCheckbox', selectVideoCheckbox.checked);
});

toggleReadCheckbox.addEventListener('change', function (){
    updateFolderVisibility();
    localStorage.setItem('toggleReadState', toggleReadCheckbox.checked);

});


window.onload = function() {
    // Check if a saved state exists in localStorage
    const savedState1 = localStorage.getItem('toggleReadState');
    const savedState2 = localStorage.getItem('newWindowCheckbox');
    const storedFolderId = localStorage.getItem('folder_id');
    if (savedState1 !== null && savedState2 !== null) {
        toggleReadCheckbox.checked = (savedState1 === 'true');
        selectVideoCheckbox.checked = (savedState2 === 'true');
        updateFolderVisibility();
    }
    if (storedFolderId) {
        // console.log(storedFolderId)
        // get the corresponding element
        var element = document.getElementById(storedFolderId);
        var folder_icon = document.getElementById("icon-" + storedFolderId);
        // console.log(folder_icon)
        if (element && folder_icon){
            var folderRelativePath = element.getAttribute("data-folder-relative-path");

            // console.log(folder_icon.getAttribute("data-folder-id"))
            var folder_bar = element.querySelector(".folder-bar")
            var folder_icon_item = folder_icon.querySelector('i')
            // console.log(folder_icon_item)
            if (folderRelativePath !== 'Up') {
                // scroll to that element
                // console.log("locating")
                element.scrollIntoView({ behavior: "smooth", block: "center" });
                folder_icon_item.scrollIntoView({ behavior: "smooth", block: "center" });
                folder_bar.style.backgroundColor = '#c86b85'
                folder_icon_item.style.color = '#c86b85'
            }
        }

    }
    localStorage.setItem('folder_id', folder_id);
};