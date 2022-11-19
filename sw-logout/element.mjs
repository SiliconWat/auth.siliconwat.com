import template from './template.mjs';

class SwLogout extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        window.addEventListener("message", async event => {
            if (event.data === 'logout') {
                await this.logout(event);
                event.source.postMessage("{}", event.origin);
            }
        });
    }

    hide() {
        this.style.display = 'none';
    }

    show() {
        const github = JSON.parse(localStorage.getItem('github')) || {};

        const a = this.shadowRoot.querySelector('a');
        a.href = github.html_url;
        a.firstElementChild.src = github.avatar_url;
        a.lastElementChild.textContent = github.login;

        this.style.display = 'block';
    }

    async logout(event) {
        localStorage.removeItem('github');
        this.dispatchEvent(new CustomEvent("sw-logout", { bubbles: true, composed: true, detail: { action: "logout" }}));
    }
}

customElements.define("sw-logout", SwLogout);