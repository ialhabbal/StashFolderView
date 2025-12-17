const breadcrumb = document.getElementById('breadcrumb');
let isDragging = false;
let b_startX, b_scrollLeft;

// on mouse down
breadcrumb.addEventListener('mousedown', (e) => {
    isDragging = true;
    b_startX = e.pageX - breadcrumb.offsetLeft;  // start X position
    b_scrollLeft = breadcrumb.scrollLeft;  // current scroll position
    breadcrumb.classList.add('dragging');  // change cursor style
});

// on mouse move
breadcrumb.addEventListener('mousemove', (e) => {
    if (!isDragging) return;  // ignore if not dragging
    const x = e.pageX - breadcrumb.offsetLeft;  // current mouse X
    const walk = (x - b_startX) * 2;  // compute drag distance
    breadcrumb.scrollLeft = b_scrollLeft - walk;  // update scroll
});

// on mouse up
breadcrumb.addEventListener('mouseup', () => {
    isDragging = false;
    breadcrumb.classList.remove('dragging');  // restore cursor
});

// on leave
breadcrumb.addEventListener('mouseleave', () => {
    isDragging = false;
    breadcrumb.classList.remove('dragging');  // restore cursor
});