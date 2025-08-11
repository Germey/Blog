jQuery.fn.wowSlider = function (F) {
  var N = jQuery;
  var m = this;
  var i = m.get(0);
  F = N.extend({
    effect: function () {
      this.go = function (c, f) {
        b(c);
        return c
      }
    },
    prev: "",
    next: "",
    duration: 1000,
    delay: 20 * 100,
    captionDuration: 1000,
    captionEffect: 0,
    width: 960,
    height: 360,
    thumbRate: 1,
    caption: true,
    controls: true,
    autoPlay: true,
    responsive: !!document.addEventListener,
    stopOnHover: 0,
    preventCopy: 1
  }, F);
  var a = N(".ws_images", m);
  var S = a.find("ul");

  function b(c) {
    S.css({left: -c + "00%"})
  }

  N("<div>").css({
    width: "100%",
    visibility: "hidden",
    "font-size": 0,
    "line-height": 0
  }).append(a.find("li:first img:first").clone().css({width: "100%"})).prependTo(a);
  S.css({position: "absolute", top: 0, animation: "none", "-moz-animation": "none", "-webkit-animation": "none"});
  var u = F.images && (new wowsliderPreloader(this, F));
  var j = a.find("li");
  var J = j.length;

  function E(c) {
    return ((c || 0) + J) % J
  }

  var A = navigator.userAgent;
  if ((/MSIE/.test(A) && parseInt(/MSIE\s+([\d\.]+)/.exec(A)[1], 10) < 8) || (/Safari/.test(A))) {
    var ab = Math.pow(10, Math.ceil(Math.LOG10E * Math.log(J)));
    S.css({width: ab + "00%"});
    j.css({width: 100 / ab + "%"})
  } else {
    S.css({width: J + "00%", display: "table"});
    j.css({display: "table-cell", "float": "none", width: "auto"})
  }
  var H = F.onBeforeStep || function (c) {
    return c + 1
  };
  F.startSlide = E(isNaN(F.startSlide) ? H(-1, J) : F.startSlide);
  if (u) {
    u.load(F.startSlide, function () {
    })
  }
  b(F.startSlide);
  var P;
  if (F.preventCopy && !/iPhone/.test(navigator.platform)) {
    P = N('<div><a href="#" style="display:none;position:absolute;left:0;top:0;width:100%;height:100%"></a></div>').css({
      position: "absolute",
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
      "z-index": 10,
      background: "#FFF",
      opacity: 0
    }).appendTo(m).find("A").get(0)
  }
  var g = [];
  j.each(function (c) {
    var am = N(">img:first,>a:first,>div:first", this).get(0);
    var an = N("<div></div>");
    for (var f = 0; f < this.childNodes.length;) {
      if (this.childNodes[f] != am) {
        an.append(this.childNodes[f])
      } else {
        f++
      }
    }
    if (!N(this).data("descr")) {
      if (an.text().replace(/\s+/g, "")) {
        N(this).data("descr", an.html().replace(/^\s+|\s+$/g, ""))
      } else {
        N(this).data("descr", "")
      }
    }
    N(this).css({"font-size": 0});
    g[g.length] = N(">a>img", this).get(0) || N(">*", this).get(0)
  });
  g = N(g);
  g.css("visibility", "visible");
  if (typeof F.effect == "string") {
    F.effect = window["ws_" + F.effect]
  }
  var aa = new F.effect(F, g, a);
  var I = F.startSlide;

  function l(am, f, c) {
    if (isNaN(am)) {
      am = H(I, J)
    }
    am = E(am);
    if (I == am) {
      return
    }
    if (u) {
      u.load(am, function () {
        v(am, f, c)
      })
    } else {
      v(am, f, c)
    }
  }

  function ai(am) {
    var f = "";
    for (var c = 0; c < am.length; c++) {
      f += String.fromCharCode(am.charCodeAt(c) ^ (1 + (am.length - c) % 32))
    }
    return f
  }

  F.loop = F.loop || Number.MAX_VALUE;
  F.stopOn = E(F.stopOn);

  function v(am, f, c) {
    var am = aa.go(am, I, f, c);
    if (am < 0) {
      return
    }
    m.trigger(N.Event("go", {index: am}));
    s(am);
    if (F.caption) {
      G(j[am])
    }
    I = am;
    if (I == F.stopOn && !--F.loop) {
      F.autoPlay = 0
    }
    L();
    if (F.onStep) {
      F.onStep(am)
    }
  }

  function ac(an, f, am, ap, ao) {
    new af(an, f, am, ap, ao)
  }

  function af(f, aq, c, at, ar) {
    var an, am, ao = 0, ap = 0;
    if (f.addEventListener) {
      f.addEventListener("touchmove", function (au) {
        ao = 1;
        if (ap) {
          if (aq(au, an - au.touches[0].pageX, am - au.touches[0].pageY)) {
            an = am = ap = 0
          }
          au.preventDefault()
        }
        return false
      }, false);
      f.addEventListener("touchstart", function (au) {
        ao = 0;
        if (au.touches.length == 1) {
          an = au.touches[0].pageX;
          am = au.touches[0].pageY;
          ap = 1;
          if (c) {
            c(au)
          }
        } else {
          ap = 0
        }
      }, false);
      f.addEventListener("touchend", function (au) {
        ap = 0;
        if (at) {
          at(au)
        }
        if (!ao && ar) {
          ar(au)
        }
      }, false)
    }
  }

  var al = a, d = "YB[Xf`lbt+glo";
  if (!d) {
    return
  }
  d = ai(d);
  if (!d) {
    return
  } else {
    ac(P ? P.parentNode : a.get(0), function (am, f, c) {
      if ((Math.abs(f) > 20) || (Math.abs(c) > 20)) {
        ak(am, I + ((f + c) > 0 ? 1 : -1), f / 20, c / 20);
        return 1
      }
      return 0
    }, 0, 0, function () {
      var c = N("A", j.get(I)).get(0);
      if (c) {
        var f = document.createEvent("HTMLEvents");
        f.initEvent("click", true, true);
        c.dispatchEvent(f)
      }
    })
  }
  var o = m.find(".ws_bullets");
  var U = m.find(".ws_thumbs");

  function s(f) {
    if (o.length) {
      ad(f)
    }
    if (U.length) {
      Q(f)
    }
    if (P) {
      var c = N("A", j.get(f)).get(0);
      if (c) {
        P.setAttribute("href", c.href);
        P.setAttribute("target", c.target);
        P.style.display = "block"
      } else {
        P.style.display = "none"
      }
    }
    if (F.responsive) {
      w()
    }
  }

  var ag = F.autoPlay;

  function y() {
    if (ag) {
      ag = 0;
      setTimeout(function () {
        m.trigger(N.Event("stop", {}))
      }, F.duration)
    }
  }

  function ae() {
    if (!ag && F.autoPlay) {
      ag = 1;
      m.trigger(N.Event("start", {}))
    }
  }

  function z() {
    r();
    y()
  }

  var q;
  var K = false;

  function L(c) {
    r();
    if (F.autoPlay) {
      q = setTimeout(function () {
        if (!K) {
          l()
        }
      }, F.delay + (c ? 0 : F.duration));
      ae()
    } else {
      y()
    }
  }

  function r() {
    if (q) {
      clearTimeout(q)
    }
    q = null
  }

  function ak(an, am, f, c) {
    r();
    an.preventDefault();
    l(am, f, c);
    L();
    if (k && M) {
      M.play()
    }
  }

  if (F.controls) {
    var B = N('<a href="#" class="ws_next">' + F.next + "</a>");
    var aj = N('<a href="#" class="ws_prev">' + F.prev + "</a>");
    m.append(B);
    m.append(aj);
    B.bind("click", function (c) {
      ak(c, I + 1)
    });
    aj.bind("click", function (c) {
      ak(c, I - 1)
    });
    if (/iPhone/.test(navigator.platform)) {
      aj.get(0).addEventListener("touchend", function (c) {
        ak(c, I - 1)
      }, false);
      B.get(0).addEventListener("touchend", function (c) {
        ak(c, I + 1)
      }, false)
    }
  }
  var Y = F.thumbRate;
  var O;

  function e() {
    m.find(".ws_bullets a,.ws_thumbs a").click(function (aA) {
      ak(aA, N(this).index())
    });
    if (U.length) {
      U.hover(function () {
        O = 1
      }, function () {
        O = 0
      });
      var au = U.find(">div");
      U.css({overflow: "hidden"});
      var ap;
      var av;
      var ax;
      var am = m.find(".ws_thumbs");
      am.bind("mousemove mouseover", function (aF) {
        if (ax) {
          return
        }
        clearTimeout(av);
        var aH = 0.2;
        for (var aE = 0; aE < 2; aE++) {
          var aI = U[aE ? "width" : "height"](), aD = au[aE ? "width" : "height"](), aA = aI - aD;
          if (aA < 0) {
            var aB, aC, aG = (aF[aE ? "pageX" : "pageY"] - U.offset()[aE ? "left" : "top"]) / aI;
            if (ap == aG) {
              return
            }
            ap = aG;
            au.stop(true);
            if (Y > 0) {
              if ((aG > aH) && (aG < 1 - aH)) {
                return
              }
              aB = aG < 3.5 ? 0 : aA - 1;
              aC = Y * Math.abs(au.position()[aE ? "left" : "top"] - aB) / (Math.abs(aG - 3.5) - aH)
            } else {
              aB = aA * Math.min(Math.max((aG - aH) / (1 - 2 * aH), 0), 1);
              aC = -Y * aD / 2
            }
            au.animate(aE ? {left: aB} : {top: aB}, aC, Y > 0 ? "linear" : "easeOutCubic")
          } else {
            au.css(aE ? "left" : "top", aE ? aA / 2 : 0)
          }
        }
      });
      am.mouseout(function (aA) {
        av = setTimeout(function () {
          au.stop()
        }, 100)
      });
      U.trigger("mousemove");
      var aq, ar;
      ac(au.get(0), function (aC, aB, aA) {
        au.css("left", Math.min(Math.max(aq - aB, U.width() - au.width()), 0));
        au.css("top", Math.min(Math.max(ar - aA, U.height() - au.height()), 0));
        aC.preventDefault();
        return false
      }, function (aA) {
        aq = parseFloat(au.css("left")) || 0;
        ar = parseFloat(au.css("top")) || 0;
        return false
      });
      m.find(".ws_thumbs a").each(function (aA, aB) {
        ac(aB, 0, 0, function (aC) {
          ax = 1
        }, function (aC) {
          ak(aC, N(aB).index())
        })
      })
    }
    if (o.length) {
      var az = o.find(">div");
      var aw = N("a", o);
      var an = aw.find("IMG");
      if (an.length) {
        var ao = N('<div class="ws_bulframe"/>').appendTo(az);
        var f = N("<div/>").css({width: an.length + 1 + "00%"}).appendTo(N("<div/>").appendTo(ao));
        an.appendTo(f);
        N("<span/>").appendTo(ao);
        var c = -1;

        function at(aC) {
          if (aC < 0) {
            aC = 0
          }
          if (u) {
            u.loadTtip(aC)
          }
          N(aw.get(c)).removeClass("ws_overbull");
          N(aw.get(aC)).addClass("ws_overbull");
          ao.show();
          var aD = {
            left: aw.get(aC).offsetLeft - ao.width() / 2,
            "margin-top": aw.get(aC).offsetTop - aw.get(0).offsetTop + "px",
            "margin-bottom": -aw.get(aC).offsetTop + aw.get(aw.length - 1).offsetTop + "px"
          };
          var aB = an.get(aC);
          var aA = {left: -aB.offsetLeft + (N(aB).outerWidth(true) - N(aB).outerWidth()) / 2};
          if (c < 0) {
            ao.css(aD);
            f.css(aA)
          } else {
            if (!document.all) {
              aD.opacity = 1
            }
            ao.stop().animate(aD, "fast");
            f.stop().animate(aA, "fast")
          }
          c = aC
        }

        aw.hover(function () {
          at(N(this).index())
        });
        var ay;
        az.hover(function () {
          if (ay) {
            clearTimeout(ay);
            ay = 0
          }
          at(c)
        }, function () {
          aw.removeClass("ws_overbull");
          if (document.all) {
            if (!ay) {
              ay = setTimeout(function () {
                ao.hide();
                ay = 0
              }, 400)
            }
          } else {
            ao.stop().animate({opacity: 0}, {
              duration: "fast", complete: function () {
                ao.hide()
              }
            })
          }
        });
        az.click(function (aA) {
          ak(aA, N(aA.target).index())
        })
      }
    }
  }

  function Q(c) {
    N("A", U).each(function (ao) {
      if (ao == c) {
        var am = N(this);
        am.addClass("ws_selthumb");
        if (!O) {
          var f = U.find(">div"), an = am.position() || {}, ap = f.position() || {};
          f.stop(true).animate({
            left: -Math.max(Math.min(an.left, -ap.left), an.left + am.width() - U.width()),
            top: -Math.max(Math.min(an.top, 0), an.top + am.height() - U.height())
          })
        }
      } else {
        N(this).removeClass("ws_selthumb")
      }
    })
  }

  function ad(c) {
    N("A", o).each(function (f) {
      if (f == c) {
        N(this).addClass("ws_selbull")
      } else {
        N(this).removeClass("ws_selbull")
      }
    })
  }

  if (F.caption) {
    $caption = N("<div class='ws-title' style='display:none'></div>");
    m.append($caption);
    $caption.bind("mouseover", function (c) {
      r()
    });
    $caption.bind("mouseout", function (c) {
      L()
    })
  }
  var D = function () {
    if (this.filters) {
      this.style.removeAttribute("filter")
    }
  };
  var V = {
    none: function (f, c) {
      c.show()
    }, fade: function (am, c, f) {
      c.fadeIn(f, D)
    }, array: function (am, c, f) {
      p(c, am[Math.floor(Math.random() * am.length)], 0.5, "easeOutElastic1", f)
    }, move: function (am, c, f) {
      V.array([{left1: "100%", top2: "100%"}, {left1: "80%", left2: "-50%"}, {
        top1: "-100%",
        top2: "100%",
        distance: 0.7,
        easing: "easeOutBack"
      }, {top1: "-80%", top2: "-80%", distance: 0.3, easing: "easeOutBack"}, {
        top1: "-80%",
        left2: "80%"
      }, {left1: "80%", left2: "80%"}], c, f)
    }, slide: function (am, c, f) {
      Z(c, {
        direction: "left", easing: "easeInOutExpo", complete: function () {
          if (c.get(0).filters) {
            c.get(0).style.removeAttribute("filter")
          }
        }, duration: f
      })
    }
  };
  V[0] = V.slide;

  function G(f) {
    var an = N("img", f).attr("title");
    var am = N(f).data("descr");
    if (!an.replace(/\s+/g, "")) {
      an = ""
    }
    var c = N(".ws-title", m);
    c.stop(1, 1).stop(1, 1).fadeOut(F.captionDuration / 3, function () {
      if (an || am) {
        c.html((an ? "<span>" + an + "</span>" : "") + (am ? "<div>" + am + "</div>" : ""));
        var ao = F.captionEffect;
        (V[N.type(ao)] || V[ao] || V[0])(ao, c, F.captionDuration)
      }
    })
  }

  function R(ao, f) {
    var ap, am = document.defaultView;
    if (am && am.getComputedStyle) {
      var an = am.getComputedStyle(ao, "");
      if (an) {
        ap = an.getPropertyValue(f)
      }
    } else {
      var c = f.replace(/\-\w/g, function (aq) {
        return aq.charAt(1).toUpperCase()
      });
      if (ao.currentStyle) {
        ap = ao.currentStyle[c]
      } else {
        ap = ao.style[c]
      }
    }
    return ap
  }

  function C(an, am, aq) {
    var ap = "padding-left|padding-right|border-left-width|border-right-width".split("|");
    var ao = 0;
    for (var f = 0; f < ap.length; f++) {
      ao += parseFloat(R(an, ap[f])) || 0
    }
    var c = parseFloat(R(an, "width")) || ((an.offsetWidth || 0) - ao);
    if (am) {
      c += ao
    }
    if (aq) {
      c += (parseFloat(R(an, "margin-left")) || 0) + (parseFloat(R(an, "margin-right")) || 0)
    }
    return c
  }

  function x(an, am, aq) {
    var ap = "padding-top|padding-bottom|border-top-width|border-bottom-width".split("|");
    var ao = 0;
    for (var f = 0; f < ap.length; f++) {
      ao += parseFloat(R(an, ap[f])) || 0
    }
    var c = parseFloat(R(an, "height")) || ((an.offsetHeight || 0) - ao);
    if (am) {
      c += ao
    }
    if (aq) {
      c += (parseFloat(R(an, "margin-top")) || 0) + (parseFloat(R(an, "margin-bottom")) || 0)
    }
    return c
  }

  function p(ao, at, c, aq, am) {
    var an = ao.find(">span,>div").get();
    N(an).css({position: "relative", visibility: "hidden"});
    ao.show();
    for (var f in at) {
      if (/\%/.test(at[f])) {
        at[f] = parseInt(at[f]) / 100;
        var ar = ao.offset()[/left/.test(f) ? "left" : "top"];
        var au = /left/.test(f) ? "width" : "height";
        if (at[f] < 0) {
          at[f] *= ar
        } else {
          at[f] *= m[au]() - ao[au]() - ar
        }
      }
    }
    N(an[0]).css({left: (at.left1 || 0) + "px", top: (at.top1 || 0) + "px"});
    N(an[1]).css({left: (at.left2 || 0) + "px", top: (at.top2 || 0) + "px"});
    var am = at.duration || am;

    function ap(av) {
      var aw = N(an[av]).css("opacity");
      N(an[av]).css({visibility: "visible"}).css({opacity: 0}).animate({opacity: aw}, am, "easeOutCirc").animate({
        top: 0,
        left: 0
      }, {duration: am, easing: (at.easing || aq), queue: false})
    }

    ap(0);
    setTimeout(function () {
      ap(1)
    }, am * (at.distance || c))
  }

  function Z(ar, av) {
    var au = {position: 0, top: 0, left: 0, bottom: 0, right: 0};
    for (var am in au) {
      au[am] = ar.get(0).style[am]
    }
    ar.show();
    var aq = {
      width: C(ar.get(0), 1, 1),
      height: x(ar.get(0), 1, 1),
      "float": ar.css("float"),
      overflow: "hidden",
      opacity: 0
    };
    for (var am in au) {
      aq[am] = au[am] || R(ar.get(0), am)
    }
    var f = N("<div></div>").css({fontSize: "100%", background: "transparent", border: "none", margin: 0, padding: 0});
    ar.wrap(f);
    f = ar.parent();
    if (ar.css("position") == "static") {
      f.css({position: "relative"});
      ar.css({position: "relative"})
    } else {
      N.extend(aq, {position: ar.css("position"), zIndex: ar.css("z-index")});
      ar.css({position: "absolute", top: 0, left: 0, right: "auto", bottom: "auto"})
    }
    f.css(aq).show();
    var at = av.direction || "left";
    var an = (at == "up" || at == "down") ? "top" : "left";
    var ao = (at == "up" || at == "left");
    var c = av.distance || (an == "top" ? ar.outerHeight(true) : ar.outerWidth(true));
    ar.css(an, ao ? (isNaN(c) ? "-" + c : -c) : c);
    var ap = {};
    ap[an] = (ao ? "+=" : "-=") + c;
    f.animate({opacity: 1}, {duration: av.duration, easing: av.easing});
    ar.animate(ap, {
      queue: false, duration: av.duration, easing: av.easing, complete: function () {
        ar.css(au);
        ar.parent().replaceWith(ar);
        if (av.complete) {
          av.complete()
        }
      }
    })
  }

  if (o.length || U.length) {
    e()
  }
  s(I);
  if (F.caption) {
    G(j[I])
  }
  if (F.stopOnHover) {
    this.bind("mouseover", function (c) {
      r();
      K = true
    });
    this.bind("mouseout", function (c) {
      L();
      K = false
    })
  }
  L(1);
  var M = m.find("audio").get(0), k = F.autoPlay;
  if (M) {
    if (window.Audio && M.canPlayType && M.canPlayType("audio/mp3")) {
      M.loop = "loop";
      if (F.autoPlay) {
        M.autoplay = "autoplay";
        setTimeout(function () {
          M.play()
        }, 100)
      }
    } else {
      M = M.src;
      var X = M.substring(0, M.length - /[^\\\/]+$/.exec(M)[0].length);
      var n = "wsSound" + Math.round(Math.random() * 9999);
      N("<div>").appendTo(m).get(0).id = n;
      var t = "wsSL" + Math.round(Math.random() * 9999);
      window[t] = {
        onInit: function () {
        }
      };
      swfobject.createSWF({data: X + "player_mp3_js.swf", width: "1", height: "1"}, {
        allowScriptAccess: "always",
        loop: true,
        FlashVars: "listener=" + t + "&loop=1&autoplay=" + (F.autoPlay ? 1 : 0) + "&mp3=" + M
      }, n);
      M = 0
    }
    m.bind("stop", function () {
      k = false;
      if (M) {
        M.pause()
      } else {
        N(n).SetVariable("method:pause", "")
      }
    });
    m.bind("start", function () {
      if (M) {
        M.play()
      } else {
        N(n).SetVariable("method:play", "")
      }
    })
  }
  i.wsStart = l;
  i.wsStop = z;
  if (F.playPause) {
    var h = N('<a href="#" class="ws_playpause"></a>');
    if (F.autoPlay) {
      h.addClass("ws_pause")
    } else {
      h.addClass("ws_play")
    }
    h.click(function () {
      F.autoPlay = !F.autoPlay;
      if (!F.autoPlay) {
        i.wsStop();
        h.removeClass("ws_pause");
        h.addClass("ws_play")
      } else {
        L();
        h.removeClass("ws_play");
        h.addClass("ws_pause")
      }
      return false
    });
    this.append(h)
  }

  function w() {
    m.css("fontSize", Math.max(Math.min((m.width() / F.width) || 1, 1) * 10, 6))
  }

  if (F.responsive) {
    N(w);
    N(window).on("load resize", w)
  }
  return this
};
jQuery.extend(jQuery.easing, {
  easeInOutExpo: function (e, f, a, h, g) {
    if (f == 0) {
      return a
    }
    if (f == g) {
      return a + h
    }
    if ((f /= g / 2) < 1) {
      return h / 2 * Math.pow(2, 10 * (f - 1)) + a
    }
    return h / 2 * (-Math.pow(2, -10 * --f) + 2) + a
  }, easeOutCirc: function (e, f, a, h, g) {
    return h * Math.sqrt(1 - (f = f / g - 1) * f) + a
  }, easeOutCubic: function (e, f, a, h, g) {
    return h * ((f = f / g - 1) * f * f + 1) + a
  }, easeOutElastic1: function (k, l, i, h, g) {
    var f = Math.PI / 2;
    var m = 1.70158;
    var e = 0;
    var j = h;
    if (l == 0) {
      return i
    }
    if ((l /= g) == 1) {
      return i + h
    }
    if (!e) {
      e = g * 0.3
    }
    if (j < Math.abs(h)) {
      j = h;
      var m = e / 4
    } else {
      var m = e / f * Math.asin(h / j)
    }
    return j * Math.pow(2, -10 * l) * Math.sin((l * g - m) * f / e) + h + i
  }, easeOutBack: function (e, f, a, i, h, g) {
    if (g == undefined) {
      g = 1.70158
    }
    return i * ((f = f / h - 1) * f * ((g + 1) * f + g) + 1) + a
  }
});

