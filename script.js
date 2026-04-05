
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');


const btnText = document.querySelector('.btn-text');
const text = btnText.getAttribute('data-text');
btnText.innerHTML = text.split('').map((char, i) => {
    if (char === ' ') return `<span class="letter" data-index="${i}">&nbsp;</span>`;
    return `<span class="letter" data-index="${i}">${char}</span>`;
}).join('');

const letters = document.querySelectorAll('.letter');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });

    checkLettersUnderCursor(posX, posY);
});

function checkLettersUnderCursor(cursorX, cursorY) {
    const cursorRadius = 40;

    letters.forEach(letter => {
        const rect = letter.getBoundingClientRect();
        const letterCenterX = rect.left + rect.width / 2;
        const letterCenterY = rect.top + rect.height / 2;


        const distance = Math.sqrt(
            Math.pow(cursorX - letterCenterX, 2) +
            Math.pow(cursorY - letterCenterY, 2)
        );


        if (distance < cursorRadius) {
            letter.classList.add('magnified');

            const scale = 1.8 - (distance / cursorRadius) * 0.4;
            letter.style.transform = `scale(${scale}) translateY(-5.1px)`;
        } else {
            letter.classList.remove('magnified');
            letter.style.transform = 'scale(1) translateY(0)';
        }
    });
}

// Button hover effects
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        cursorOutline.classList.add('magnifying');
        cursorDot.style.transform = 'translate(-40%, -40%) scale(0.5)';
        cursorDot.classList.add('magnifying');

    });

    btn.addEventListener('mouseleave', () => {
        cursorOutline.classList.remove('magnifying');
        cursorDot.style.transform = 'translate(-40%, -40%) scale(1)';
        cursorDot.classList.remove('magnifying');

        letters.forEach(letter => {
            letter.classList.remove('magnified');
            letter.style.transform = 'scale(1) translateY(0)';
        });
    });
});