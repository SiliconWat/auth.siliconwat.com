import template from './template.mjs';

class SwProvider extends HTMLBodyElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.#embed();
        this.#render();
        this.addEventListener('sw-login', this.#render.bind(this));
        this.addEventListener('sw-logout', this.#render.bind(this));
    }

    #render() {
        if (localStorage.getItem('github')) {
            this.querySelector('sw-login').hide();
            this.querySelector('sw-logout').show();
        } else {
            this.querySelector('sw-logout').hide();
            this.querySelector('sw-login').show();
        }
    }

    #embed() {
        const searchParams = new URLSearchParams(window.location.search);
        if (searchParams.get('embed') === "") {
            this.style.justifyContent = 'center';
            this.querySelector('header').style.display = 'none';
            this.querySelector('footer').style.display = 'none';
        }
    }
}

customElements.define("sw-provider", SwProvider, { extends: "body" });