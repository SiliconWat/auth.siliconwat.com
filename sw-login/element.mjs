import template from './template.mjs';

class SwLogin extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    hide() {
        this.style.display = 'none';
    }

    show() {
        this.shadowRoot.getElementById('remember').checked = Number(localStorage.getItem('remember'));
        this.shadowRoot.getElementById('password').value = localStorage.getItem('password');
        this.style.display = 'block';
    }

    async login(event) {
        event.preventDefault();
        this.shadowRoot.getElementById('message').textContent = "";

        const password = this.shadowRoot.getElementById('password').value;
        const data = await fetch("https://api.github.com/user", { headers: {'Authorization': 'Basic ' + btoa(`:${password}`)}});
        const github = await data.json();

        if (github.login) {
            localStorage.setItem('github', JSON.stringify(github));
            localStorage.setItem('password', Number(localStorage.getItem('remember')) ? password : "");
            this.dispatchEvent(new CustomEvent("sw-login", { bubbles: true, composed: true, detail: { action: "login" }}));
            if (window.parent) window.parent.postMessage(localStorage.getItem('github'), "*");
        } else {
            this.shadowRoot.getElementById('message').textContent = "Incorrect Personal Access Token";
            //if (window.parent) window.parent.postMessage("{}", "*");
        }
    }

    remember(event) {
        localStorage.setItem('remember', Number(this.shadowRoot.getElementById('remember').checked));
    }
}

customElements.define("sw-login", SwLogin);