const template = document.createElement("template");

template.innerHTML = `
    <link rel="stylesheet" href="sw-provider/shadow.css">
    <slot></slot>
`;

export default template;