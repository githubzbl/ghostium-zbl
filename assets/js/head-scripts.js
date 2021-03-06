 /*!
 * Ghostium
 * A Ghost theme focused on content based on Medium design/ux
 * http://ghostium.oswaldoacauan.com/
 * @author Oswaldo Acauan http://oswaldoacauan.com
 * @version 2.2.1
 * Copyright 2013. MIT licensed.
 */
window.Modernizr = function(a, b, c) {
    function d(a) {
        t.cssText = a
    }
    function e(a, b) {
        return d(x.join(a + ";") + (b || ""))
    }
    function f(a, b) {
        return typeof a === b
    }
    function g(a, b) {
        return !!~("" + a).indexOf(b)
    }
    function h(a, b) {
        for (var d in a) {
            var e = a[d];
            if (!g(e, "-") && t[e] !== c)
                return "pfx" == b ? e : !0
        }
        return !1
    }
    function i(a, b, d) {
        for (var e in a) {
            var g = b[a[e]];
            if (g !== c)
                return d === !1 ? a[e] : f(g, "function") ? g.bind(d || b) : g
        }
        return !1
    }
    function j(a, b, c) {
        var d = a.charAt(0).toUpperCase() + a.slice(1), e = (a + " " + z.join(d + " ") + d).split(" ");
        return f(b, "string") || f(b, "undefined") ? h(e, b) : (e = (a + " " + A.join(d + " ") + d).split(" "), i(e, b, c))
    }
    function k() {
        o.input = function(c) {
            for (var d = 0, e = c.length; e > d; d++)
                E[c[d]] = !!(c[d] in u);
            return E.list && (E.list = !(!b.createElement("datalist") || !a.HTMLDataListElement)), E
        }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")), o.inputtypes = function(a) {
            for (var d, e, f, g = 0, h = a.length; h > g; g++)
                u.setAttribute("type", e = a[g]), d = "text" !== u.type, d && (u.value = v, u.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(e) && u.style.WebkitAppearance !== c ? (q.appendChild(u), f = b.defaultView, d = f.getComputedStyle && "textfield" !== f.getComputedStyle(u, null).WebkitAppearance && 0 !== u.offsetHeight, q.removeChild(u)) : /^(search|tel)$/.test(e) || (d = /^(url|email)$/.test(e) ? u.checkValidity && u.checkValidity() === !1 : u.value != v)), D[a[g]] = !!d;
            return D
        }("search tel url email datetime date month week time datetime-local number range color".split(" "))
    }
    var l, m, n = "2.6.3", o = {}, p = !0, q = b.documentElement, r = "modernizr", s = b.createElement(r), t = s.style, u = b.createElement("input"), v = ":)", w = {}.toString, x = " -webkit- -moz- -o- -ms- ".split(" "), y = "Webkit Moz O ms", z = y.split(" "), A = y.toLowerCase().split(" "), B = {svg: "http://www.w3.org/2000/svg"}, C = {}, D = {}, E = {}, F = [], G = F.slice, H = function(a, c, d, e) {
        var f, g, h, i, j = b.createElement("div"), k = b.body, l = k || b.createElement("body");
        if (parseInt(d, 10))
            for (; d--; )
                h = b.createElement("div"), h.id = e ? e[d] : r + (d + 1), j.appendChild(h);
        return f = ["&#173;", '<style id="s', r, '">', a, "</style>"].join(""), j.id = r, (k ? j : l).innerHTML += f, l.appendChild(j), k || (l.style.background = "", l.style.overflow = "hidden", i = q.style.overflow, q.style.overflow = "hidden", q.appendChild(l)), g = c(j, a), k ? j.parentNode.removeChild(j) : (l.parentNode.removeChild(l), q.style.overflow = i), !!g
    }, I = function(b) {
        var c = a.matchMedia || a.msMatchMedia;
        if (c)
            return c(b).matches;
        var d;
        return H("@media " + b + " { #" + r + " { position: absolute; } }", function(b) {
            d = "absolute" == (a.getComputedStyle ? getComputedStyle(b, null) : b.currentStyle).position
        }), d
    }, J = function() {
        function a(a, e) {
            e = e || b.createElement(d[a] || "div"), a = "on" + a;
            var g = a in e;
            return g || (e.setAttribute || (e = b.createElement("div")), e.setAttribute && e.removeAttribute && (e.setAttribute(a, ""), g = f(e[a], "function"), f(e[a], "undefined") || (e[a] = c), e.removeAttribute(a))), e = null, g
        }
        var d = {select: "input",change: "input",submit: "form",reset: "form",error: "img",load: "img",abort: "img"};
        return a
    }(), K = {}.hasOwnProperty;
    m = f(K, "undefined") || f(K.call, "undefined") ? function(a, b) {
        return b in a && f(a.constructor.prototype[b], "undefined")
    } : function(a, b) {
        return K.call(a, b)
    }, Function.prototype.bind || (Function.prototype.bind = function(a) {
        var b = this;
        if ("function" != typeof b)
            throw new TypeError;
        var c = G.call(arguments, 1), d = function() {
            if (this instanceof d) {
                var e = function() {
                };
                e.prototype = b.prototype;
                var f = new e, g = b.apply(f, c.concat(G.call(arguments)));
                return Object(g) === g ? g : f
            }
            return b.apply(a, c.concat(G.call(arguments)))
        };
        return d
    }), C.flexbox = function() {
        return j("flexWrap")
    }, C.flexboxlegacy = function() {
        return j("boxDirection")
    }, C.canvas = function() {
        var a = b.createElement("canvas");
        return !(!a.getContext || !a.getContext("2d"))
    }, C.canvastext = function() {
        return !(!o.canvas || !f(b.createElement("canvas").getContext("2d").fillText, "function"))
    }, C.webgl = function() {
        return !!a.WebGLRenderingContext
    }, C.touch = function() {
        var c;
        return "ontouchstart" in a || a.DocumentTouch && b instanceof DocumentTouch ? c = !0 : H(["@media (", x.join("touch-enabled),("), r, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(a) {
            c = 9 === a.offsetTop
        }), c
    }, C.geolocation = function() {
        return "geolocation" in navigator
    }, C.postmessage = function() {
        return !!a.postMessage
    }, C.websqldatabase = function() {
        return !!a.openDatabase
    }, C.indexedDB = function() {
        return !!j("indexedDB", a)
    }, C.hashchange = function() {
        return J("hashchange", a) && (b.documentMode === c || b.documentMode > 7)
    }, C.history = function() {
        return !(!a.history || !history.pushState)
    }, C.draganddrop = function() {
        var a = b.createElement("div");
        return "draggable" in a || "ondragstart" in a && "ondrop" in a
    }, C.websockets = function() {
        return "WebSocket" in a || "MozWebSocket" in a
    }, C.rgba = function() {
        return d("background-color:rgba(150,255,150,.5)"), g(t.backgroundColor, "rgba")
    }, C.hsla = function() {
        return d("background-color:hsla(120,40%,100%,.5)"), g(t.backgroundColor, "rgba") || g(t.backgroundColor, "hsla")
    }, C.multiplebgs = function() {
        return d("background:url(https://),url(https://),red url(https://)"), /(url\s*\(.*?){3}/.test(t.background)
    }, C.backgroundsize = function() {
        return j("backgroundSize")
    }, C.borderimage = function() {
        return j("borderImage")
    }, C.borderradius = function() {
        return j("borderRadius")
    }, C.boxshadow = function() {
        return j("boxShadow")
    }, C.textshadow = function() {
        return "" === b.createElement("div").style.textShadow
    }, C.opacity = function() {
        return e("opacity:.55"), /^0.55$/.test(t.opacity)
    }, C.cssanimations = function() {
        return j("animationName")
    }, C.csscolumns = function() {
        return j("columnCount")
    }, C.cssgradients = function() {
        var a = "background-image:", b = "gradient(linear,left top,right bottom,from(#9f9),to(white));", c = "linear-gradient(left top,#9f9, white);";
        return d((a + "-webkit- ".split(" ").join(b + a) + x.join(c + a)).slice(0, -a.length)), g(t.backgroundImage, "gradient")
    }, C.cssreflections = function() {
        return j("boxReflect")
    }, C.csstransforms = function() {
        return !!j("transform")
    }, C.csstransforms3d = function() {
        var a = !!j("perspective");
        return a && "webkitPerspective" in q.style && H("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function(b) {
            a = 9 === b.offsetLeft && 3 === b.offsetHeight
        }), a
    }, C.csstransitions = function() {
        return j("transition")
    }, C.fontface = function() {
        var a;
        return H('@font-face {font-family:"font";src:url("https://")}', function(c, d) {
            var e = b.getElementById("smodernizr"), f = e.sheet || e.styleSheet, g = f ? f.cssRules && f.cssRules[0] ? f.cssRules[0].cssText : f.cssText || "" : "";
            a = /src/i.test(g) && 0 === g.indexOf(d.split(" ")[0])
        }), a
    }, C.generatedcontent = function() {
        var a;
        return H(["#", r, "{font:0/0 a}#", r, ':after{content:"', v, '";visibility:hidden;font:3px/1 a}'].join(""), function(b) {
            a = b.offsetHeight >= 3
        }), a
    }, C.video = function() {
        var a = b.createElement("video"), c = !1;
        try {
            (c = !!a.canPlayType) && (c = new Boolean(c), c.ogg = a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), c.h264 = a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), c.webm = a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""))
        } catch (d) {
        }
        return c
    }, C.audio = function() {
        var a = b.createElement("audio"), c = !1;
        try {
            (c = !!a.canPlayType) && (c = new Boolean(c), c.ogg = a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), c.mp3 = a.canPlayType("audio/mpeg;").replace(/^no$/, ""), c.wav = a.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), c.m4a = (a.canPlayType("audio/x-m4a;") || a.canPlayType("audio/aac;")).replace(/^no$/, ""))
        } catch (d) {
        }
        return c
    }, C.localstorage = function() {
        try {
            return localStorage.setItem(r, r), localStorage.removeItem(r), !0
        } catch (a) {
            return !1
        }
    }, C.sessionstorage = function() {
        try {
            return sessionStorage.setItem(r, r), sessionStorage.removeItem(r), !0
        } catch (a) {
            return !1
        }
    }, C.webworkers = function() {
        return !!a.Worker
    }, C.applicationcache = function() {
        return !!a.applicationCache
    }, C.svg = function() {
        return !!b.createElementNS && !!b.createElementNS(B.svg, "svg").createSVGRect
    }, C.inlinesvg = function() {
        var a = b.createElement("div");
        return a.innerHTML = "<svg/>", (a.firstChild && a.firstChild.namespaceURI) == B.svg
    }, C.smil = function() {
        return !!b.createElementNS && /SVGAnimate/.test(w.call(b.createElementNS(B.svg, "animate")))
    }, C.svgclippaths = function() {
        return !!b.createElementNS && /SVGClipPath/.test(w.call(b.createElementNS(B.svg, "clipPath")))
    };
    for (var L in C)
        m(C, L) && (l = L.toLowerCase(), o[l] = C[L](), F.push((o[l] ? "" : "no-") + l));
    return o.input || k(), o.addTest = function(a, b) {
        if ("object" == typeof a)
            for (var d in a)
                m(a, d) && o.addTest(d, a[d]);
        else {
            if (a = a.toLowerCase(), o[a] !== c)
                return o;
            b = "function" == typeof b ? b() : b, "undefined" != typeof p && p && (q.className += " " + (b ? "" : "no-") + a), o[a] = b
        }
        return o
    }, d(""), s = u = null, function(a, b) {
        function c(a, b) {
            var c = a.createElement("p"), d = a.getElementsByTagName("head")[0] || a.documentElement;
            return c.innerHTML = "x<style>" + b + "</style>", d.insertBefore(c.lastChild, d.firstChild)
        }
        function d() {
            var a = r.elements;
            return "string" == typeof a ? a.split(" ") : a
        }
        function e(a) {
            var b = q[a[o]];
            return b || (b = {}, p++, a[o] = p, q[p] = b), b
        }
        function f(a, c, d) {
            if (c || (c = b), k)
                return c.createElement(a);
            d || (d = e(c));
            var f;
            return f = d.cache[a] ? d.cache[a].cloneNode() : n.test(a) ? (d.cache[a] = d.createElem(a)).cloneNode() : d.createElem(a), f.canHaveChildren && !m.test(a) ? d.frag.appendChild(f) : f
        }
        function g(a, c) {
            if (a || (a = b), k)
                return a.createDocumentFragment();
            c = c || e(a);
            for (var f = c.frag.cloneNode(), g = 0, h = d(), i = h.length; i > g; g++)
                f.createElement(h[g]);
            return f
        }
        function h(a, b) {
            b.cache || (b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, b.frag = b.createFrag()), a.createElement = function(c) {
                return r.shivMethods ? f(c, a, b) : b.createElem(c)
            }, a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + d().join().replace(/\w+/g, function(a) {
                return b.createElem(a), b.frag.createElement(a), 'c("' + a + '")'
            }) + ");return n}")(r, b.frag)
        }
        function i(a) {
            a || (a = b);
            var d = e(a);
            return !r.shivCSS || j || d.hasCSS || (d.hasCSS = !!c(a, "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")), k || h(a, d), a
        }
        var j, k, l = a.html5 || {}, m = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i, n = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i, o = "_html5shiv", p = 0, q = {};
        !function() {
            try {
                var a = b.createElement("a");
                a.innerHTML = "<xyz></xyz>", j = "hidden" in a, k = 1 == a.childNodes.length || function() {
                    b.createElement("a");
                    var a = b.createDocumentFragment();
                    return "undefined" == typeof a.cloneNode || "undefined" == typeof a.createDocumentFragment || "undefined" == typeof a.createElement
                }()
            } catch (c) {
                j = !0, k = !0
            }
        }();
        var r = {elements: l.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS: l.shivCSS !== !1,supportsUnknownElements: k,shivMethods: l.shivMethods !== !1,type: "default",shivDocument: i,createElement: f,createDocumentFragment: g};
        a.html5 = r, i(b)
    }(this, b), o._version = n, o._prefixes = x, o._domPrefixes = A, o._cssomPrefixes = z, o.mq = I, o.hasEvent = J, o.testProp = function(a) {
        return h([a])
    }, o.testAllProps = j, o.testStyles = H, o.prefixed = function(a, b, c) {
        return b ? j(a, b, c) : j(a, "pfx")
    }, q.className = q.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (p ? " js " + F.join(" ") : ""), o
}(this, this.document), function() {
    var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W = [].slice, X = {}.hasOwnProperty, Y = function(a, b) {
        function c() {
            this.constructor = a
        }
        for (var d in b)
            X.call(b, d) && (a[d] = b[d]);
        return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
    }, Z = [].indexOf || function(a) {
        for (var b = 0, c = this.length; c > b; b++)
            if (b in this && this[b] === a)
                return b;
        return -1
    };
    for (t = {catchupTime: 500,initialRate: .03,minTime: 500,ghostTime: 500,maxProgressPerFrame: 10,easeFactor: 1.25,startOnPageLoad: !0,restartOnPushState: !0,restartOnRequestAfter: 500,target: "body",elements: {checkInterval: 100,selectors: ["body"]},eventLag: {minSamples: 10,sampleCount: 3,lagThreshold: 3},ajax: {trackMethods: ["GET"],trackWebSockets: !0,ignoreURLs: []}}, B = function() {
        var a;
        return null != (a = "undefined" != typeof performance && null !== performance && "function" == typeof performance.now ? performance.now() : void 0) ? a : +new Date
    }, D = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame, s = window.cancelAnimationFrame || window.mozCancelAnimationFrame, null == D && (D = function(a) {
        return setTimeout(a, 50)
    }, s = function(a) {
        return clearTimeout(a)
    }), F = function(a) {
        var b, c;
        return b = B(), (c = function() {
            var d;
            return d = B() - b, d >= 33 ? (b = B(), a(d, function() {
                return D(c)
            })) : setTimeout(c, 33 - d)
        })()
    }, E = function() {
        var a, b, c;
        return c = arguments[0], b = arguments[1], a = 3 <= arguments.length ? W.call(arguments, 2) : [], "function" == typeof c[b] ? c[b].apply(c, a) : c[b]
    }, u = function() {
        var a, b, c, d, e, f, g;
        for (b = arguments[0], d = 2 <= arguments.length ? W.call(arguments, 1) : [], f = 0, g = d.length; g > f; f++)
            if (c = d[f])
                for (a in c)
                    X.call(c, a) && (e = c[a], null != b[a] && "object" == typeof b[a] && null != e && "object" == typeof e ? u(b[a], e) : b[a] = e);
        return b
    }, p = function(a) {
        var b, c, d, e, f;
        for (c = b = 0, e = 0, f = a.length; f > e; e++)
            d = a[e], c += Math.abs(d), b++;
        return c / b
    }, w = function(a, b) {
        var c, d, e;
        if (null == a && (a = "options"), null == b && (b = !0), e = document.querySelector("[data-pace-" + a + "]")) {
            if (c = e.getAttribute("data-pace-" + a), !b)
                return c;
            try {
                return JSON.parse(c)
            } catch (f) {
                return d = f, "undefined" != typeof console && null !== console ? console.error("Error parsing inline pace options", d) : void 0
            }
        }
    }, g = function() {
        function a() {
        }
        return a.prototype.on = function(a, b, c, d) {
            var e;
            return null == d && (d = !1), null == this.bindings && (this.bindings = {}), null == (e = this.bindings)[a] && (e[a] = []), this.bindings[a].push({handler: b,ctx: c,once: d})
        }, a.prototype.once = function(a, b, c) {
            return this.on(a, b, c, !0)
        }, a.prototype.off = function(a, b) {
            var c, d, e;
            if (null != (null != (d = this.bindings) ? d[a] : void 0)) {
                if (null == b)
                    return delete this.bindings[a];
                for (c = 0, e = []; c < this.bindings[a].length; )
                    e.push(this.bindings[a][c].handler === b ? this.bindings[a].splice(c, 1) : c++);
                return e
            }
        }, a.prototype.trigger = function() {
            var a, b, c, d, e, f, g, h, i;
            if (c = arguments[0], a = 2 <= arguments.length ? W.call(arguments, 1) : [], null != (g = this.bindings) ? g[c] : void 0) {
                for (e = 0, i = []; e < this.bindings[c].length; )
                    h = this.bindings[c][e], d = h.handler, b = h.ctx, f = h.once, d.apply(null != b ? b : this, a), i.push(f ? this.bindings[c].splice(e, 1) : e++);
                return i
            }
        }, a
    }(), null == window.Pace && (window.Pace = {}), u(Pace, g.prototype), C = Pace.options = u({}, t, window.paceOptions, w()), T = ["ajax", "document", "eventLag", "elements"], P = 0, R = T.length; R > P; P++)
        J = T[P], C[J] === !0 && (C[J] = t[J]);
    i = function(a) {
        function b() {
            return U = b.__super__.constructor.apply(this, arguments)
        }
        return Y(b, a), b
    }(Error), b = function() {
        function a() {
            this.progress = 0
        }
        return a.prototype.getElement = function() {
            var a;
            if (null == this.el) {
                if (a = document.querySelector(C.target), !a)
                    throw new i;
                this.el = document.createElement("div"), this.el.className = "pace pace-active", document.body.className = document.body.className.replace(/pace-done/g, ""), document.body.className += " pace-running", this.el.innerHTML = '<div class="pace-progress">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>', null != a.firstChild ? a.insertBefore(this.el, a.firstChild) : a.appendChild(this.el)
            }
            return this.el
        }, a.prototype.finish = function() {
            var a;
            return a = this.getElement(), a.className = a.className.replace("pace-active", ""), a.className += " pace-inactive", document.body.className = document.body.className.replace("pace-running", ""), document.body.className += " pace-done"
        }, a.prototype.update = function(a) {
            return this.progress = a, this.render()
        }, a.prototype.destroy = function() {
            try {
                this.getElement().parentNode.removeChild(this.getElement())
            } catch (a) {
                i = a
            }
            return this.el = void 0
        }, a.prototype.render = function() {
            var a, b;
            return null == document.querySelector(C.target) ? !1 : (a = this.getElement(), a.children[0].style.width = "" + this.progress + "%", (!this.lastRenderedProgress || this.lastRenderedProgress | 0 !== this.progress | 0) && (a.children[0].setAttribute("data-progress-text", "" + (0 | this.progress) + "%"), this.progress >= 100 ? b = "99" : (b = this.progress < 10 ? "0" : "", b += 0 | this.progress), a.children[0].setAttribute("data-progress", "" + b)), this.lastRenderedProgress = this.progress)
        }, a.prototype.done = function() {
            return this.progress >= 100
        }, a
    }(), h = function() {
        function a() {
            this.bindings = {}
        }
        return a.prototype.trigger = function(a, b) {
            var c, d, e, f, g;
            if (null != this.bindings[a]) {
                for (f = this.bindings[a], g = [], d = 0, e = f.length; e > d; d++)
                    c = f[d], g.push(c.call(this, b));
                return g
            }
        }, a.prototype.on = function(a, b) {
            var c;
            return null == (c = this.bindings)[a] && (c[a] = []), this.bindings[a].push(b)
        }, a
    }(), O = window.XMLHttpRequest, N = window.XDomainRequest, M = window.WebSocket, v = function(a, b) {
        var c, d, e, f;
        f = [];
        for (d in b.prototype)
            try {
                e = b.prototype[d], f.push(null == a[d] && "function" != typeof e ? a[d] = e : void 0)
            } catch (g) {
                c = g
            }
        return f
    }, z = [], Pace.ignore = function() {
        var a, b, c;
        return b = arguments[0], a = 2 <= arguments.length ? W.call(arguments, 1) : [], z.unshift("ignore"), c = b.apply(null, a), z.shift(), c
    }, Pace.track = function() {
        var a, b, c;
        return b = arguments[0], a = 2 <= arguments.length ? W.call(arguments, 1) : [], z.unshift("track"), c = b.apply(null, a), z.shift(), c
    }, I = function(a) {
        var b;
        if (null == a && (a = "GET"), "track" === z[0])
            return "force";
        if (!z.length && C.ajax) {
            if ("socket" === a && C.ajax.trackWebSockets)
                return !0;
            if (b = a.toUpperCase(), Z.call(C.ajax.trackMethods, b) >= 0)
                return !0
        }
        return !1
    }, j = function(a) {
        function b() {
            var a, c = this;
            b.__super__.constructor.apply(this, arguments), a = function(a) {
                var b;
                return b = a.open, a.open = function(d, e) {
                    return I(d) && c.trigger("request", {type: d,url: e,request: a}), b.apply(a, arguments)
                }
            }, window.XMLHttpRequest = function(b) {
                var c;
                return c = new O(b), a(c), c
            }, v(window.XMLHttpRequest, O), null != N && (window.XDomainRequest = function() {
                var b;
                return b = new N, a(b), b
            }, v(window.XDomainRequest, N)), null != M && C.ajax.trackWebSockets && (window.WebSocket = function(a, b) {
                var d;
                return d = null != b ? new M(a, b) : new M(a), I("socket") && c.trigger("request", {type: "socket",url: a,protocols: b,request: d}), d
            }, v(window.WebSocket, M))
        }
        return Y(b, a), b
    }(h), Q = null, x = function() {
        return null == Q && (Q = new j), Q
    }, H = function(a) {
        var b, c, d, e;
        for (e = C.ajax.ignoreURLs, c = 0, d = e.length; d > c; c++)
            if (b = e[c], "string" == typeof b) {
                if (-1 !== a.indexOf(b))
                    return !0
            } else if (b.test(a))
                return !0;
        return !1
    }, x().on("request", function(b) {
        var c, d, e, f, g;
        return f = b.type, e = b.request, g = b.url, H(g) ? void 0 : Pace.running || C.restartOnRequestAfter === !1 && "force" !== I(f) ? void 0 : (d = arguments, c = C.restartOnRequestAfter || 0, "boolean" == typeof c && (c = 0), setTimeout(function() {
            var b, c, g, h, i, j;
            if (b = "socket" === f ? e.readyState < 2 : 0 < (h = e.readyState) && 4 > h) {
                for (Pace.restart(), i = Pace.sources, j = [], c = 0, g = i.length; g > c; c++) {
                    if (J = i[c], J instanceof a) {
                        J.watch.apply(J, d);
                        break
                    }
                    j.push(void 0)
                }
                return j
            }
        }, c))
    }), a = function() {
        function a() {
            var a = this;
            this.elements = [], x().on("request", function() {
                return a.watch.apply(a, arguments)
            })
        }
        return a.prototype.watch = function(a) {
            var b, c, d, e;
            return d = a.type, b = a.request, e = a.url, H(e) ? void 0 : (c = "socket" === d ? new m(b) : new n(b), this.elements.push(c))
        }, a
    }(), n = function() {
        function a(a) {
            var b, c, d, e, f, g, h = this;
            if (this.progress = 0, null != window.ProgressEvent)
                for (c = null, a.addEventListener("progress", function(a) {
                    return h.progress = a.lengthComputable ? 100 * a.loaded / a.total : h.progress + (100 - h.progress) / 2
                }), g = ["load", "abort", "timeout", "error"], d = 0, e = g.length; e > d; d++)
                    b = g[d], a.addEventListener(b, function() {
                        return h.progress = 100
                    });
            else
                f = a.onreadystatechange, a.onreadystatechange = function() {
                    var b;
                    return 0 === (b = a.readyState) || 4 === b ? h.progress = 100 : 3 === a.readyState && (h.progress = 50), "function" == typeof f ? f.apply(null, arguments) : void 0
                }
        }
        return a
    }(), m = function() {
        function a(a) {
            var b, c, d, e, f = this;
            for (this.progress = 0, e = ["error", "open"], c = 0, d = e.length; d > c; c++)
                b = e[c], a.addEventListener(b, function() {
                    return f.progress = 100
                })
        }
        return a
    }(), d = function() {
        function a(a) {
            var b, c, d, f;
            for (null == a && (a = {}), this.elements = [], null == a.selectors && (a.selectors = []), f = a.selectors, c = 0, d = f.length; d > c; c++)
                b = f[c], this.elements.push(new e(b))
        }
        return a
    }(), e = function() {
        function a(a) {
            this.selector = a, this.progress = 0, this.check()
        }
        return a.prototype.check = function() {
            var a = this;
            return document.querySelector(this.selector) ? this.done() : setTimeout(function() {
                return a.check()
            }, C.elements.checkInterval)
        }, a.prototype.done = function() {
            return this.progress = 100
        }, a
    }(), c = function() {
        function a() {
            var a, b, c = this;
            this.progress = null != (b = this.states[document.readyState]) ? b : 100, a = document.onreadystatechange, document.onreadystatechange = function() {
                return null != c.states[document.readyState] && (c.progress = c.states[document.readyState]), "function" == typeof a ? a.apply(null, arguments) : void 0
            }
        }
        return a.prototype.states = {loading: 0,interactive: 50,complete: 100}, a
    }(), f = function() {
        function a() {
            var a, b, c, d, e, f = this;
            this.progress = 0, a = 0, e = [], d = 0, c = B(), b = setInterval(function() {
                var g;
                return g = B() - c - 50, c = B(), e.push(g), e.length > C.eventLag.sampleCount && e.shift(), a = p(e), ++d >= C.eventLag.minSamples && a < C.eventLag.lagThreshold ? (f.progress = 100, clearInterval(b)) : f.progress = 100 * (3 / (a + 3))
            }, 50)
        }
        return a
    }(), l = function() {
        function a(a) {
            this.source = a, this.last = this.sinceLastUpdate = 0, this.rate = C.initialRate, this.catchup = 0, this.progress = this.lastProgress = 0, null != this.source && (this.progress = E(this.source, "progress"))
        }
        return a.prototype.tick = function(a, b) {
            var c;
            return null == b && (b = E(this.source, "progress")), b >= 100 && (this.done = !0), b === this.last ? this.sinceLastUpdate += a : (this.sinceLastUpdate && (this.rate = (b - this.last) / this.sinceLastUpdate), this.catchup = (b - this.progress) / C.catchupTime, this.sinceLastUpdate = 0, this.last = b), b > this.progress && (this.progress += this.catchup * a), c = 1 - Math.pow(this.progress / 100, C.easeFactor), this.progress += c * this.rate * a, this.progress = Math.min(this.lastProgress + C.maxProgressPerFrame, this.progress), this.progress = Math.max(0, this.progress), this.progress = Math.min(100, this.progress), this.lastProgress = this.progress, this.progress
        }, a
    }(), K = null, G = null, q = null, L = null, o = null, r = null, Pace.running = !1, y = function() {
        return C.restartOnPushState ? Pace.restart() : void 0
    }, null != window.history.pushState && (S = window.history.pushState, window.history.pushState = function() {
        return y(), S.apply(window.history, arguments)
    }), null != window.history.replaceState && (V = window.history.replaceState, window.history.replaceState = function() {
        return y(), V.apply(window.history, arguments)
    }), k = {ajax: a,elements: d,document: c,eventLag: f}, (A = function() {
        var a, c, d, e, f, g, h, i;
        for (Pace.sources = K = [], g = ["ajax", "elements", "document", "eventLag"], c = 0, e = g.length; e > c; c++)
            a = g[c], C[a] !== !1 && K.push(new k[a](C[a]));
        for (i = null != (h = C.extraSources) ? h : [], d = 0, f = i.length; f > d; d++)
            J = i[d], K.push(new J(C));
        return Pace.bar = q = new b, G = [], L = new l
    })(), Pace.stop = function() {
        return Pace.trigger("stop"), Pace.running = !1, q.destroy(), r = !0, null != o && ("function" == typeof s && s(o), o = null), A()
    }, Pace.restart = function() {
        return Pace.trigger("restart"), Pace.stop(), Pace.start()
    }, Pace.go = function() {
        var a;
        return Pace.running = !0, q.render(), a = B(), r = !1, o = F(function(b, c) {
            var d, e, f, g, h, i, j, k, m, n, o, p, s, t, u, v;
            for (k = 100 - q.progress, e = o = 0, f = !0, i = p = 0, t = K.length; t > p; i = ++p)
                for (J = K[i], n = null != G[i] ? G[i] : G[i] = [], h = null != (v = J.elements) ? v : [J], j = s = 0, u = h.length; u > s; j = ++s)
                    g = h[j], m = null != n[j] ? n[j] : n[j] = new l(g), f &= m.done, m.done || (e++, o += m.tick(b));
            return d = o / e, q.update(L.tick(b, d)), q.done() || f || r ? (q.update(100), Pace.trigger("done"), setTimeout(function() {
                return q.finish(), Pace.running = !1, Pace.trigger("hide")
            }, Math.max(C.ghostTime, Math.max(C.minTime - (B() - a), 0)))) : c()
        })
    }, Pace.start = function(a) {
        u(C, a), Pace.running = !0;
        try {
            q.render()
        } catch (b) {
            i = b
        }
        return document.querySelector(".pace") ? (Pace.trigger("start"), Pace.go()) : setTimeout(Pace.start, 50)
    }, "function" == typeof define && define.amd ? define(function() {
        return Pace
    }) : "object" == typeof exports ? module.exports = Pace : C.startOnPageLoad && Pace.start()
}.call(this);
