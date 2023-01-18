let elt = document.querySelectorAll("a");

elt.forEach(element => {
    element.dataset.fancybox ="gallery";
    let title = element.title;
    element.dataset.caption = title;
    let srcAttribute = element.firstElementChild.getAttribute("src");
    srcAttribute = srcAttribute.replace('/thumbnails', '');
    element.href = srcAttribute;
});

let body = document.querySelector("body");
var bodyContent = body.innerHTML;
navigator.clipboard.writeText(bodyContent);