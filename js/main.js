let target = 0;
let current = 0;
let ease = 0.075;

let pressed = false;
let mouseX = 0;

const slider = document.querySelector('.slider');
const sliderWrapper = document.querySelector('.slider-wrapper');
const markerWrapper = document.querySelector('.marker-wrapper');
const activeSlide = document.querySelector('.active-slide');
const prevBtn = document.querySelector('.cursor.prev');
const nextBtn = document.querySelector('.cursor.next');

let maxScroll = sliderWrapper.offsetWidth - window.innerWidth;

const lerp = (start, end, factor) => {
  return start + (end - start) * factor;
};

const update = () => {
  // current = lerp(current, target, ease);
  current = target;

  let moveRatio = current / maxScroll;

  gsap.set(".marker", {
    scaleX: moveRatio,
  });

  requestAnimationFrame(update);
};

slider.addEventListener('wheel', e => {
  target += e.deltaX;

  target = Math.max(0, target);
  target = Math.min(maxScroll, target);
});

slider.addEventListener('mousedown', e => {
  pressed = true;
  mouseX = e.clientX;
  slider.style.cursor = 'grabbing';
});

slider.addEventListener('mouseleave', e => {
  pressed = false;
});

slider.addEventListener('mouseup', e => {
  pressed = false;
  slider.style.cursor = 'grab';
});

slider.addEventListener('mousemove', e => {
  if (pressed) {
    slider.scrollLeft += mouseX - e.clientX;
    target += mouseX - e.clientX;
    target = Math.max(0, target);
    target = Math.min(maxScroll, target);
    mouseX = e.clientX;
  }
});

update();

const slideAction = (step, direction) => {
  if (direction) {
    slider.scrollLeft += step;
    target += step;
    target = Math.min(maxScroll, target);
    return;
  }
  slider.scrollLeft -= step;
  target -= step;
  target = Math.max(0, target);
}

const scrollInterval = (step, speed, direction, threshold) => {
  let cnt = 0;
  const giveInterval = setInterval(() => {
    slideAction(step, direction);
    cnt += step;
    if (cnt > threshold) {
      window.clearInterval(giveInterval);
    }
  }, speed);
};

prevBtn.addEventListener('click', () => {
  scrollInterval(40, 30, false, maxScroll/2);
});

nextBtn.addEventListener('click', () => {
  scrollInterval(40, 30, true, maxScroll/2);
})


const imgs = sliderWrapper.querySelectorAll('img');
imgs.forEach((img) => {
  img.setAttribute('draggable', 'false');
})