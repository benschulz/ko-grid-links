/*
 Copyright (c) 2015, Ben Schulz
 License: BSD 3-clause (http://opensource.org/licenses/BSD-3-Clause)
*/
function l(e,f){return function(a){return a}(function(a,m,b){b.defineExtension("ko-grid-links",{a:function(c,a,g){Object.keys(c).forEach(function(a){var b=g.columns.byId(a),h=c[a].uri,k=c[a].label,e="function"===typeof h?h:function(d){return g.data.observableValueSelector(m.unwrap(d[h]))},f="function"===typeof k?k:function(d){return g.data.observableValueSelector(m.unwrap(d[k||b.property]))};b.overrideValueBinding(function(){return{init:function(d){var a=window.document.createElement("a");a.appendChild(window.document.createTextNode(""));
d.appendChild(a)},update:function(a,b,c){a.firstChild.firstChild.nodeValue=f(c);a.firstChild.href=e(c)}}})})}});return b.declareExtensionAlias("links","ko-grid-links")}({},f,e))}"function"===typeof define&&define.amd?define(["ko-grid","knockout","ko-data-source","ko-indexed-repeat"],l):window["ko-grid-links"]=l(window.ko.bindingHandlers.grid,window.ko);
