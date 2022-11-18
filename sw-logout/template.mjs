const template = document.createElement("template");

template.innerHTML = `
    <link rel="stylesheet" href="sw-logout/shadow.css">
    <a>
        <img>
        <h2></h2>
    </a>
    <button onclick="this.getRootNode().host.logout(event)">Logout from GitHub</button>
`;

export default template;