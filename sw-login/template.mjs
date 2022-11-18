const template = document.createElement("template");

template.innerHTML = `
    <link rel="stylesheet" href="sw-login/shadow.css">
    <form onsubmit="this.getRootNode().host.login(event)">
        <h3><label for="password">Personal Access Token</label></h3>
        <input id="password" type="password">
        <br><br>
        <aside>
            <input id="remember" type="checkbox" oninput="this.getRootNode().host.remember(event)">
            <label for="remember">Remember me</label>
        </aside>
        <br>
        <button type="submit">Login with GitHub</button>
    </form>
    <small><a href="https://github.com/SiliconWat/auth.siliconwat.com/tree/main">How to get a Personal Access Token</a></small>
    <p id="message"></p>
`;

export default template;