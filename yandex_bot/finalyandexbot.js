// ==UserScript==
// @name         yandex bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @match       https://napli.ru/*
// @grant        none
// ==/UserScript==
function getRandom(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}


let sites = {
    "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai":["Гобой","Саксофон","Валторна","Фагот","Флейта","Как звучит флейта","Скрипка"],
    "napli.ru":['10 самых популярных шрифтов от Google',
				'Отключение редакций и ревизий в WordPress',
				'Вывод произвольных типов записей и полей в WordPress'],
}
let site = Object.keys(sites)[getRandom(0,Object.keys(sites).length)];
let keywords = sites[site];
let keyword = keywords[getRandom(0, keywords.length)];
let yandexInput = document.getElementById('text');
let btn = document.getElementsByClassName('button_theme_search')[0];
let links = document.links;
if(btn != undefined){
    let i = 0;
    document.cookie = "site="+site;
    let timerId = setInterval(()=>{
      yandexInput.value += keyword[i++];
      if (i == keyword.length){
        clearInterval(timerId);
        btn.click();
    }
},500);
}else if(location.hostname == "yandex.ru"){
    let flag = true;
    let numPage = document.getElementsByClassName(" pager__item_current_yes ")[0].innerHTML;
    site = getCookie("site");
    for(let i=0; i<links.length; i++){
        let link = links[i];
        if(link.href.indexOf(site) !=-1){
            flag = false;
            link.removeAttribute('target');
            setTimeout(()=>link.click(), 2000);
            break;
        }
    }
    if (numPage == "10") location.href = "https://yandex.ru/";
    let btnNext = document.querySelectorAll(".pager__item_kind_next")[0];
    if(flag) setTimeout(()=>btnNext.click(),2000);
}else{
    if(getRandom(0,100)>=80) location.href = "https://yandex.ru/";
    else
        setInterval(()=>{
            let link = links[getRandom(0,links.length)];
            if(link.href.indexOf(location.hostname) != -1)
                link.click();
        },5000);
}
