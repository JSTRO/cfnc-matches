(this["webpackJsonpcovid-react"]=this["webpackJsonpcovid-react"]||[]).push([[0],{14:function(e,t,a){},15:function(e,t,a){},19:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(4),o=a.n(i),c=(a(14),a(2)),l=(a(15),a(16),a(8)),s=a(5),u=a.n(s),d=a(6);var f=function(){var e=Object(n.useState)([]),t=Object(c.a)(e,2),a=t[0],i=t[1],o=Object(n.useState)(!1),s=Object(c.a)(o,2),f=s[0],m=s[1],h="Email Address",v="I am aged",g="I am interested in dating someone aged ",p="It is important that my partner is the same religion as me",y="Do you want to have children?",b="It is important that my partner has the same political beliefs as I do",O="If so, my political beliefs are",I=["Early 20s","Late 20s","Early 30s","Late 30s","Early 40s","Late 40s","50s+","60+"],E=function(e){var t=e.map((function(t){return[t[h],e.filter((function(e){return t[h]!==e[h]&&t["I am interested in dating a"]===e["I am a"]&&t["I am a"]===e["I am interested in dating a"]&&("Female"===t["I am a"]?t[g]===I[I.indexOf(e[v])]||t[g]===I[I.indexOf(e[v])+1]:"Female"===e["I am a"]?e[g]===I[I.indexOf(t[v])]||e[g]===I[I.indexOf(t[v])+1]:null)&&("Male"===t["I am a"]?t[g]===I[I.indexOf(e[v])]||t[g]===I[I.indexOf(e[v])-1]:"Male"===e["I am a"]?e[g]===I[I.indexOf(t[v])]||e[g]===I[I.indexOf(t[v])-1]:null)&&t.City===e.City&&("Yes"===t["Do you mind if your match has children?"]?"No"===e["Do you have children?"]:"Yes"===e["Do you mind if your match has children?"]?"No"===t["Do you have children?"]:null)&&("Yes"===t[p]||"Yes"===e[p]?t["What religion are you?"]===e["What religion are you?"]:null)&&("Yes"===t[b]&&"Moderate"!==t[O]||"Yes"===e[b]&&"Moderate"!==e[O]?t[O]===e[O]:t[O]===e[O]||t[O]!==e[O])&&("Unsure"!==t[y]?t[y]===e[y]:t[y]===e[y]||t[y]!==e[y])})).map((function(e){return e[h]}))]})).filter((function(e){return e[1].length>0}));console.log("matches",t);for(var a=[],n=0;n<t.length;n++){var r=t[n][0],i=t[n][1];if(i.length>1)for(var o=0;o<i.length;o++)a.push([r,i[o]]);else a.push([r,i[0]])}a=Object(d.uniqBy)(a,(function(e){return JSON.stringify(e)}));for(var c=0;c<a.length;c++)for(var l=0;l<a.length;l++)a[c][0]===a[l][1]&&a[c][1]===a[l][0]&&a.splice(a.indexOf(a[l]),1);return a};return r.a.createElement("div",{className:"App"},r.a.createElement("div",{className:"container-fluid"},r.a.createElement("h1",null,"#CFNC Matches"),r.a.createElement("div",{className:"input"},r.a.createElement("input",{type:"file",name:"file",accept:".csv",onChange:function(e){return function(e){var t=e.target.files[0];m(!0),u.a.parse(t,{header:!0,complete:function(e){i(E(e.data))}})}(e)}}),r.a.createElement(l.a,{variant:"success",onClick:function(){var e=function(){var e=new Date,t=e.toISOString().slice(0,10),a="".concat(t,"_").concat(e.getHours(),"_").concat(e.getMinutes(),"_").concat(e.getSeconds());return"matches_".concat(a,".csv")}();f?function(e,t){for(var a=function(e){for(var t="",a=0;a<e.length;a++){var n=null===e[a]?"":e[a].toString();e[a]instanceof Date&&(n=e[a].toLocaleString());var r=n.replace(/"/g,'""');r.search(/("|,|\n)/g)>=0&&(r='"'+r+'"'),a>0&&(t+=","),t+=r}return t+"\n"},n="",r=0;r<t.length;r++)n+=a(t[r]);var i=new Blob([n],{type:"text/csv;charset=utf-8;"});if(navigator.msSaveBlob)navigator.msSaveBlob(i,e);else{var o=document.createElement("a");if(void 0!==o.download){var c=URL.createObjectURL(i);o.setAttribute("href",c),o.setAttribute("download",e),o.style.visibility="hidden",document.body.appendChild(o),o.click(),document.body.removeChild(o)}}}(e,a):alert("Please choose a file.")}},"Download Matches"))))};o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(f,null)),document.getElementById("root"))},9:function(e,t,a){e.exports=a(19)}},[[9,1,2]]]);
//# sourceMappingURL=main.7b25c7cd.chunk.js.map