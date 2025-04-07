import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {

  #initialTopCoord = null;

  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {

    if (this.#initialTopCoord == null) {
      this.#initialTopCoord = this.elem.getBoundingClientRect().top + window.pageYOffset;
    }

    let leftIndent = Math.min(
      document.querySelector('.container').getBoundingClientRect().right + 20,
      document.documentElement.clientWidth - this.elem.offsetWidth - 10
    ) + 'px';    
    
    if (window.pageYOffset > this.#initialTopCoord) {
      console.log(`плавающая корзина`);
      
      // плавающая корзина
      Object.assign(this.elem.style, {
        position: 'fixed',
        top: '50px',
        zIndex: 1e3,
        right: '10px',
        left: leftIndent
      });      
    } else {
      console.log(`корзина сверху`);
      // корзина сверху
      if (document.documentElement.clientWidth <= 767) {
        Object.assign(this.elem.style, {
          position: 'fixed',
          top: '',
          left: `${document.documentElement.clientWidth - this.elem.offsetWidth - 10}px`,
          zIndex: ''
        });
      } else {
        Object.assign(this.elem.style, {
          position: 'fixed',
          top: '',
          left: document.querySelector('.container').getBoundingClientRect().right - this.elem.offsetWidth +'px',
          zIndex: ''
        });
      }      
    }
  }
}
