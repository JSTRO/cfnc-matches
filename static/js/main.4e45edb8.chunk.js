(this["webpackJsonpcovid-react"]=this["webpackJsonpcovid-react"]||[]).push([[0],{12:function(e,t,n){e.exports=n(22)},17:function(e,t,n){},18:function(e,t,n){},22:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(8),c=n.n(i),l=(n(17),n(5)),o=(n(18),n(19),n(11)),s=n(9),u=n.n(s),m=n(3);var d=n(6),h="I am interested in dating someone aged ",f="It is important that my partner is the same religion as me",g="Do you want to have children?",p="Do you mind if your match has children?",v="It is important that my partner has the same political beliefs as I do",y="If so, my political beliefs are",E="Are you open to dating someone from another city? If so, what cities?";var b=function(){var e=Object(a.useState)([]),t=Object(l.a)(e,2),n=t[0],i=t[1],c=Object(a.useState)(!1),s=Object(l.a)(c,2),b=s[0],I=s[1],O=function(e){var t=function(e){for(var t=0;t<e.length;t++)for(var n=0;n<e.length;n++)e[t][0]===e[n][1]&&e[t][1]===e[n][0]&&e.splice(e.indexOf(e[n]),1);return e}(function(e){for(var t=[],n=0;n<e.length;n++){var a=e[n][0],r=e[n][1];if(r.length>1)for(var i=0;i<r.length;i++)t.push([a,r[i]]);else t.push([a,r[0]])}return t}(e.map((function(t){return[t["Email Address"],e.filter((function(e){return function(e,t){return e["Email Address"]!==t["Email Address"]}(t,e)&&function(e,t){return e["I am interested in dating a"]===t["I am a"]&&e["I am a"]===t["I am interested in dating a"]}(t,e)&&function(e,t){var n=e[E]?[].concat(Object(d.a)(e[E].split(", ")),[e.City]):[],a=t[E]?[].concat(Object(d.a)(t[E].split(", ")),[t.City]):[];return n.includes(t.City)&&a.includes(e.City)}(t,e)&&function(e,t){var n=e[h]?e[h].split(", "):[],a=e[h]?t[h].split(", "):[];return n.includes(t["I am aged"])&&a.includes(e["I am aged"])}(t,e)&&function(e,t){return!("Yes"===e[p]&&"Yes"===t["Do you have children?"]||"Yes"===t[p]&&"Yes"===e["Do you have children?"])}(t,e)&&function(e,t){return!("Yes"===e[v]&&"Moderate"!==e[y]||"Yes"===t[v]&&"Moderate"!==t[y])||e[y]===t[y]}(t,e)&&function(e,t){return"Yes"!==e[f]&&"Yes"!==t[f]||e["What religion are you?"]===t["What religion are you?"]}(t,e)&&function(e,t){return"Unsure"===e[g]&&"Unsure"===t[g]||e[g]===t[g]}(t,e)})).map((function(e){return e["Email Address"]}))]})).filter((function(e){return e[1].length>0}))));return console.log("output",Object(m.uniqBy)(t,(function(e){return JSON.stringify(e)}))),Object(m.uniqBy)(t,(function(e){return JSON.stringify(e)}))};return r.a.createElement("div",{className:"App"},r.a.createElement("div",{className:"container-fluid"},r.a.createElement("h1",null,"#CFNC Matches"),r.a.createElement("div",{className:"input"},r.a.createElement("input",{type:"file",name:"file",accept:".csv",onChange:function(e){return function(e){var t=e.target.files[0];I(!0),u.a.parse(t,{header:!0,complete:function(e){i(O(e.data))}})}(e)}}),r.a.createElement(o.a,{variant:"success",onClick:function(){var e=function(){var e=new Date,t=e.toISOString().slice(0,10),n="".concat(t,"_").concat(e.getHours(),"_").concat(e.getMinutes(),"_").concat(e.getSeconds());return"matches_".concat(n,".csv")}();b?function(e,t){for(var n=function(e){for(var t="",n=0;n<e.length;n++){var a=null===e[n]?"":e[n].toString();e[n]instanceof Date&&(a=e[n].toLocaleString());var r=a.replace(/"/g,'""');r.search(/("|,|\n)/g)>=0&&(r='"'+r+'"'),n>0&&(t+=","),t+=r}return t+"\n"},a="",r=0;r<t.length;r++)a+=n(t[r]);var i=new Blob([a],{type:"text/csv;charset=utf-8;"});if(navigator.msSaveBlob)navigator.msSaveBlob(i,e);else{var c=document.createElement("a");if(void 0!==c.download){var l=URL.createObjectURL(i);c.setAttribute("href",l),c.setAttribute("download",e),c.style.visibility="hidden",document.body.appendChild(c),c.click(),document.body.removeChild(c)}}}(e,n):alert("Please choose a file.")}},"Download Matches")),r.a.createElement("h4",null,"Matching Criteria:"),r.a.createElement("div",{className:"criteria"},r.a.createElement("ol",null,r.a.createElement("li",null,r.a.createElement("strong",null,"Gender Preference"),": Gender should equal gender preference."),r.a.createElement("li",null,r.a.createElement("strong",null,"Age preference"),": Age should match ANY age in age preferences."),r.a.createElement("li",null,r.a.createElement("strong",null,"City"),": City should match ANY city in city preferences."),r.a.createElement("li",null,r.a.createElement("strong",null,"Minds children"),": If either person minds chidren, their match should not have children."),r.a.createElement("li",null,r.a.createElement("strong",null,"Wants children"),': If answer is "Yes" or "No", match on this criteria. If "Unsure", ignore this criteria.'),r.a.createElement("li",null,r.a.createElement("strong",null,"Religion"),": If religion is important to either person, match on religion."),r.a.createElement("li",null,r.a.createElement("strong",null,"Politics"),": If politics is important to either person AND that person is NOT a Moderate, match on politics.")))))};c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(b,null)),document.getElementById("root"))}},[[12,1,2]]]);
//# sourceMappingURL=main.4e45edb8.chunk.js.map