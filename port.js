// FORM SEND AND RESET 
function sendForm(event) {
  event.preventDefault();
  alert('Message sent successfully!');
  document.querySelector('#form form').reset();
}

// MOUSE POINTER ANIMATION
document.addEventListener('mousemove', (e) => {
  const customPointer = document.getElementById('custom-pointer');
  customPointer.style.left = e.pageX - 10 + 'px';
  customPointer.style.top = e.pageY - 10 + 'px';
});

// text scramble animation

class TextScramble {
  constructor(el) {
    this.el = el
    this.chars = '!<>-\\/[]{}—=+*^?#_'
  //   this.chars = '011101011110'
    this.update = this.update.bind(this)
  }
  setText(newText) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise((resolve) => this.resolve = resolve)
    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      this.queue.push({ from, to, start, end })
    }
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }
  update() {
    let output = ''
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar()
          this.queue[i].char = char
        }
        output += `<span class="dud" style="color: #e100ff; text-shadow: 0 0 5px #e100ff; font-size: 84px">${char}</span>`;
        
      } else {
        output += from
      }
    }
    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }
}

// ——————————————————————————————————————————————————
// Example
// ——————————————————————————————————————————————————
document.addEventListener('DOMContentLoaded', (event) => {
const phrases = [
'ABHISHEAK',
  'EREN YEAGAR'
]

const el = document.querySelector('.text')
const fx = new TextScramble(el)

let counter = 0
const next = () => {
  fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 2000)
  })
  counter = (counter + 1) % phrases.length
};

next();

});