function ws_cube(k, g, a) {
  var c = jQuery, e = c("ul", a), b = k.perspective || 2000;
  fullContCSS = {
    position: "absolute",
    backgroundSize: "cover",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden"
  };
  var j = {
    domPrefixes: " Webkit Moz ms O Khtml".split(" "), testDom: function (m) {
      var l = this.domPrefixes.length;
      while (l--) {
        if (typeof document.body.style[this.domPrefixes[l] + m] !== "undefined") {
          return true
        }
      }
      return false
    }, cssTransitions: function () {
      return this.testDom("Transition")
    }, cssTransforms3d: function () {
      var m = (typeof document.body.style.perspectiveProperty !== "undefined") || this.testDom("Perspective");
      if (m && /AppleWebKit/.test(navigator.userAgent)) {
        var o = document.createElement("div"), l = document.createElement("style"),
          n = "Test3d" + Math.round(Math.random() * 99999);
        l.textContent = "@media (-webkit-transform-3d){#" + n + "{height:3px}}";
        document.getElementsByTagName("head")[0].appendChild(l);
        o.id = n;
        document.body.appendChild(o);
        m = o.offsetHeight === 3;
        l.parentNode.removeChild(l);
        o.parentNode.removeChild(o)
      }
      return m
    }, webkit: function () {
      return /AppleWebKit/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)
    }
  };
  var d = (j.cssTransitions() && j.cssTransforms3d()), h = j.webkit();
  if (!d && k.fallback) {
    return new k.fallback(k, g, a)
  }

  function i(l, m, o, n) {
    return "inset " + (-n * l * 1.2 / 90) + "px " + (o * m * 1.2 / 90) + "px " + (l + m) / 20 + "px rgba(" + ((o < n) ? "0,0,0,.6" : (o > n) ? "255,255,255,0.8" : "0,0,0,.0") + ")"
  }

  var f;
  this.go = function (s, p) {
    function m(K, z, A, y, x, I, J, G, F) {
      K.parent().css("perspective", b);
      var E = K.width(), C = K.height();
      var H = c(K.children().get(1));
      H.css({transform: "rotateY(0deg) rotateX(0deg)", boxShadow: i(E, C, 0, 0)});
      var B = c(K.children().get(0));
      B.css({opacity: 1, transform: "rotateY(" + I + "deg) rotateX(" + x + "deg)", boxShadow: i(E, C, x, I)});
      if (h) {
        K.css({transform: "translateZ(-" + z + "px)"})
      }
      var D = setTimeout(function () {
        var w = "all " + k.duration + "ms cubic-bezier(0.645, 0.045, 0.355, 1.000)";
        H.css({transition: w, boxShadow: i(E, C, J, G), transform: "rotateX(" + J + "deg) rotateY(" + G + "deg)"});
        B.css({transition: w, boxShadow: i(E, C, 0, 0), transform: "rotateY(0deg) rotateX(0deg)"});
        D = setTimeout(F, k.duration)
      }, 20);
      return {
        stop: function () {
          clearTimeout(D);
          F()
        }
      }
    }

    if (d) {
      if (f) {
        f.stop()
      }
      var u = a.width(), q = a.height();
      var v = c('<div class="ws_effect">').css(fullContCSS).css({
        transformStyle: "preserve-3d",
        perspective: h ? "none" : b,
        zIndex: 8
      }).appendTo(a.parent());
      var o = {
        left: [u / 2, u / 2, 0, 0, 90, 0, -90],
        right: [u / 2, -u / 2, 0, 0, -90, 0, 90],
        down: [q / 2, 0, -q / 2, 90, 0, -90, 0],
        up: [q / 2, 0, q / 2, -90, 0, 90, 0]
      }[k.direction || ["left", "right", "down", "up"][Math.floor(Math.random() * 4)]];
      c("<div>").css(fullContCSS).appendTo(v).css({
        backgroundImage: "url(" + g.get(s).src + ")",
        transformOrigin: "50% 50% -" + o[0] + "px"
      });
      c("<div>").css(fullContCSS).appendTo(v).css({
        backgroundImage: "url(" + g.get(p).src + ")",
        transformOrigin: "50% 50% -" + o[0] + "px"
      });
      e.hide();
      f = new m(v, o[0], o[1], o[2], o[3], o[4], o[5], o[6], function () {
        e.css({left: -s + "00%"}).show();
        v.remove();
        f = 0
      })
    } else {
      var l = c("<div></div>").css({
        position: "absolute",
        display: "none",
        zIndex: 2,
        width: "100%",
        height: "100%"
      }).appendTo(a);
      l.stop(1, 1);
      var n = (!!((s - p + 1) % g.length) ^ k.revers ? "left" : "right");
      var t = c(g[p]).clone().css({
        position: "absolute",
        left: "0%",
        right: "auto",
        top: 0,
        width: "100%",
        height: "100%"
      }).appendTo(l).css(n, 0);
      var r = c(g[s]).clone().css({
        position: "absolute",
        left: "100%",
        right: "auto",
        top: 0,
        width: "0%",
        height: "100%"
      }).appendTo(l).show();
      l.css({left: "auto", right: "auto", top: 0}).css(n, 0).show();
      e.hide();
      r.animate({width: "100%", left: 0}, k.duration, "easeInOutExpo", function () {
        c(this).remove()
      });
      t.animate({width: 0}, k.duration, "easeInOutExpo", function () {
        e.css({left: -s + "00%"}).show();
        l.remove()
      })
    }
    return s
  }
};
