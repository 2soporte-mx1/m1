window.onload = function(){
    if(detectIE()) {
        showModalIE();
    }
}

function detectIE() {
    var ua = window.navigator.userAgent;
    
    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        return true;
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        return true;
    }

    return false;
}

function showModalIE() {
    var modal = document.createElement("div");
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.background = "rgba(0,0,0,0.6)";
    modal.style.color = "white";
    modal.style.position = "fixed";
    modal.style.top = 0;
    modal.style.left = 0;
    modal.style.paddingTop = "100px";
    modal.style.paddingLeft = "24px";
    modal.style.paddingRight = "24px";
    modal.style.zIndex = "100";
    modal.setAttribute("id", "modalIE");

    var modalContent = document.createElement("div");
    modalContent.style.width = "100%";
    modalContent.style.maxWidth = "650px";
    modalContent.style.background = "#FFFFFF";
    modalContent.style.color = "white";
    modalContent.style.margin = "auto";
    modalContent.style.padding = "40px 20px";
    modalContent.style.textAlign = "center";

    var imgContent = document.createElement("img");
    imgContent.style.width = "56px";
    imgContent.style.height = "56px";
    imgContent.style.marginBottom = "40px";
    imgContent.setAttribute("src", "/components/modal/img/alert.png");

    var pContent = document.createElement("p");
    pContent.style.color = "#000000";
    pContent.style.fontSize = "16px";
    pContent.style.width = "100%";
    pContent.style.maxWidth = "505px";
    pContent.style.marginBottom = "48px";
    pContent.style.marginLeft = "auto";
    pContent.style.marginRight = "auto";
    pContent.innerHTML = "Para visualizar correctamente la información es necesario que utilices un navegador distinto a Internet Explorer.";

    var buttonContent = document.createElement("button");
    buttonContent.style.color = "#FFFFFF";
    buttonContent.style.background = "#EC0000";
    buttonContent.style.border = "0";
    buttonContent.style.textAlign = "left";
    buttonContent.style.padding = "14.5px 55px";
    buttonContent.style.fontSize = "16px";
    buttonContent.style.borderRadius = "40px";
    buttonContent.innerHTML = "Aceptar";
    buttonContent.setAttribute("type", "button");
    buttonContent.onclick = function(){
        const modal = document.getElementById("modalIE");
        modal.remove();
    }

    modalContent.appendChild(imgContent);
    modalContent.appendChild(pContent);
    modalContent.appendChild(buttonContent);
    modal.appendChild(modalContent);
    document.getElementsByTagName("body")[0].appendChild(modal);
}