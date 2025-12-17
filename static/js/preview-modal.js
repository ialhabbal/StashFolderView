// script.js
let currentImageIndex = 0;
let scale = 1;
// drag-related variables
let isLongPress = false;
let startX, startY;
let offsetX = 0, offsetY = 0;
let img_offsetX = 0, img_offsetY = 0;
let pressTimer;
let lastTouchTime = 0;

const previewImage = document.getElementById('preview-image');
const modal = document.getElementById('preview-modal');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const imageCount = document.getElementById('image-count');

function openPreview(index0, is_video){
    currentImageIndex = index0;
    if (is_video === 'False'){
        // console.log("image_click")
        previewImage.src = links[currentImageIndex];
        modal.style.display = 'flex';
        scale = 1;
        previewImage.style.transform = `scale(${scale})`;
        imageCount.textContent = `${currentImageIndex + 1} / ${links.length}`;
    }else {
        window.open(links[currentImageIndex], '_blank');
    }
}
// close preview modal
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    img_offsetX = 0;
    img_offsetY = 0;
    scale = 1;
});

// previous image
prevBtn.addEventListener('click', () => {
    do {
        currentImageIndex = (currentImageIndex - 1 + links.length) % links.length;
        } while (!links[currentImageIndex].includes('big_image'));

        // once a valid image is found, update preview
        previewImage.src = links[currentImageIndex];
        scale = 1;
        previewImage.style.transform = `scale(${scale})`;
        imageCount.textContent = `${currentImageIndex + 1} / ${links.length}`;
});

// next image
nextBtn.addEventListener('click', () => {
    do {
        currentImageIndex = (currentImageIndex + 1) % links.length;
        } while (!links[currentImageIndex].includes('big_image'));

        // once a valid image is found, update preview
        previewImage.src = links[currentImageIndex];
        scale = 1;
        previewImage.style.transform = `scale(${scale})`;
        imageCount.textContent = `${currentImageIndex + 1} / ${links.length}`;
});

previewImage.addEventListener('dblclick', (e) => {

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    if (scale < 9) {
        // zoom in
        // console.log("offset1", img_offsetX, img_offsetY)
        offsetX = (centerX - e.clientX) / scale;
        offsetY = (centerY - e.clientY) / scale;
        scale *= 3;

        img_offsetX += offsetX
        img_offsetY += offsetY
        // console.log("offset", img_offsetX, img_offsetY)
        previewImage.style.transition = 'transform 0.3s ease';
        previewImage.style.transform = `scale(${scale}) translate(${img_offsetX}px, ${img_offsetY}px)`;
    } else {
        // zoom out
        scale = 1
        img_offsetX = 0
        img_offsetY = 0
        previewImage.style.transition = 'transform 0.3s ease';
        previewImage.style.transform = `scale(${scale}) translate(${img_offsetX}px, ${img_offsetY}px)`;
    }

});

// listen for mouse wheel zoom
previewImage.addEventListener('wheel', (e) => {
    // Do not zoom unless Ctrl key is held
    if (!e.ctrlKey) {
        return;
    }

    e.preventDefault(); // prevent page scroll

    if (e.deltaY < 0) {
        // wheel up: zoom in
        scale *= 1.1;
    } else {
        // wheel down: zoom out
        scale /= 1.1;
    }

    // clamp scale
    scale = Math.max(1, Math.min(scale, 5));

    // update transform
    previewImage.style.transition = 'transform 0.3s ease';
    previewImage.style.transform = `scale(${scale})`;
});


previewImage.addEventListener('mousedown', (e) => {
    // prevent default image drag
    e.preventDefault();

    startX = e.clientX;
    startY = e.clientY;

    // set a timer to detect long press
    pressTimer = setTimeout(() => {
        isLongPress = true;
        // previewImage.style.cursor = 'grabbing'; // change to grabbing cursor
    }, 100);  // 500ms is considered a long press; adjust as needed

});

// drag image while mouse moves
previewImage.addEventListener('mousemove', (e) => {
    if (isLongPress) {
        // compute mouse delta
        let deltaX = e.clientX - startX;
        let deltaY = e.clientY - startY;
        // adjust by scale to avoid large jumps
        img_offsetX += deltaX / scale;
        img_offsetY += deltaY / scale;

        // update last positions to avoid accumulation error
        startX = e.clientX;
        startY = e.clientY;
        previewImage.style.transition = 'none';
        previewImage.style.transform = `scale(${scale}) translate(${img_offsetX}px, ${img_offsetY}px)`;

    }
});

previewImage.addEventListener('touchmove', function(e) {
    if (e.touches.length === 1) {
        // calculate touch movement
        const moveX = e.touches[0].clientX - startX;
        const moveY = e.touches[0].clientY - startY;

        // update offsets
        img_offsetX += moveX / scale;
        img_offsetY += moveY / scale;

        startX = e.touches[0].clientX
        startY = e.touches[0].clientY

        // update image position
        previewImage.style.transition = 'none';
        previewImage.style.transform = `scale(${scale}) translate(${img_offsetX}px, ${img_offsetY}px)`;

        // prevent default touch scrolling
        e.preventDefault();
    }
});

// stop dragging on mouse up
previewImage.addEventListener('mouseup', () => {
    // clear timer
    clearTimeout(pressTimer);
    isLongPress = false;
});

previewImage.addEventListener('mouseleave', () => {
    // 清除定时器
    clearTimeout(pressTimer);
    isLongPress = false;
});


previewImage.addEventListener('touchstart', function(e) {
    // record touch start position
    if (e.touches.length === 1) {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }
});

previewImage.addEventListener('touchend', function(e) {
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - lastTouchTime;

    if (timeDifference < 500 && timeDifference > 0) {
        if(e.touches && e.touches.length > 0){
            // treat as double-tap when interval < 500ms
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            if (scale < 10) {
                // scroll up: zoom in
                // console.log("offset1", img_offsetX, img_offsetY)
                offsetX = (centerX - e.touches[0].clientX);
                offsetY = (centerY - e.touches[0].clientY);
                scale *= 3;

                img_offsetX += offsetX
                img_offsetY += offsetY
                // console.log("offset", img_offsetX, img_offsetY)
                previewImage.style.transition = 'transform 0.3s ease';
                previewImage.style.transform = `scale(${scale}) translate(${img_offsetX}px, ${img_offsetY}px)`;
            } else {
                // scroll down: zoom out
                scale = 1
                img_offsetX = 0
                img_offsetY = 0
                previewImage.style.transition = 'transform 0.3s ease';
                previewImage.style.transform = `scale(${scale}) translate(${img_offsetX}px, ${img_offsetY}px)`;
            }
        }
    }
    lastTouchTime = currentTime; // update last touch time
});