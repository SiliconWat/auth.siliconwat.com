import template from './template.mjs';

class SwProvider extends HTMLBodyElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.#render();
        this.addEventListener('sw-login', this.#render.bind(this));
        this.addEventListener('sw-logout', this.#render.bind(this));
    }

    #render() {
        if (localStorage.getItem('github')) {
            document.querySelector('sw-login').hide();
            document.querySelector('sw-logout').show();
        } else {
            document.querySelector('sw-logout').hide();
            document.querySelector('sw-login').show();
        }
    }
}

customElements.define("sw-provider", SwProvider, { extends: "body" });