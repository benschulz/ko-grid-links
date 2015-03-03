/*
 Copyright (c) 2015, Ben Schulz
 License: BSD 3-clause (http://opensource.org/licenses/BSD-3-Clause)
*/
function l(e,n,f){return function(c){return c}(function(c,a){a.f("ko-grid-links",{b:function(b,a,g){Object.keys(b).forEach(function(a){var m=g.d.c(a),h=b[a].uri,k=b[a].label,e="function"===typeof h?h:function(d){return g.data.a(c.unwrap(d[h]))},f="function"===typeof k?k:function(d){return g.data.a(c.unwrap(d[k||m.i]))};m.h(function(){return{g:function(d){var a=window.document.createElement("a");a.appendChild(window.document.createTextNode(""));d.appendChild(a)},update:function(a,c,b){a.firstChild.firstChild.nodeValue=
f(b);a.firstChild.href=e(b)}}})})}});return a.e("links","ko-grid-links")}(f,e))}"function"===typeof define&&define.amd?define(["ko-grid","ko-indexed-repeat","knockout"],l):window["ko-grid-links"]=l(window.ko.bindingHandlers.grid);
