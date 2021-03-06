 /*!
 * Ghostium
 * A Ghost theme focused on content based on Medium design/ux
 * http://ghostium.oswaldoacauan.com/
 * @author Oswaldo Acauan http://oswaldoacauan.com
 * @version 2.2.1
 * Copyright 2013. MIT licensed.
 */
function FastClick(a) {
    "use strict";
    var b, c = this;
    if (this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = 10, this.layer = a, !a || !a.nodeType)
        throw new TypeError("Layer must be a document node");
    this.onClick = function() {
        return FastClick.prototype.onClick.apply(c, arguments)
    }, this.onMouse = function() {
        return FastClick.prototype.onMouse.apply(c, arguments)
    }, this.onTouchStart = function() {
        return FastClick.prototype.onTouchStart.apply(c, arguments)
    }, this.onTouchMove = function() {
        return FastClick.prototype.onTouchMove.apply(c, arguments)
    }, this.onTouchEnd = function() {
        return FastClick.prototype.onTouchEnd.apply(c, arguments)
    }, this.onTouchCancel = function() {
        return FastClick.prototype.onTouchCancel.apply(c, arguments)
    }, FastClick.notNeeded(a) || (this.deviceIsAndroid && (a.addEventListener("mouseover", this.onMouse, !0), a.addEventListener("mousedown", this.onMouse, !0), a.addEventListener("mouseup", this.onMouse, !0)), a.addEventListener("click", this.onClick, !0), a.addEventListener("touchstart", this.onTouchStart, !1), a.addEventListener("touchmove", this.onTouchMove, !1), a.addEventListener("touchend", this.onTouchEnd, !1), a.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (a.removeEventListener = function(b, c, d) {
        var e = Node.prototype.removeEventListener;
        "click" === b ? e.call(a, b, c.hijacked || c, d) : e.call(a, b, c, d)
    }, a.addEventListener = function(b, c, d) {
        var e = Node.prototype.addEventListener;
        "click" === b ? e.call(a, b, c.hijacked || (c.hijacked = function(a) {
            a.propagationStopped || c(a)
        }), d) : e.call(a, b, c, d)
    }), "function" == typeof a.onclick && (b = a.onclick, a.addEventListener("click", function(a) {
        b(a)
    }, !1), a.onclick = null))
}
FastClick.prototype.deviceIsAndroid = navigator.userAgent.indexOf("Android") > 0, FastClick.prototype.deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent), FastClick.prototype.deviceIsIOS4 = FastClick.prototype.deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent), FastClick.prototype.deviceIsIOSWithBadTarget = FastClick.prototype.deviceIsIOS && /OS ([6-9]|\d{2})_\d/.test(navigator.userAgent), FastClick.prototype.needsClick = function(a) {
    "use strict";
    switch (a.nodeName.toLowerCase()) {
        case "button":
        case "select":
        case "textarea":
            if (a.disabled)
                return !0;
            break;
        case "input":
            if (this.deviceIsIOS && "file" === a.type || a.disabled)
                return !0;
            break;
        case "label":
        case "video":
            return !0
    }
    return /\bneedsclick\b/.test(a.className)
}, FastClick.prototype.needsFocus = function(a) {
    "use strict";
    switch (a.nodeName.toLowerCase()) {
        case "textarea":
            return !0;
        case "select":
            return !this.deviceIsAndroid;
        case "input":
            switch (a.type) {
                case "button":
                case "checkbox":
                case "file":
                case "image":
                case "radio":
                case "submit":
                    return !1
            }
            return !a.disabled && !a.readOnly;
        default:
            return /\bneedsfocus\b/.test(a.className)
    }
}, FastClick.prototype.sendClick = function(a, b) {
    "use strict";
    var c, d;
    document.activeElement && document.activeElement !== a && document.activeElement.blur(), d = b.changedTouches[0], c = document.createEvent("MouseEvents"), c.initMouseEvent(this.determineEventType(a), !0, !0, window, 1, d.screenX, d.screenY, d.clientX, d.clientY, !1, !1, !1, !1, 0, null), c.forwardedTouchEvent = !0, a.dispatchEvent(c)
}, FastClick.prototype.determineEventType = function(a) {
    "use strict";
    return this.deviceIsAndroid && "select" === a.tagName.toLowerCase() ? "mousedown" : "click"
}, FastClick.prototype.focus = function(a) {
    "use strict";
    var b;
    this.deviceIsIOS && a.setSelectionRange && 0 !== a.type.indexOf("date") && "time" !== a.type ? (b = a.value.length, a.setSelectionRange(b, b)) : a.focus()
}, FastClick.prototype.updateScrollParent = function(a) {
    "use strict";
    var b, c;
    if (b = a.fastClickScrollParent, !b || !b.contains(a)) {
        c = a;
        do {
            if (c.scrollHeight > c.offsetHeight) {
                b = c, a.fastClickScrollParent = c;
                break
            }
            c = c.parentElement
        } while (c)
    }
    b && (b.fastClickLastScrollTop = b.scrollTop)
}, FastClick.prototype.getTargetElementFromEventTarget = function(a) {
    "use strict";
    return a.nodeType === Node.TEXT_NODE ? a.parentNode : a
}, FastClick.prototype.onTouchStart = function(a) {
    "use strict";
    var b, c, d;
    if (a.targetTouches.length > 1)
        return !0;
    if (b = this.getTargetElementFromEventTarget(a.target), c = a.targetTouches[0], this.deviceIsIOS) {
        if (d = window.getSelection(), d.rangeCount && !d.isCollapsed)
            return !0;
        if (!this.deviceIsIOS4) {
            if (c.identifier === this.lastTouchIdentifier)
                return a.preventDefault(), !1;
            this.lastTouchIdentifier = c.identifier, this.updateScrollParent(b)
        }
    }
    return this.trackingClick = !0, this.trackingClickStart = a.timeStamp, this.targetElement = b, this.touchStartX = c.pageX, this.touchStartY = c.pageY, a.timeStamp - this.lastClickTime < 200 && a.preventDefault(), !0
}, FastClick.prototype.touchHasMoved = function(a) {
    "use strict";
    var b = a.changedTouches[0], c = this.touchBoundary;
    return Math.abs(b.pageX - this.touchStartX) > c || Math.abs(b.pageY - this.touchStartY) > c ? !0 : !1
}, FastClick.prototype.onTouchMove = function(a) {
    "use strict";
    return this.trackingClick ? ((this.targetElement !== this.getTargetElementFromEventTarget(a.target) || this.touchHasMoved(a)) && (this.trackingClick = !1, this.targetElement = null), !0) : !0
}, FastClick.prototype.findControl = function(a) {
    "use strict";
    return void 0 !== a.control ? a.control : a.htmlFor ? document.getElementById(a.htmlFor) : a.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
}, FastClick.prototype.onTouchEnd = function(a) {
    "use strict";
    var b, c, d, e, f, g = this.targetElement;
    if (!this.trackingClick)
        return !0;
    if (a.timeStamp - this.lastClickTime < 200)
        return this.cancelNextClick = !0, !0;
    if (this.cancelNextClick = !1, this.lastClickTime = a.timeStamp, c = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, this.deviceIsIOSWithBadTarget && (f = a.changedTouches[0], g = document.elementFromPoint(f.pageX - window.pageXOffset, f.pageY - window.pageYOffset) || g, g.fastClickScrollParent = this.targetElement.fastClickScrollParent), d = g.tagName.toLowerCase(), "label" === d) {
        if (b = this.findControl(g)) {
            if (this.focus(g), this.deviceIsAndroid)
                return !1;
            g = b
        }
    } else if (this.needsFocus(g))
        return a.timeStamp - c > 100 || this.deviceIsIOS && window.top !== window && "input" === d ? (this.targetElement = null, !1) : (this.focus(g), this.sendClick(g, a), this.deviceIsIOS4 && "select" === d || (this.targetElement = null, a.preventDefault()), !1);
    return this.deviceIsIOS && !this.deviceIsIOS4 && (e = g.fastClickScrollParent, e && e.fastClickLastScrollTop !== e.scrollTop) ? !0 : (this.needsClick(g) || (a.preventDefault(), this.sendClick(g, a)), !1)
}, FastClick.prototype.onTouchCancel = function() {
    "use strict";
    this.trackingClick = !1, this.targetElement = null
}, FastClick.prototype.onMouse = function(a) {
    "use strict";
    return this.targetElement ? a.forwardedTouchEvent ? !0 : a.cancelable && (!this.needsClick(this.targetElement) || this.cancelNextClick) ? (a.stopImmediatePropagation ? a.stopImmediatePropagation() : a.propagationStopped = !0, a.stopPropagation(), a.preventDefault(), !1) : !0 : !0
}, FastClick.prototype.onClick = function(a) {
    "use strict";
    var b;
    return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === a.target.type && 0 === a.detail ? !0 : (b = this.onMouse(a), b || (this.targetElement = null), b)
}, FastClick.prototype.destroy = function() {
    "use strict";
    var a = this.layer;
    this.deviceIsAndroid && (a.removeEventListener("mouseover", this.onMouse, !0), a.removeEventListener("mousedown", this.onMouse, !0), a.removeEventListener("mouseup", this.onMouse, !0)), a.removeEventListener("click", this.onClick, !0), a.removeEventListener("touchstart", this.onTouchStart, !1), a.removeEventListener("touchmove", this.onTouchMove, !1), a.removeEventListener("touchend", this.onTouchEnd, !1), a.removeEventListener("touchcancel", this.onTouchCancel, !1)
}, FastClick.notNeeded = function(a) {
    "use strict";
    var b, c;
    if ("undefined" == typeof window.ontouchstart)
        return !0;
    if (c = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
        if (!FastClick.prototype.deviceIsAndroid)
            return !0;
        if (b = document.querySelector("meta[name=viewport]")) {
            if (-1 !== b.content.indexOf("user-scalable=no"))
                return !0;
            if (c > 31 && window.innerWidth <= window.screen.width)
                return !0
        }
    }
    return "none" === a.style.msTouchAction ? !0 : !1
}, FastClick.attach = function(a) {
    "use strict";
    return new FastClick(a)
}, "undefined" != typeof define && define.amd ? define(function() {
    "use strict";
    return FastClick
}) : "undefined" != typeof module && module.exports ? (module.exports = FastClick.attach, module.exports.FastClick = FastClick) : window.FastClick = FastClick;
var self = "undefined" != typeof window ? window : {}, Prism = function() {
    var a = /\blang(?:uage)?-(?!\*)(\w+)\b/i, b = self.Prism = {util: {type: function(a) {
                return Object.prototype.toString.call(a).match(/\[object (\w+)\]/)[1]
            },clone: function(a) {
                var c = b.util.type(a);
                switch (c) {
                    case "Object":
                        var d = {};
                        for (var e in a)
                            a.hasOwnProperty(e) && (d[e] = b.util.clone(a[e]));
                        return d;
                    case "Array":
                        return a.slice()
                }
                return a
            }},languages: {extend: function(a, c) {
                var d = b.util.clone(b.languages[a]);
                for (var e in c)
                    d[e] = c[e];
                return d
            },insertBefore: function(a, c, d, e) {
                e = e || b.languages;
                var f = e[a], g = {};
                for (var h in f)
                    if (f.hasOwnProperty(h)) {
                        if (h == c)
                            for (var i in d)
                                d.hasOwnProperty(i) && (g[i] = d[i]);
                        g[h] = f[h]
                    }
                return e[a] = g
            },DFS: function(a, c) {
                for (var d in a)
                    c.call(a, d, a[d]), "Object" === b.util.type(a) && b.languages.DFS(a[d], c)
            }},highlightAll: function(a, c) {
            for (var d, e = document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'), f = 0; d = e[f++]; )
                b.highlightElement(d, a === !0, c)
        },highlightElement: function(d, e, f) {
            for (var g, h, i = d; i && !a.test(i.className); )
                i = i.parentNode;
            if (i && (g = (i.className.match(a) || [, ""])[1], h = b.languages[g]), h) {
                d.className = d.className.replace(a, "").replace(/\s+/g, " ") + " language-" + g, i = d.parentNode, /pre/i.test(i.nodeName) && (i.className = i.className.replace(a, "").replace(/\s+/g, " ") + " language-" + g);
                var j = d.textContent;
                if (j) {
                    j = j.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
                    var k = {element: d,language: g,grammar: h,code: j};
                    if (b.hooks.run("before-highlight", k), e && self.Worker) {
                        var l = new Worker(b.filename);
                        l.onmessage = function(a) {
                            k.highlightedCode = c.stringify(JSON.parse(a.data), g), b.hooks.run("before-insert", k), k.element.innerHTML = k.highlightedCode, f && f.call(k.element), b.hooks.run("after-highlight", k)
                        }, l.postMessage(JSON.stringify({language: k.language,code: k.code}))
                    } else
                        k.highlightedCode = b.highlight(k.code, k.grammar, k.language), b.hooks.run("before-insert", k), k.element.innerHTML = k.highlightedCode, f && f.call(d), b.hooks.run("after-highlight", k)
                }
            }
        },highlight: function(a, d, e) {
            return c.stringify(b.tokenize(a, d), e)
        },tokenize: function(a, c) {
            var d = b.Token, e = [a], f = c.rest;
            if (f) {
                for (var g in f)
                    c[g] = f[g];
                delete c.rest
            }
            a: for (var g in c)
                if (c.hasOwnProperty(g) && c[g]) {
                    var h = c[g], i = h.inside, j = !!h.lookbehind, k = 0;
                    h = h.pattern || h;
                    for (var l = 0; l < e.length; l++) {
                        var m = e[l];
                        if (e.length > a.length)
                            break a;
                        if (!(m instanceof d)) {
                            h.lastIndex = 0;
                            var n = h.exec(m);
                            if (n) {
                                j && (k = n[1].length);
                                var o = n.index - 1 + k, n = n[0].slice(k), p = n.length, q = o + p, r = m.slice(0, o + 1), s = m.slice(q + 1), t = [l, 1];
                                r && t.push(r);
                                var u = new d(g, i ? b.tokenize(n, i) : n);
                                t.push(u), s && t.push(s), Array.prototype.splice.apply(e, t)
                            }
                        }
                    }
                }
            return e
        },hooks: {all: {},add: function(a, c) {
                var d = b.hooks.all;
                d[a] = d[a] || [], d[a].push(c)
            },run: function(a, c) {
                var d = b.hooks.all[a];
                if (d && d.length)
                    for (var e, f = 0; e = d[f++]; )
                        e(c)
            }}}, c = b.Token = function(a, b) {
        this.type = a, this.content = b
    };
    if (c.stringify = function(a, d, e) {
        if ("string" == typeof a)
            return a;
        if ("[object Array]" == Object.prototype.toString.call(a))
            return a.map(function(b) {
                return c.stringify(b, d, a)
            }).join("");
        var f = {type: a.type,content: c.stringify(a.content, d, e),tag: "span",classes: ["token", a.type],attributes: {},language: d,parent: e};
        "comment" == f.type && (f.attributes.spellcheck = "true"), b.hooks.run("wrap", f);
        var g = "";
        for (var h in f.attributes)
            g += h + '="' + (f.attributes[h] || "") + '"';
        return "<" + f.tag + ' class="' + f.classes.join(" ") + '" ' + g + ">" + f.content + "</" + f.tag + ">"
    }, !self.document)
        return self.addEventListener ? (self.addEventListener("message", function(a) {
            var c = JSON.parse(a.data), d = c.language, e = c.code;
            self.postMessage(JSON.stringify(b.tokenize(e, b.languages[d]))), self.close()
        }, !1), self.Prism) : self.Prism;
    var d = document.getElementsByTagName("script");
    return d = d[d.length - 1], d && (b.filename = d.src, document.addEventListener && !d.hasAttribute("data-manual") && document.addEventListener("DOMContentLoaded", b.highlightAll)), self.Prism
}();
"undefined" != typeof module && module.exports && (module.exports = Prism), Prism.languages.markup = {comment: /&lt;!--[\w\W]*?-->/g,prolog: /&lt;\?.+?\?>/,doctype: /&lt;!DOCTYPE.+?>/,cdata: /&lt;!\[CDATA\[[\w\W]*?]]>/i,tag: {pattern: /&lt;\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+))?\s*)*\/?>/gi,inside: {tag: {pattern: /^&lt;\/?[\w:-]+/i,inside: {punctuation: /^&lt;\/?/,namespace: /^[\w-]+?:/}},"attr-value": {pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/gi,inside: {punctuation: /=|>|"/g}},punctuation: /\/?>/g,"attr-name": {pattern: /[\w:-]+/g,inside: {namespace: /^[\w-]+?:/}}}},entity: /&amp;#?[\da-z]{1,8};/gi}, Prism.hooks.add("wrap", function(a) {
    "entity" === a.type && (a.attributes.title = a.content.replace(/&amp;/, "&"))
}), Prism.languages.css = {comment: /\/\*[\w\W]*?\*\//g,atrule: {pattern: /@[\w-]+?.*?(;|(?=\s*{))/gi,inside: {punctuation: /[;:]/g}},url: /url\((["']?).*?\1\)/gi,selector: /[^\{\}\s][^\{\};]*(?=\s*\{)/g,property: /(\b|\B)[\w-]+(?=\s*:)/gi,string: /("|')(\\?.)*?\1/g,important: /\B!important\b/gi,ignore: /&(lt|gt|amp);/gi,punctuation: /[\{\};:]/g}, Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {style: {pattern: /(&lt;|<)style[\w\W]*?(>|&gt;)[\w\W]*?(&lt;|<)\/style(>|&gt;)/gi,inside: {tag: {pattern: /(&lt;|<)style[\w\W]*?(>|&gt;)|(&lt;|<)\/style(>|&gt;)/gi,inside: Prism.languages.markup.tag.inside},rest: Prism.languages.css}}}), Prism.languages.clike = {comment: {pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|(^|[^:])\/\/.*?(\r?\n|$))/g,lookbehind: !0},string: /("|')(\\?.)*?\1/g,"class-name": {pattern: /((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/gi,lookbehind: !0,inside: {punctuation: /(\.|\\)/}},keyword: /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/g,"boolean": /\b(true|false)\b/g,"function": {pattern: /[a-z0-9_]+\(/gi,inside: {punctuation: /\(/}},number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g,operator: /[-+]{1,2}|!|&lt;=?|>=?|={1,3}|(&amp;){1,2}|\|?\||\?|\*|\/|\~|\^|\%/g,ignore: /&(lt|gt|amp);/gi,punctuation: /[{}[\];(),.:]/g}, Prism.languages.javascript = Prism.languages.extend("clike", {keyword: /\b(var|let|if|else|while|do|for|return|in|instanceof|function|get|set|new|with|typeof|try|throw|catch|finally|null|break|continue|this)\b/g,number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?|NaN|-?Infinity)\b/g}), Prism.languages.insertBefore("javascript", "keyword", {regex: {pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,lookbehind: !0}}), Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {script: {pattern: /(&lt;|<)script[\w\W]*?(>|&gt;)[\w\W]*?(&lt;|<)\/script(>|&gt;)/gi,inside: {tag: {pattern: /(&lt;|<)script[\w\W]*?(>|&gt;)|(&lt;|<)\/script(>|&gt;)/gi,inside: Prism.languages.markup.tag.inside},rest: Prism.languages.javascript}}}), function() {
    if (self.Prism && self.document && document.querySelector) {
        var a = {js: "javascript",html: "markup",svg: "markup"};
        Array.prototype.slice.call(document.querySelectorAll("pre[data-src]")).forEach(function(b) {
            var c = b.getAttribute("data-src"), d = (c.match(/\.(\w+)$/) || [, ""])[1], e = a[d] || d, f = document.createElement("code");
            f.className = "language-" + e, b.textContent = "", f.textContent = "Loading…", b.appendChild(f);
            var g = new XMLHttpRequest;
            g.open("GET", c, !0), g.onreadystatechange = function() {
                4 == g.readyState && (g.status < 400 && g.responseText ? (f.textContent = g.responseText, Prism.highlightElement(f)) : f.textContent = g.status >= 400 ? "✖ Error " + g.status + " while fetching file: " + g.statusText : "✖ Error: File does not exist or is empty")
            }, g.send(null)
        })
    }
}(), Prism.languages.aspnet = Prism.languages.extend("markup", {"page-directive tag": {pattern: /(<|&lt;)%\s*@.*%>/gi,inside: {"page-directive tag": /&lt;%\s*@\s*(?:Assembly|Control|Implements|Import|Master|MasterType|OutputCache|Page|PreviousPageType|Reference|Register)?|%>/gi,rest: Prism.languages.markup.tag.inside}},"directive tag": {pattern: /(<|&lt;)%.*%>/gi,inside: {"directive tag": /(<|&lt;)%\s*?[$=%#:]{0,2}|%>/gi,rest: Prism.languages.csharp}}}), Prism.languages.insertBefore("inside", "punctuation", {"directive tag": Prism.languages.aspnet["directive tag"]}, Prism.languages.aspnet.tag.inside["attr-value"]), Prism.languages.insertBefore("aspnet", "comment", {"asp comment": /&lt;%--[\w\W]*?--%>/g}), Prism.languages.insertBefore("aspnet", Prism.languages.javascript ? "script" : "tag", {"asp script": {pattern: /(&lt;|<)script(?=.*runat=['"]?server['"]?)[\w\W]*?(>|&gt;)[\w\W]*?(&lt;|<)\/script(>|&gt;)/gi,inside: {tag: {pattern: /&lt;\/?script\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|\w+))?\s*)*\/?>/gi,inside: Prism.languages.aspnet.tag.inside},rest: Prism.languages.csharp || {}}}}), Prism.languages.aspnet.style && (Prism.languages.aspnet.style.inside.tag.pattern = /&lt;\/?style\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|\w+))?\s*)*\/?>/gi, Prism.languages.aspnet.style.inside.tag.inside = Prism.languages.aspnet.tag.inside), Prism.languages.aspnet.script && (Prism.languages.aspnet.script.inside.tag.pattern = Prism.languages.aspnet["asp script"].inside.tag.pattern, Prism.languages.aspnet.script.inside.tag.inside = Prism.languages.aspnet.tag.inside), Prism.languages.bash = Prism.languages.extend("clike", {comment: {pattern: /(^|[^"{\\])(#.*?(\r?\n|$))/g,lookbehind: !0},string: {pattern: /("|')(\\?[\s\S])*?\1/g,inside: {property: /\$([a-zA-Z0-9_#\?\-\*!@]+|\{[^\}]+\})/g}},keyword: /\b(if|then|else|elif|fi|for|break|continue|while|in|case|function|select|do|done|until|echo|exit|return|set|declare)\b/g}), Prism.languages.insertBefore("bash", "keyword", {property: /\$([a-zA-Z0-9_#\?\-\*!@]+|\{[^}]+\})/g}), Prism.languages.insertBefore("bash", "comment", {important: /(^#!\s*\/bin\/bash)|(^#!\s*\/bin\/sh)/g}), Prism.languages.c = Prism.languages.extend("clike", {keyword: /\b(asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/g,operator: /[-+]{1,2}|!=?|&lt;{1,2}=?|&gt;{1,2}=?|\-&gt;|={1,2}|\^|~|%|(&amp;){1,2}|\|?\||\?|\*|\//g}), Prism.languages.insertBefore("c", "keyword", {property: {pattern: /#[a-zA-Z]+\ .*/g,inside: {property: /&lt;[a-zA-Z.]+>/g}}}), Prism.languages.clike = {comment: {pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|(^|[^:])\/\/.*?(\r?\n|$))/g,lookbehind: !0},string: /("|')(\\?.)*?\1/g,"class-name": {pattern: /((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/gi,lookbehind: !0,inside: {punctuation: /(\.|\\)/}},keyword: /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/g,"boolean": /\b(true|false)\b/g,"function": {pattern: /[a-z0-9_]+\(/gi,inside: {punctuation: /\(/}},number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g,operator: /[-+]{1,2}|!|&lt;=?|>=?|={1,3}|(&amp;){1,2}|\|?\||\?|\*|\/|\~|\^|\%/g,ignore: /&(lt|gt|amp);/gi,punctuation: /[{}[\];(),.:]/g}, Prism.languages.cpp = Prism.languages.extend("c", {keyword: /\b(alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|class|compl|const|constexpr|const_cast|continue|decltype|default|delete|delete\[\]|do|double|dynamic_cast|else|enum|explicit|export|extern|float|for|friend|goto|if|inline|int|long|mutable|namespace|new|new\[\]|noexcept|nullptr|operator|private|protected|public|register|reinterpret_cast|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/g,operator: /[-+]{1,2}|!=?|&lt;{1,2}=?|&gt;{1,2}=?|\-&gt;|:{1,2}|={1,2}|\^|~|%|(&amp;){1,2}|\|?\||\?|\*|\/|\b(and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/g}), Prism.languages.csharp = Prism.languages.extend("clike", {keyword: /\b(abstract|as|base|bool|break|byte|case|catch|char|checked|class|const|continue|decimal|default|delegate|do|double|else|enum|event|explicit|extern|false|finally|fixed|float|for|foreach|goto|if|implicit|in|int|interface|internal|is|lock|long|namespace|new|null|object|operator|out|override|params|private|protected|public|readonly|ref|return|sbyte|sealed|short|sizeof|stackalloc|static|string|struct|switch|this|throw|true|try|typeof|uint|ulong|unchecked|unsafe|ushort|using|virtual|void|volatile|while|add|alias|ascending|async|await|descending|dynamic|from|get|global|group|into|join|let|orderby|partial|remove|select|set|value|var|where|yield)\b/g,string: /@?("|')(\\?.)*?\1/g,preprocessor: /^\s*#.*/gm,number: /\b-?(0x)?\d*\.?\d+\b/g}), Prism.languages.css.selector = {pattern: /[^\{\}\s][^\{\}]*(?=\s*\{)/g,inside: {"pseudo-element": /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/g,"pseudo-class": /:[-\w]+(?:\(.*\))?/g,"class": /\.[-:\.\w]+/g,id: /#[-:\.\w]+/g}}, Prism.languages.insertBefore("css", "ignore", {hexcode: /#[\da-f]{3,6}/gi,entity: /\\[\da-f]{1,8}/gi,number: /[\d%\.]+/g,"function": /(attr|calc|cross-fade|cycle|element|hsla?|image|lang|linear-gradient|matrix3d|matrix|perspective|radial-gradient|repeating-linear-gradient|repeating-radial-gradient|rgba?|rotatex|rotatey|rotatez|rotate3d|rotate|scalex|scaley|scalez|scale3d|scale|skewx|skewy|skew|steps|translatex|translatey|translatez|translate3d|translate|url|var)/gi}), Prism.languages.gherkin = {comment: {pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|((#)|(\/\/)).*?(\r?\n|$))/g,lookbehind: !0},string: /("|')(\\?.)*?\1/g,atrule: /\b(And|Given|When|Then|In order to|As an|I want to|As a)\b/g,keyword: /\b(Scenario Outline|Scenario|Feature|Background|Story)\b/g}, Prism.languages.go = Prism.languages.extend("clike", {keyword: /\b(break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/g,builtin: /\b(bool|byte|complex(64|128)|error|float(32|64)|rune|string|u?int(8|16|32|64|)|uintptr|append|cap|close|complex|copy|delete|imag|len|make|new|panic|print(ln)?|real|recover)\b/g,"boolean": /\b(_|iota|nil|true|false)\b/g,operator: /([(){}\[\]]|[*\/%^!]=?|\+[=+]?|-[>=-]?|\|[=|]?|>[=>]?|&lt;(&lt;|[=-])?|==?|&amp;(&amp;|=|^=?)?|\.(\.\.)?|[,;]|:=?)/g,number: /\b(-?(0x[a-f\d]+|(\d+\.?\d*|\.\d+)(e[-+]?\d+)?)i?)\b/gi,string: /("|'|`)(\\?.|\r|\n)*?\1/g}), delete Prism.languages.go["class-name"], Prism.languages.groovy = Prism.languages.extend("clike", {keyword: /\b(as|def|in|abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|native|new|package|private|protected|public|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|trait|transient|try|void|volatile|while)\b/g,string: /("""|''')[\W\w]*?\1|("|'|\/)[\W\w]*?\2|(\$\/)(\$\/\$|[\W\w])*?\/\$/g,number: /\b0b[01_]+\b|\b0x[\da-f_]+(\.[\da-f_p\-]+)?\b|\b[\d_]+(\.[\d_]+[e]?[\d]*)?[glidf]\b|[\d_]+(\.[\d_]+)?\b/gi,operator: {pattern: /(^|[^.])(={0,2}~|\?\.|\*?\.@|\.&amp;|\.{1,2}(?!\.)|\.{2}(&lt;)?(?=\w)|->|\?:|[-+]{1,2}|!|&lt;=>|>{1,3}|(&lt;){1,2}|={1,2}|(&amp;){1,2}|\|{1,2}|\?|\*{1,2}|\/|\^|%)/g,lookbehind: !0},punctuation: /\.+|[{}[\];(),:$]/g}), Prism.languages.insertBefore("groovy", "punctuation", {"spock-block": /\b(setup|given|when|then|and|cleanup|expect|where):/g}), Prism.languages.insertBefore("groovy", "function", {annotation: {pattern: /(^|[^.])@\w+/,lookbehind: !0}}), Prism.hooks.add("wrap", function(a) {
    if ("groovy" === a.language && "string" === a.type) {
        var b = a.content[0];
        if ("'" != b) {
            var c = /([^\\])(\$(\{.*?\}|[\w\.]+))/;
            "$" === b && (c = /([^\$])(\$(\{.*?\}|[\w\.]+))/), a.content = Prism.highlight(a.content, {expression: {pattern: c,lookbehind: !0,inside: Prism.languages.groovy}}), a.classes.push("/" === b ? "regex" : "gstring")
        }
    }
}), Prism.languages.http = {"request-line": {pattern: /^(POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b\shttps?:\/\/\S+\sHTTP\/[0-9.]+/g,inside: {property: /^\b(POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b/g,"attr-name": /:\w+/g}},"response-status": {pattern: /^HTTP\/1.[01] [0-9]+.*/g,inside: {property: /[0-9]+[A-Z\s-]+$/g}},keyword: /^[\w-]+:(?=.+)/gm};
var httpLanguages = {"application/json": Prism.languages.javascript,"application/xml": Prism.languages.markup,"text/xml": Prism.languages.markup,"text/html": Prism.languages.markup};
for (var contentType in httpLanguages)
    if (httpLanguages[contentType]) {
        var options = {};
        options[contentType] = {pattern: new RegExp("(content-type:\\s*" + contentType + "[\\w\\W]*?)\\n\\n[\\w\\W]*", "gi"),lookbehind: !0,inside: {rest: httpLanguages[contentType]}}, Prism.languages.insertBefore("http", "keyword", options)
    }
Prism.languages.java = Prism.languages.extend("clike", {keyword: /\b(abstract|continue|for|new|switch|assert|default|goto|package|synchronized|boolean|do|if|private|this|break|double|implements|protected|throw|byte|else|import|public|throws|case|enum|instanceof|return|transient|catch|extends|int|short|try|char|final|interface|static|void|class|finally|long|strictfp|volatile|const|float|native|super|while)\b/g,number: /\b0b[01]+\b|\b0x[\da-f]*\.?[\da-fp\-]+\b|\b\d*\.?\d+[e]?[\d]*[df]\b|\W\d*\.?\d+\b/gi,operator: {pattern: /([^\.]|^)([-+]{1,2}|!|=?&lt;|=?&gt;|={1,2}|(&amp;){1,2}|\|?\||\?|\*|\/|%|\^|(&lt;){2}|($gt;){2,3}|:|~)/g,lookbehind: !0}}), Prism.languages.nsis = {comment: {pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|(^|[^:])(#|;).*?(\r?\n|$))/g,lookbehind: !0},string: /("|')(\\?.)*?\1/g,keyword: /\b(Abort|Add(BrandingImage|Size)|AdvSplash|Allow(RootDirInstall|SkipFiles)|AutoCloseWindow|Banner|BG(Font|Gradient|Image)|BrandingText|BringToFront|Call(\b|InstDLL)|Caption|ChangeUI|CheckBitmap|ClearErrors|CompletedText|ComponentText|CopyFiles|CRCCheck|Create(Directory|Font|ShortCut)|Delete(\b|INISec|INIStr|RegKey|RegValue)|Detail(Print|sButtonText)|Dialer|Dir(Text|Var|Verify)|EnableWindow|Enum(RegKey|RegValue)|Exch|Exec(\b|Shell|Wait)|ExpandEnvStrings|File(\b|BufSize|Close|ErrorText|Open|Read|ReadByte|ReadUTF16LE|ReadWord|WriteUTF16LE|Seek|Write|WriteByte|WriteWord)|Find(Close|First|Next|Window)|FlushINI|Get(CurInstType|CurrentAddress|DlgItem|DLLVersion|DLLVersionLocal|ErrorLevel|FileTime|FileTimeLocal|FullPathName|Function(\b|Address|End)|InstDirError|LabelAddress|TempFileName)|Goto|HideWindow|Icon|If(Abort|Errors|FileExists|RebootFlag|Silent)|InitPluginsDir|Install(ButtonText|Colors|Dir|DirRegKey)|InstProgressFlags|Inst(Type|TypeGetText|TypeSetText)|Int(Cmp|CmpU|Fmt|Op)|IsWindow|Lang(DLL|String)|License(BkColor|Data|ForceSelection|LangString|Text)|LoadLanguageFile|LockWindow|Log(Set|Text)|Manifest(DPIAware|SupportedOS)|Math|MessageBox|MiscButtonText|Name|Nop|ns(Dialogs|Exec)|NSISdl|OutFile|Page(\b|Callbacks)|Pop|Push|Quit|Read(EnvStr|INIStr|RegDWORD|RegStr)|Reboot|RegDLL|Rename|RequestExecutionLevel|ReserveFile|Return|RMDir|SearchPath|Section(\b|End|GetFlags|GetInstTypes|GetSize|GetText|Group|In|SetFlags|SetInstTypes|SetSize|SetText)|SendMessage|Set(AutoClose|BrandingImage|Compress|Compressor|CompressorDictSize|CtlColors|CurInstType|DatablockOptimize|DateSave|DetailsPrint|DetailsView|ErrorLevel|Errors|FileAttributes|Font|OutPath|Overwrite|PluginUnload|RebootFlag|RegView|ShellVarContext|Silent)|Show(InstDetails|UninstDetails|Window)|Silent(Install|UnInstall)|Sleep|SpaceTexts|Splash|StartMenu|Str(Cmp|CmpS|Cpy|Len)|SubCaption|System|Unicode|Uninstall(ButtonText|Caption|Icon|SubCaption|Text)|UninstPage|UnRegDLL|UserInfo|Var|VI(AddVersionKey|FileVersion|ProductVersion)|VPatch|WindowIcon|WriteINIStr|WriteRegBin|WriteRegDWORD|WriteRegExpandStr|Write(RegStr|Uninstaller)|XPStyle)\b/g,property: /\b(admin|all|auto|both|colored|false|force|hide|highest|lastused|leave|listonly|none|normal|notset|off|on|open|print|show|silent|silentlog|smooth|textonly|true|user|ARCHIVE|FILE_(ATTRIBUTE_ARCHIVE|ATTRIBUTE_NORMAL|ATTRIBUTE_OFFLINE|ATTRIBUTE_READONLY|ATTRIBUTE_SYSTEM|ATTRIBUTE_TEMPORARY)|HK(CR|CU|DD|LM|PD|U)|HKEY_(CLASSES_ROOT|CURRENT_CONFIG|CURRENT_USER|DYN_DATA|LOCAL_MACHINE|PERFORMANCE_DATA|USERS)|ID(ABORT|CANCEL|IGNORE|NO|OK|RETRY|YES)|MB_(ABORTRETRYIGNORE|DEFBUTTON1|DEFBUTTON2|DEFBUTTON3|DEFBUTTON4|ICONEXCLAMATION|ICONINFORMATION|ICONQUESTION|ICONSTOP|OK|OKCANCEL|RETRYCANCEL|RIGHT|RTLREADING|SETFOREGROUND|TOPMOST|USERICON|YESNO)|NORMAL|OFFLINE|READONLY|SHCTX|SHELL_CONTEXT|SYSTEM|TEMPORARY)\b/g,variable: /(\$(\(|\{)?[-_\w]+)(\)|\})?/i,number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g,operator: /[-+]{1,2}|&lt;=?|>=?|={1,3}|(&amp;){1,2}|\|?\||\?|\*|\/|\~|\^|\%/g,punctuation: /[{}[\];(),.:]/g,important: /\!(addincludedir|addplugindir|appendfile|cd|define|delfile|echo|else|endif|error|execute|finalize|getdllversionsystem|ifdef|ifmacrodef|ifmacrondef|ifndef|if|include|insertmacro|macroend|macro|packhdr|searchparse|searchreplace|tempfile|undef|verbose|warning)\b/gi}, Prism.languages.php = Prism.languages.extend("clike", {keyword: /\b(and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/gi,constant: /\b[A-Z0-9_]{2,}\b/g,comment: {pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|(^|[^:])(\/\/|#).*?(\r?\n|$))/g,lookbehind: !0}}), Prism.languages.insertBefore("php", "keyword", {delimiter: /(\?>|&lt;\?php|&lt;\?)/gi,variable: /(\$\w+)\b/gi,"package": {pattern: /(\\|namespace\s+|use\s+)[\w\\]+/g,lookbehind: !0,inside: {punctuation: /\\/}}}), Prism.languages.insertBefore("php", "operator", {property: {pattern: /(->)[\w]+/g,lookbehind: !0}}), Prism.languages.markup && (Prism.hooks.add("before-highlight", function(a) {
    "php" === a.language && (a.tokenStack = [], a.code = a.code.replace(/(?:&lt;\?php|&lt;\?|<\?php|<\?)[\w\W]*?(?:\?&gt;|\?>)/gi, function(b) {
        return a.tokenStack.push(b), "{{{PHP" + a.tokenStack.length + "}}}"
    }))
}), Prism.hooks.add("after-highlight", function(a) {
    if ("php" === a.language) {
        for (var b, c = 0; b = a.tokenStack[c]; c++)
            a.highlightedCode = a.highlightedCode.replace("{{{PHP" + (c + 1) + "}}}", Prism.highlight(b, a.grammar, "php"));
        a.element.innerHTML = a.highlightedCode
    }
}), Prism.hooks.add("wrap", function(a) {
    "php" === a.language && "markup" === a.type && (a.content = a.content.replace(/(\{\{\{PHP[0-9]+\}\}\})/g, '<span class="token php">$1</span>'))
}), Prism.languages.insertBefore("php", "comment", {markup: {pattern: /(&lt;|<)[^?]\/?(.*?)(>|&gt;)/g,inside: Prism.languages.markup},php: /\{\{\{PHP[0-9]+\}\}\}/g})), Prism.languages.insertBefore("php", "variable", {"this": /\$this/g,global: /\$_?(GLOBALS|SERVER|GET|POST|FILES|REQUEST|SESSION|ENV|COOKIE|HTTP_RAW_POST_DATA|argc|argv|php_errormsg|http_response_header)/g,scope: {pattern: /\b[\w\\]+::/g,inside: {keyword: /(static|self|parent)/,punctuation: /(::|\\)/}}}), Prism.languages.python = {comment: {pattern: /(^|[^\\])#.*?(\r?\n|$)/g,lookbehind: !0},string: /("|')(\\?.)*?\1/g,keyword: /\b(as|assert|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|pass|print|raise|return|try|while|with|yield)\b/g,"boolean": /\b(True|False)\b/g,number: /\b-?(0x)?\d*\.?[\da-f]+\b/g,operator: /[-+]{1,2}|=?&lt;|=?&gt;|!|={1,2}|(&){1,2}|(&amp;){1,2}|\|?\||\?|\*|\/|~|\^|%|\b(or|and|not)\b/g,ignore: /&(lt|gt|amp);/gi,punctuation: /[{}[\];(),.:]/g}, Prism.languages.ruby = Prism.languages.extend("clike", {comment: /#[^\r\n]*(\r?\n|$)/g,keyword: /\b(alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|false|for|if|in|module|new|next|nil|not|or|raise|redo|require|rescue|retry|return|self|super|then|throw|true|undef|unless|until|when|while|yield)\b/g,builtin: /\b(Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|File|Fixnum|Fload|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,constant: /\b[A-Z][a-zA-Z_0-9]*[?!]?\b/g}), Prism.languages.insertBefore("ruby", "keyword", {regex: {pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,lookbehind: !0},variable: /[@$]+\b[a-zA-Z_][a-zA-Z_0-9]*[?!]?\b/g,symbol: /:\b[a-zA-Z_][a-zA-Z_0-9]*[?!]?\b/g}), Prism.languages.scss = Prism.languages.extend("css", {comment: {pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|\/\/.*?(\r?\n|$))/g,lookbehind: !0},atrule: /@[\w-]+(?=\s+(\(|\{|;))/gi,url: /([-a-z]+-)*url(?=\()/gi,selector: /([^@;\{\}\(\)]?([^@;\{\}\(\)]|&amp;|\#\{\$[-_\w]+\})+)(?=\s*\{(\}|\s|[^\}]+(:|\{)[^\}]+))/gm}), Prism.languages.insertBefore("scss", "atrule", {keyword: /@(if|else if|else|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)|(?=@for\s+\$[-_\w]+\s)+from/i}), Prism.languages.insertBefore("scss", "property", {variable: /((\$[-_\w]+)|(#\{\$[-_\w]+\}))/i}), Prism.languages.insertBefore("scss", "ignore", {placeholder: /%[-_\w]+/i,statement: /\B!(default|optional)\b/gi,"boolean": /\b(true|false)\b/g,"null": /\b(null)\b/g,operator: /\s+([-+]{1,2}|={1,2}|!=|\|?\||\?|\*|\/|\%)\s+/g}), Prism.languages.sql = {comment: {pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|((--)|(\/\/)|#).*?(\r?\n|$))/g,lookbehind: !0},string: /("|')(\\?.)*?\1/g,keyword: /\b(ACTION|ADD|AFTER|ALGORITHM|ALTER|ANALYZE|APPLY|AS|ASC|AUTHORIZATION|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADE|CASCADED|CASE|CHAIN|CHAR VARYING|CHARACTER VARYING|CHECK|CHECKPOINT|CLOSE|CLUSTERED|COALESCE|COLUMN|COLUMNS|COMMENT|COMMIT|COMMITTED|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS|CONTAINSTABLE|CONTINUE|CONVERT|CREATE|CROSS|CURRENT|CURRENT_DATE|CURRENT_TIME|CURRENT_TIMESTAMP|CURRENT_USER|CURSOR|DATA|DATABASE|DATABASES|DATETIME|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DOUBLE PRECISION|DROP|DUMMY|DUMP|DUMPFILE|DUPLICATE KEY|ELSE|ENABLE|ENCLOSED BY|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPE|ESCAPED BY|EXCEPT|EXEC|EXECUTE|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR|FOR EACH ROW|FORCE|FOREIGN|FREETEXT|FREETEXTTABLE|FROM|FULL|FUNCTION|GEOMETRY|GEOMETRYCOLLECTION|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|IDENTITY|IDENTITY_INSERT|IDENTITYCOL|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTO|INVOKER|ISOLATION LEVEL|JOIN|KEY|KEYS|KILL|LANGUAGE SQL|LAST|LEFT|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONGBLOB|LONGTEXT|MATCH|MATCHED|MEDIUMBLOB|MEDIUMINT|MEDIUMTEXT|MERGE|MIDDLEINT|MODIFIES SQL DATA|MODIFY|MULTILINESTRING|MULTIPOINT|MULTIPOLYGON|NATIONAL|NATIONAL CHAR VARYING|NATIONAL CHARACTER|NATIONAL CHARACTER VARYING|NATIONAL VARCHAR|NATURAL|NCHAR|NCHAR VARCHAR|NEXT|NO|NO SQL|NOCHECK|NOCYCLE|NONCLUSTERED|NULLIF|NUMERIC|OF|OFF|OFFSETS|ON|OPEN|OPENDATASOURCE|OPENQUERY|OPENROWSET|OPTIMIZE|OPTION|OPTIONALLY|ORDER|OUT|OUTER|OUTFILE|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREV|PRIMARY|PRINT|PRIVILEGES|PROC|PROCEDURE|PUBLIC|PURGE|QUICK|RAISERROR|READ|READS SQL DATA|READTEXT|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEATABLE|REPLICATION|REQUIRE|RESTORE|RESTRICT|RETURN|RETURNS|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROWCOUNT|ROWGUIDCOL|ROWS?|RTREE|RULE|SAVE|SAVEPOINT|SCHEMA|SELECT|SERIAL|SERIALIZABLE|SESSION|SESSION_USER|SET|SETUSER|SHARE MODE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|START|STARTING BY|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLE|TABLES|TABLESPACE|TEMPORARY|TEMPTABLE|TERMINATED BY|TEXT|TEXTSIZE|THEN|TIMESTAMP|TINYBLOB|TINYINT|TINYTEXT|TO|TOP|TRAN|TRANSACTION|TRANSACTIONS|TRIGGER|TRUNCATE|TSEQUAL|TYPE|TYPES|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNPIVOT|UPDATE|UPDATETEXT|USAGE|USE|USER|USING|VALUE|VALUES|VARBINARY|VARCHAR|VARCHARACTER|VARYING|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH|WITH ROLLUP|WITHIN|WORK|WRITE|WRITETEXT)\b/gi,"boolean": /\b(TRUE|FALSE|NULL)\b/gi,number: /\b-?(0x)?\d*\.?[\da-f]+\b/g,operator: /\b(ALL|AND|ANY|BETWEEN|EXISTS|IN|LIKE|NOT|OR|IS|UNIQUE|CHARACTER SET|COLLATE|DIV|OFFSET|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b|[-+]{1}|!|=?&lt;|=?&gt;|={1}|(&amp;){1,2}|\|?\||\?|\*|\//gi,ignore: /&(lt|gt|amp);/gi,punctuation: /[;[\]()`,.]/g}, function() {
    if (self.Prism) {
        var a = /\b([a-z]{3,7}:\/\/|tel:)[\w-+%~/.:#=?&amp;]+/, b = /\b\S+@[\w.]+[a-z]{2}/, c = /\[([^\]]+)]\(([^)]+)\)/, d = ["comment", "url", "attr-value", "string"];
        for (var e in Prism.languages) {
            var f = Prism.languages[e];
            Prism.languages.DFS(f, function(e, f) {
                d.indexOf(e) > -1 && (f.pattern || (f = this[e] = {pattern: f}), f.inside = f.inside || {}, "comment" == e && (f.inside["md-link"] = c), "attr-value" == e ? Prism.languages.insertBefore("inside", "punctuation", {"url-link": a}, f) : f.inside["url-link"] = a, f.inside["email-link"] = b)
            }), f["url-link"] = a, f["email-link"] = b
        }
        Prism.hooks.add("wrap", function(a) {
            if (/-link$/.test(a.type)) {
                a.tag = "a";
                var b = a.content;
                if ("email-link" == a.type && 0 != b.indexOf("mailto:"))
                    b = "mailto:" + b;
                else if ("md-link" == a.type) {
                    var d = a.content.match(c);
                    b = d[2], a.content = d[1]
                }
                a.attributes.href = b
            }
        })
    }
}(), function(a) {
    function b(b, d, e) {
        var f = this;
        return this.on("click.pjax", b, function(b) {
            var g = a.extend({}, m(d, e));
            g.container || (g.container = a(this).attr("data-pjax") || f), c(b, g)
        })
    }
    function c(b, c, d) {
        d = m(c, d);
        var f = b.currentTarget;
        if ("A" !== f.tagName.toUpperCase())
            throw "$.fn.pjax or $.pjax.click requires an anchor element";
        if (!(b.which > 1 || b.metaKey || b.ctrlKey || b.shiftKey || b.altKey || location.protocol !== f.protocol || location.hostname !== f.hostname || f.hash && f.href.replace(f.hash, "") === location.href.replace(location.hash, "") || f.href === location.href + "#" || b.isDefaultPrevented())) {
            var g = {url: f.href,container: a(f).attr("data-pjax"),target: f}, h = a.extend({}, g, d), i = a.Event("pjax:click");
            a(f).trigger(i, [h]), i.isDefaultPrevented() || (e(h), b.preventDefault(), a(f).trigger("pjax:clicked", [h]))
        }
    }
    function d(b, c, d) {
        d = m(c, d);
        var f = b.currentTarget;
        if ("FORM" !== f.tagName.toUpperCase())
            throw "$.pjax.submit requires a form element";
        var g = {type: f.method.toUpperCase(),url: f.action,data: a(f).serializeArray(),container: a(f).attr("data-pjax"),target: f};
        e(a.extend({}, g, d)), b.preventDefault()
    }
    function e(b) {
        function c(b, c) {
            var e = a.Event(b, {relatedTarget: d});
            return h.trigger(e, c), !e.isDefaultPrevented()
        }
        b = a.extend(!0, {}, a.ajaxSettings, e.defaults, b), a.isFunction(b.url) && (b.url = b.url());
        var d = b.target, f = l(b.url).hash, h = b.context = n(b.container);
        b.data || (b.data = {}), b.data._pjax = h.selector;
        var i;
        b.beforeSend = function(a, d) {
            return "GET" !== d.type && (d.timeout = 0), a.setRequestHeader("X-PJAX", "true"), a.setRequestHeader("X-PJAX-Container", h.selector), c("pjax:beforeSend", [a, d]) ? (d.timeout > 0 && (i = setTimeout(function() {
                c("pjax:timeout", [a, b]) && a.abort("timeout")
            }, d.timeout), d.timeout = 0), void (b.requestUrl = l(d.url).href)) : !1
        }, b.complete = function(a, d) {
            i && clearTimeout(i), c("pjax:complete", [a, d, b]), c("pjax:end", [a, b])
        }, b.error = function(a, d, e) {
            var f = q("", a, b), h = c("pjax:error", [a, d, e, b]);
            "GET" == b.type && "abort" !== d && h && g(f.url)
        }, b.success = function(d, i, k) {
            var m = "function" == typeof a.pjax.defaults.version ? a.pjax.defaults.version() : a.pjax.defaults.version, n = k.getResponseHeader("X-PJAX-Version"), o = q(d, k, b);
            if (m && n && m !== n)
                return void g(o.url);
            if (!o.contents)
                return void g(o.url);
            e.state = {id: b.id || j(),url: o.url,title: o.title,container: h.selector,fragment: b.fragment,timeout: b.timeout}, (b.push || b.replace) && window.history.replaceState(e.state, o.title, o.url);
            try {
                document.activeElement.blur()
            } catch (p) {
            }
            o.title && (document.title = o.title), c("pjax:beforeReplace", [o.contents, b]), h.html(o.contents);
            var s = h.find("input[autofocus], textarea[autofocus]").last()[0];
            if (s && document.activeElement !== s && s.focus(), r(o.scripts), "number" == typeof b.scrollTo && a(window).scrollTop(b.scrollTo), "" !== f) {
                var t = l(o.url);
                t.hash = f, e.state.url = t.href, window.history.replaceState(e.state, o.title, t.href);
                var u = a(t.hash);
                u.length && a(window).scrollTop(u.offset().top)
            }
            c("pjax:success", [d, i, k, b])
        }, e.state || (e.state = {id: j(),url: window.location.href,title: document.title,container: h.selector,fragment: b.fragment,timeout: b.timeout}, window.history.replaceState(e.state, document.title));
        var m = e.xhr;
        m && m.readyState < 4 && (m.onreadystatechange = a.noop, m.abort()), e.options = b;
        var m = e.xhr = a.ajax(b);
        return m.readyState > 0 && (b.push && !b.replace && (s(e.state.id, h.clone().contents()), window.history.pushState(null, "", k(b.requestUrl))), c("pjax:start", [m, b]), c("pjax:send", [m, b])), e.xhr
    }
    function f(b, c) {
        var d = {url: window.location.href,push: !1,replace: !0,scrollTo: !1};
        return e(a.extend(d, m(b, c)))
    }
    function g(a) {
        window.history.replaceState(null, "", "#"), window.location.replace(a)
    }
    function h(b) {
        var c = b.state;
        if (c && c.container) {
            if (x && y == c.url)
                return;
            if (e.state && e.state.id === c.id)
                return;
            var d = a(c.container);
            if (d.length) {
                var f, h = A[c.id];
                e.state && (f = e.state.id < c.id ? "forward" : "back", t(f, e.state.id, d.clone().contents()));
                var i = a.Event("pjax:popstate", {state: c,direction: f});
                d.trigger(i);
                var j = {id: c.id,url: c.url,container: d,push: !1,fragment: c.fragment,timeout: c.timeout,scrollTo: !1};
                h ? (d.trigger("pjax:start", [null, j]), c.title && (document.title = c.title), d.trigger("pjax:beforeReplace", [h, j]), d.html(h), e.state = c, d.trigger("pjax:end", [null, j])) : e(j), d[0].offsetHeight
            } else
                g(location.href)
        }
        x = !1
    }
    function i(b) {
        var c = a.isFunction(b.url) ? b.url() : b.url, d = b.type ? b.type.toUpperCase() : "GET", e = a("<form>", {method: "GET" === d ? "GET" : "POST",action: c,style: "display:none"});
        "GET" !== d && "POST" !== d && e.append(a("<input>", {type: "hidden",name: "_method",value: d.toLowerCase()}));
        var f = b.data;
        if ("string" == typeof f)
            a.each(f.split("&"), function(b, c) {
                var d = c.split("=");
                e.append(a("<input>", {type: "hidden",name: d[0],value: d[1]}))
            });
        else if ("object" == typeof f)
            for (key in f)
                e.append(a("<input>", {type: "hidden",name: key,value: f[key]}));
        a(document.body).append(e), e.submit()
    }
    function j() {
        return (new Date).getTime()
    }
    function k(a) {
        return a.replace(/\?_pjax=[^&]+&?/, "?").replace(/_pjax=[^&]+&?/, "").replace(/[\?&]$/, "")
    }
    function l(a) {
        var b = document.createElement("a");
        return b.href = a, b
    }
    function m(b, c) {
        return b && c ? c.container = b : c = a.isPlainObject(b) ? b : {container: b}, c.container && (c.container = n(c.container)), c
    }
    function n(b) {
        if (b = a(b), b.length) {
            if ("" !== b.selector && b.context === document)
                return b;
            if (b.attr("id"))
                return a("#" + b.attr("id"));
            throw "cant get selector for pjax container!"
        }
        throw "no pjax container for " + b.selector
    }
    function o(a, b) {
        return a.filter(b).add(a.find(b))
    }
    function p(b) {
        return a.parseHTML(b, document, !0)
    }
    function q(b, c, d) {
        var e = {};
        if (e.url = k(c.getResponseHeader("X-PJAX-URL") || d.requestUrl), /<html/i.test(b))
            var f = a(p(b.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0])), g = a(p(b.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0]));
        else
            var f = g = a(p(b));
        if (0 === g.length)
            return e;
        if (e.title = o(f, "title").last().text(), d.fragment) {
            if ("body" === d.fragment)
                var h = g;
            else
                var h = o(g, d.fragment).first();
            h.length && (e.contents = h.contents(), e.title || (e.title = h.attr("title") || h.data("title")))
        } else
            /<html/i.test(b) || (e.contents = g);
        return e.contents && (e.contents = e.contents.not(function() {
            return a(this).is("title")
        }), e.contents.find("title").remove(), e.scripts = o(e.contents, "script[src]").remove(), e.contents = e.contents.not(e.scripts)), e.title && (e.title = a.trim(e.title)), e
    }
    function r(b) {
        if (b) {
            var c = a("script[src]");
            b.each(function() {
                var b = this.src, d = c.filter(function() {
                    return this.src === b
                });
                if (!d.length) {
                    var e = document.createElement("script");
                    e.type = a(this).attr("type"), e.src = a(this).attr("src"), document.head.appendChild(e)
                }
            })
        }
    }
    function s(a, b) {
        for (A[a] = b, C.push(a); B.length; )
            delete A[B.shift()];
        for (; C.length > e.defaults.maxCacheLength; )
            delete A[C.shift()]
    }
    function t(a, b, c) {
        var d, e;
        A[b] = c, "forward" === a ? (d = C, e = B) : (d = B, e = C), d.push(b), (b = e.pop()) && delete A[b]
    }
    function u() {
        return a("meta").filter(function() {
            var b = a(this).attr("http-equiv");
            return b && "X-PJAX-VERSION" === b.toUpperCase()
        }).attr("content")
    }
    function v() {
        a.fn.pjax = b, a.pjax = e, a.pjax.enable = a.noop, a.pjax.disable = w, a.pjax.click = c, a.pjax.submit = d, a.pjax.reload = f, a.pjax.defaults = {timeout: 650,push: !0,replace: !1,type: "GET",dataType: "html",scrollTo: 0,maxCacheLength: 20,version: u}, a(window).on("popstate.pjax", h)
    }
    function w() {
        a.fn.pjax = function() {
            return this
        }, a.pjax = i, a.pjax.enable = v, a.pjax.disable = a.noop, a.pjax.click = a.noop, a.pjax.submit = a.noop, a.pjax.reload = function() {
            window.location.reload()
        }, a(window).off("popstate.pjax", h)
    }
    var x = !0, y = window.location.href, z = window.history.state;
    z && z.container && (e.state = z), "state" in window.history && (x = !1);
    var A = {}, B = [], C = [];
    a.inArray("state", a.event.props) < 0 && a.event.props.push("state"), a.support.pjax = window.history && window.history.pushState && window.history.replaceState && !navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]|WebApps\/.+CFNetwork)/), a.support.pjax ? v() : w()
}(jQuery);
var Drawer = function(a, b) {
    "use strict";
    var c = {WebkitTransition: "webkitTransitionEnd",MozTransition: "transitionend",OTransition: "oTransitionEnd otransitionend",transition: "transitionend"}, d = c[b.prefixed("transition")], e = a("body"), f = a("#container"), g = a(".drawer-overlay"), h = {open: function() {
            e.addClass("drawer-open drawer-transition")
        },close: function() {
            e.removeClass("drawer-open")
        },isOpen: function() {
            return e.hasClass("drawer-open")
        },bindOverlay: function() {
            g.on("click", function(a) {
                a.preventDefault(), e.hasClass("drawer-open") && h.close()
            })
        },bindAnchors: function() {
            a(".drawer-list a").on("click", function() {
                h.close()
            })
        },bindContainerTransEnd: function() {
            f.on(d, function() {
                e.hasClass("drawer-open") || e.removeClass("drawer-transition")
            })
        },init: function() {
            h.bindOverlay(), h.bindAnchors(), h.bindContainerTransEnd()
        }};
    return {init: h.init,open: h.open,close: h.close,isOpen: h.isOpen}
}(jQuery, Modernizr), ImageLoader = function(a) {
    "use strict";
    var b = (a("body"), a("#container"), a(".drawer-overlay"), {done: function(a) {
            a.addClass("image-loaded")
        },success: function(a, c) {
            a.css("background-image", "url(" + c.src + ")"), b.done(a)
        },init: function(a) {
            var c = new Image, d = a.data("load-image");
            return d.length && (c.src = d, c.onload = b.success(a, c), c.onerror = b.done(a), c.onabort = b.done(a)), c
        }});
    return {load: b.init}
}(jQuery);
!function(a, b, c, d) {
    "use strict";
    a(function() {
        var e = b.GHOSTIUM, f = a(b), g = a(c), h = a(c.documentElement), i = a(c.body), j = i, k = a(".content", j);
        FastClick.attach(c.body), Drawer.init(), Prism.languages.html = Prism.languages.markup;
        var l = function() {
            a("code").not('[class*="language-"]').addClass(function() {
                var b = a(this).attr("class") || "markup";
                return b = b.replace(/(language|lang)+\-/gi, ""), "language-" + (Prism.languages.hasOwnProperty(b) ? b : "markup")
            }), Prism.highlightAll()
        };
        l();
        var m = function() {
            e.haveDisqus && "object" == typeof DISQUS && a("#disqus_thread").length && DISQUS.reset({reload: !0,config: function() {
                    this.page.identifier = disqus_identifier
                }})
        }, n = function() {
            if (!e.haveDisqus)
                return void a("[data-disqus-identifier]").parent("li").remove();
            if ("object" == typeof DISQUSWIDGETS) {
                var b = c.createElement("script"), d = h.find('head script[src*="disqus.com/count-data.js"]').remove(), f = d.get(0).src.split("?")[0], g = h.find("[data-disqus-identifier]"), i = [];
                g.each(function(b, c) {
                    i.push("1=" + encodeURIComponent(a(c).data("disqus-identifier")))
                }), i.sort(), i.length && (b.async = !0, b.src = f + "?" + i.join("&"), h.find("head").append(b), DISQUSWIDGETS.getCount())
            }
        };
        n();
        var o = function() {
            e.haveGA && "function" == typeof ga && (ga("set", "location", b.location.href), ga("send", "pageview"))
        };
        if (a.support.pjax && e.enablePjax) {
            g.on("pjax:start", function() {
                j.scrollTop(0)
            }), g.on("pjax:end", function() {
                m(), o(), n(), l(), a("[data-load-image]", k).each(function() {
                    ImageLoader.load(a(this))
                })
            });
            var p = {container: "[data-pjax-container]",fragment: "[data-pjax-container]"};
            g.pjax("a[data-pjax]", p), g.on("submit", "form[data-pjax]", function(b) {
                a.pjax.submit(b, p)
            })
        }
        g.on("click", "[data-action]", function(e) {
            var f = a(this), g = f.data("action"), h = function(a, c, e) {
                var f = b.screenLeft !== d ? b.screenLeft : screen.left, g = b.screenTop !== d ? b.screenTop : screen.top, h = screen.width / 2 - e / 2 + f, i = screen.height / 2 - c / 2 + g, j = b.open(a, "", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no, width=" + e + ", height=" + c + ", top=" + i + ", left=" + h);
                return b.focus && j.focus(), j
            };
            switch (e.preventDefault(), g) {
                case "open-drawer":
                    Drawer.open();
                    break;
                case "close-drawer":
                    Drawer.close();
                    break;
                case "share-weibo":
                    h("http://service.weibo.com/share/share.php?title="+ encodeURIComponent(c.title) + "&url=" + encodeURIComponent(location.href), 450, 300);
                    break;
                case "share-gplus":
                    h("https://plus.google.com/share?url=" + encodeURIComponent(location.href), 600, 600);
                    break;
                case "share-facebook":
                    h("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(location.href), 436, 626);
                    break;
                case "share-twitter":
                    h("https://twitter.com/share?url=" + encodeURIComponent(location.href) + "&text=" + encodeURIComponent(c.title), 440, 550)
            }
            return !1
        }), a("[data-load-image]", i).each(function() {
            ImageLoader.load(a(this))
        }), j.on("scroll", function() {
            var b = j.scrollTop(), c = a("#drawer-button");
            0 === b ? c.removeClass("drawer-button-hidden") : c.hasClass("drawer-button-hidden") || c.addClass("drawer-button-hidden")
        }), g.on("click", "a[href^=#]:not([href=#])", function(b) {
            b.preventDefault();
            var c = a(this.hash);
            return c = c.length ? c : a("[name=" + this.hash.slice(1) + "]"), c.length ? (j.animate({scrollTop: c.offset().top}, 500), location.hash = this.hash, !1) : void 0
        }), j.on("touchstart", function() {
        }), i.hasClass("home-template") && a(".wrapper").eq(0).focus(), f.on("orientationchange", function() {
            m()
        })
    })
}(jQuery, window, document);
