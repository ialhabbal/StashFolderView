const folder_has_medias = document.getElementById('folder_has_medias').getAttribute('data-folder-id');

if (folder_has_medias === 'True'){
    const grid = document.querySelector('#masonry-grid');
    // Initialize Masonry
    const masonryInstance = new Masonry(grid, {
        itemSelector: '.grid-item',  // each item
        columnWidth: '.grid-item',    // width of each column
        // percentPosition: true,       // enable percentage-based widths
        gutter: 10,                  // spacing between items
        fitWidth: true,              // container width auto-fit
        isResizable: true,           // responsive adjustment
        horizontalOrder: false,       // order Masonry horizontally
    });

    // listen for each image load event
    const images = document.querySelectorAll('.grid-item img');
    images.forEach(function (img) {
        img.addEventListener('load', function () {
            // after image loads, display appropriate play icon
            var parentItem = img.closest('.grid-item');
            if (parentItem.classList.contains('video')) {
                parentItem.querySelector('.play-icon').style.display = 'block';
            }
            // after image loads, trigger Masonry layout
            masonryInstance.layout();  // recalculate Masonry layout
        });
    });

    // use imagesLoaded plugin to detect when images finish loading
    imagesLoaded(grid, function() {
        masonryInstance.layout();
    });
    window.addEventListener('resize', function() {
        masonryInstance.layout();
      });
}
