// ==UserScript==
// @name         yandex bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @grant        none
// ==/UserScript==


document.getElementById('text').value = 'Гобой';
let btn = document.getElementsByClassName('button_theme_websearch')[0];
if(btn != undefined){
btn.click();
}else{
let links = document.links;
for(let i=0; i<links.length; i++){
    let link = links[i];
    if(link.href. indexOf('xn----7sbab5aqcbiddtdj1e1g.xn--p1ai') !=-1){
        link.removeAttribute('target');
        link.click();
        break;
    }
}
}
