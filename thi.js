(() => {
  var g,
    C,
    W,
    M,
    k,
    w = function () {
      return (
        window.performance &&
        performance.getEntriesByType &&
        performance.getEntriesByType("navigation")[0]
      );
    },
    b = function (e) {
      if (document.readyState === "loading") return "loading";
      var t = w();
      if (t) {
        if (e < t.domInteractive) return "loading";
        if (
          t.domContentLoadedEventStart === 0 ||
          e < t.domContentLoadedEventStart
        )
          return "dom-interactive";
        if (t.domComplete === 0 || e < t.domComplete)
          return "dom-content-loaded";
      }
      return "complete";
    },
    ge = function (e) {
      var t = e.nodeName;
      return e.nodeType === 1
        ? t.toLowerCase()
        : t.toUpperCase().replace(/^#/, "");
    },
    A = function (e, t) {
      var i = "";
      try {
        for (; e && e.nodeType !== 9; ) {
          var r = e,
            n = r.id
              ? "#" + r.id
              : ge(r) +
                (r.className && r.className.trim().length
                  ? "." + r.className.trim().replace(/\s+/g, ".")
                  : "");
          if (i.length + n.length > (t || 100) - 1) return i || n;
          if (((i = i ? n + ">" + i : n), r.id)) break;
          e = r.parentNode;
        }
      } catch (c) {}
      return i;
    },
    G = -1,
    K = function () {
      return G;
    },
    T = function (e) {
      addEventListener(
        "pageshow",
        function (t) {
          t.persisted && ((G = t.timeStamp), e(t));
        },
        !0
      );
    },
    N = function () {
      var e = w();
      return (e && e.activationStart) || 0;
    },
    m = function (e, t) {
      var i = w(),
        r = "navigate";
      return (
        K() >= 0
          ? (r = "back-forward-cache")
          : i &&
            (r =
              document.prerendering || N() > 0
                ? "prerender"
                : document.wasDiscarded
                ? "restore"
                : i.type.replace(/_/g, "-")),
        {
          name: e,
          value: t === void 0 ? -1 : t,
          rating: "good",
          delta: 0,
          entries: [],
          id: "v3-"
            .concat(Date.now(), "-")
            .concat(Math.floor(8999999999999 * Math.random()) + 1e12),
          navigationType: r,
        }
      );
    },
    S = function (e, t, i) {
      try {
        if (PerformanceObserver.supportedEntryTypes.includes(e)) {
          var r = new PerformanceObserver(function (n) {
            Promise.resolve().then(function () {
              t(n.getEntries());
            });
          });
          return (
            r.observe(Object.assign({ type: e, buffered: !0 }, i || {})), r
          );
        }
      } catch (n) {}
    },
    p = function (e, t, i, r) {
      var n, c;
      return function (a) {
        t.value >= 0 &&
          (a || r) &&
          ((c = t.value - (n || 0)) || n === void 0) &&
          ((n = t.value),
          (t.delta = c),
          (t.rating = (function (o, s) {
            return o > s[1] ? "poor" : o > s[0] ? "needs-improvement" : "good";
          })(t.value, i)),
          e(t));
      };
    },
    _ = function (e) {
      requestAnimationFrame(function () {
        return requestAnimationFrame(function () {
          return e();
        });
      });
    },
    D = function (e) {
      var t = function (i) {
        (i.type !== "pagehide" && document.visibilityState !== "hidden") ||
          e(i);
      };
      addEventListener("visibilitychange", t, !0),
        addEventListener("pagehide", t, !0);
    },
    q = function (e) {
      var t = !1;
      return function (i) {
        t || (e(i), (t = !0));
      };
    },
    E = -1,
    X = function () {
      return document.visibilityState !== "hidden" || document.prerendering
        ? 1 / 0
        : 0;
    },
    F = function (e) {
      document.visibilityState === "hidden" &&
        E > -1 &&
        ((E = e.type === "visibilitychange" ? e.timeStamp : 0), ye());
    },
    Y = function () {
      addEventListener("visibilitychange", F, !0),
        addEventListener("prerenderingchange", F, !0);
    },
    ye = function () {
      removeEventListener("visibilitychange", F, !0),
        removeEventListener("prerenderingchange", F, !0);
    },
    O = function () {
      return (
        E < 0 &&
          ((E = X()),
          Y(),
          T(function () {
            setTimeout(function () {
              (E = X()), Y();
            }, 0);
          })),
        {
          get firstHiddenTime() {
            return E;
          },
        }
      );
    },
    x = function (e) {
      document.prerendering
        ? addEventListener(
            "prerenderingchange",
            function () {
              return e();
            },
            !0
          )
        : e();
    },
    Z = [1800, 3e3],
    $ = function (e, t) {
      (t = t || {}),
        x(function () {
          var i,
            r = O(),
            n = m("FCP"),
            c = S("paint", function (a) {
              a.forEach(function (o) {
                o.name === "first-contentful-paint" &&
                  (c.disconnect(),
                  o.startTime < r.firstHiddenTime &&
                    ((n.value = Math.max(o.startTime - N(), 0)),
                    n.entries.push(o),
                    i(!0)));
              });
            });
          c &&
            ((i = p(e, n, Z, t.reportAllChanges)),
            T(function (a) {
              (n = m("FCP")),
                (i = p(e, n, Z, t.reportAllChanges)),
                _(function () {
                  (n.value = performance.now() - a.timeStamp), i(!0);
                });
            }));
        });
    },
    ee = [0.1, 0.25],
    te = function (e, t) {
      (function (i, r) {
        (r = r || {}),
          $(
            q(function () {
              var n,
                c = m("CLS", 0),
                a = 0,
                o = [],
                s = function (f) {
                  f.forEach(function (d) {
                    if (!d.hadRecentInput) {
                      var y = o[0],
                        L = o[o.length - 1];
                      a &&
                      d.startTime - L.startTime < 1e3 &&
                      d.startTime - y.startTime < 5e3
                        ? ((a += d.value), o.push(d))
                        : ((a = d.value), (o = [d]));
                    }
                  }),
                    a > c.value && ((c.value = a), (c.entries = o), n());
                },
                u = S("layout-shift", s);
              u &&
                ((n = p(i, c, ee, r.reportAllChanges)),
                D(function () {
                  s(u.takeRecords()), n(!0);
                }),
                T(function () {
                  (a = 0),
                    (c = m("CLS", 0)),
                    (n = p(i, c, ee, r.reportAllChanges)),
                    _(function () {
                      return n();
                    });
                }),
                setTimeout(n, 0));
            })
          );
      })(function (i) {
        (function (r) {
          if (r.entries.length) {
            var n = r.entries.reduce(function (o, s) {
              return o && o.value > s.value ? o : s;
            });
            if (n && n.sources && n.sources.length) {
              var c =
                (a = n.sources).find(function (o) {
                  return o.node && o.node.nodeType === 1;
                }) || a[0];
              if (c)
                return void (r.attribution = {
                  largestShiftTarget: A(c.node),
                  largestShiftTime: n.startTime,
                  largestShiftValue: n.value,
                  largestShiftSource: c,
                  largestShiftEntry: n,
                  loadState: b(n.startTime),
                });
            }
          }
          var a;
          r.attribution = {};
        })(i),
          e(i);
      }, t);
    },
    ne = function (e, t) {
      $(function (i) {
        (function (r) {
          if (r.entries.length) {
            var n = w(),
              c = r.entries[r.entries.length - 1];
            if (n) {
              var a = n.activationStart || 0,
                o = Math.max(0, n.responseStart - a);
              return void (r.attribution = {
                timeToFirstByte: o,
                firstByteToFCP: r.value - o,
                loadState: b(r.entries[0].startTime),
                navigationEntry: n,
                fcpEntry: c,
              });
            }
          }
          r.attribution = {
            timeToFirstByte: 0,
            firstByteToFCP: r.value,
            loadState: b(K()),
          };
        })(i),
          e(i);
      }, t);
    },
    P = { passive: !0, capture: !0 },
    Te = new Date(),
    re = function (e, t) {
      g || ((g = t), (C = e), (W = new Date()), ae(removeEventListener), ie());
    },
    ie = function () {
      if (C >= 0 && C < W - Te) {
        var e = {
          entryType: "first-input",
          name: g.type,
          target: g.target,
          cancelable: g.cancelable,
          startTime: g.timeStamp,
          processingStart: g.timeStamp + C,
        };
        M.forEach(function (t) {
          t(e);
        }),
          (M = []);
      }
    },
    Se = function (e) {
      if (e.cancelable) {
        var t =
          (e.timeStamp > 1e12 ? new Date() : performance.now()) - e.timeStamp;
        e.type == "pointerdown"
          ? (function (i, r) {
              var n = function () {
                  re(i, r), a();
                },
                c = function () {
                  a();
                },
                a = function () {
                  removeEventListener("pointerup", n, P),
                    removeEventListener("pointercancel", c, P);
                };
              addEventListener("pointerup", n, P),
                addEventListener("pointercancel", c, P);
            })(t, e)
          : re(t, e);
      }
    },
    ae = function (e) {
      ["mousedown", "keydown", "touchstart", "pointerdown"].forEach(function (
        t
      ) {
        return e(t, Se, P);
      });
    },
    oe = [100, 300],
    Ee = function (e, t) {
      (t = t || {}),
        x(function () {
          var i,
            r = O(),
            n = m("FID"),
            c = function (s) {
              s.startTime < r.firstHiddenTime &&
                ((n.value = s.processingStart - s.startTime),
                n.entries.push(s),
                i(!0));
            },
            a = function (s) {
              s.forEach(c);
            },
            o = S("first-input", a);
          (i = p(e, n, oe, t.reportAllChanges)),
            o &&
              D(
                q(function () {
                  a(o.takeRecords()), o.disconnect();
                })
              ),
            o &&
              T(function () {
                var s;
                (n = m("FID")),
                  (i = p(e, n, oe, t.reportAllChanges)),
                  (M = []),
                  (C = -1),
                  (g = null),
                  ae(addEventListener),
                  (s = c),
                  M.push(s),
                  ie();
              });
        });
    },
    ce = function (e, t) {
      Ee(function (i) {
        (function (r) {
          var n = r.entries[0];
          r.attribution = {
            eventTarget: A(n.target),
            eventType: n.name,
            eventTime: n.startTime,
            eventEntry: n,
            loadState: b(n.startTime),
          };
        })(i),
          e(i);
      }, t);
    },
    se = 0,
    z = 1 / 0,
    B = 0,
    Le = function (e) {
      e.forEach(function (t) {
        t.interactionId &&
          ((z = Math.min(z, t.interactionId)),
          (B = Math.max(B, t.interactionId)),
          (se = B ? (B - z) / 7 + 1 : 0));
      });
    },
    ue = function () {
      return k ? se : performance.interactionCount || 0;
    },
    Ce = function () {
      "interactionCount" in performance ||
        k ||
        (k = S("event", Le, {
          type: "event",
          buffered: !0,
          durationThreshold: 0,
        }));
    },
    de = [200, 500],
    fe = 0,
    le = function () {
      return ue() - fe;
    },
    v = [],
    H = {},
    me = function (e) {
      var t = v[v.length - 1],
        i = H[e.interactionId];
      if (i || v.length < 10 || e.duration > t.latency) {
        if (i) i.entries.push(e), (i.latency = Math.max(i.latency, e.duration));
        else {
          var r = { id: e.interactionId, latency: e.duration, entries: [e] };
          (H[r.id] = r), v.push(r);
        }
        v.sort(function (n, c) {
          return c.latency - n.latency;
        }),
          v.splice(10).forEach(function (n) {
            delete H[n.id];
          });
      }
    },
    we = function (e, t) {
      (t = t || {}),
        x(function () {
          Ce();
          var i,
            r = m("INP"),
            n = function (a) {
              a.forEach(function (u) {
                u.interactionId && me(u),
                  u.entryType === "first-input" &&
                    !v.some(function (f) {
                      return f.entries.some(function (d) {
                        return (
                          u.duration === d.duration &&
                          u.startTime === d.startTime
                        );
                      });
                    }) &&
                    me(u);
              });
              var o,
                s = ((o = Math.min(v.length - 1, Math.floor(le() / 50))), v[o]);
              s &&
                s.latency !== r.value &&
                ((r.value = s.latency), (r.entries = s.entries), i());
            },
            c = S("event", n, { durationThreshold: t.durationThreshold || 40 });
          (i = p(e, r, de, t.reportAllChanges)),
            c &&
              (c.observe({ type: "first-input", buffered: !0 }),
              D(function () {
                n(c.takeRecords()),
                  r.value < 0 && le() > 0 && ((r.value = 0), (r.entries = [])),
                  i(!0);
              }),
              T(function () {
                (v = []),
                  (fe = ue()),
                  (r = m("INP")),
                  (i = p(e, r, de, t.reportAllChanges));
              }));
        });
    },
    pe = function (e, t) {
      we(function (i) {
        (function (r) {
          if (r.entries.length) {
            var n = r.entries.sort(function (c, a) {
              return (
                a.duration - c.duration ||
                a.processingEnd -
                  a.processingStart -
                  (c.processingEnd - c.processingStart)
              );
            })[0];
            r.attribution = {
              eventTarget: A(n.target),
              eventType: n.name,
              eventTime: n.startTime,
              eventEntry: n,
              loadState: b(n.startTime),
            };
          } else r.attribution = {};
        })(i),
          e(i);
      }, t);
    },
    ve = [2500, 4e3],
    j = {},
    he = function (e, t) {
      (function (i, r) {
        (r = r || {}),
          x(function () {
            var n,
              c = O(),
              a = m("LCP"),
              o = function (f) {
                var d = f[f.length - 1];
                d &&
                  d.startTime < c.firstHiddenTime &&
                  ((a.value = Math.max(d.startTime - N(), 0)),
                  (a.entries = [d]),
                  n());
              },
              s = S("largest-contentful-paint", o);
            if (s) {
              n = p(i, a, ve, r.reportAllChanges);
              var u = q(function () {
                j[a.id] ||
                  (o(s.takeRecords()), s.disconnect(), (j[a.id] = !0), n(!0));
              });
              ["keydown", "click"].forEach(function (f) {
                addEventListener(f, u, !0);
              }),
                D(u),
                T(function (f) {
                  (a = m("LCP")),
                    (n = p(i, a, ve, r.reportAllChanges)),
                    _(function () {
                      (a.value = performance.now() - f.timeStamp),
                        (j[a.id] = !0),
                        n(!0);
                    });
                });
            }
          });
      })(function (i) {
        (function (r) {
          if (r.entries.length) {
            var n = w();
            if (n) {
              var c = n.activationStart || 0,
                a = r.entries[r.entries.length - 1],
                o =
                  a.url &&
                  performance.getEntriesByType("resource").filter(function (L) {
                    return L.name === a.url;
                  })[0],
                s = Math.max(0, n.responseStart - c),
                u = Math.max(s, o ? (o.requestStart || o.startTime) - c : 0),
                f = Math.max(u, o ? o.responseEnd - c : 0),
                d = Math.max(f, a ? a.startTime - c : 0),
                y = {
                  element: A(a.element),
                  timeToFirstByte: s,
                  resourceLoadDelay: u - s,
                  resourceLoadTime: f - u,
                  elementRenderDelay: d - f,
                  navigationEntry: n,
                  lcpEntry: a,
                };
              return (
                a.url && (y.url = a.url),
                o && (y.lcpResourceEntry = o),
                void (r.attribution = y)
              );
            }
          }
          r.attribution = {
            timeToFirstByte: 0,
            resourceLoadDelay: 0,
            resourceLoadTime: 0,
            elementRenderDelay: r.value,
          };
        })(i),
          e(i);
      }, t);
    };
  var U = document.currentScript
      ? {
          src: document.currentScript.src,
          framerSiteId: document.currentScript.getAttribute("data-fid"),
        }
      : { src: "https://events.framer.com/", framerSiteId: null },
    be = new URL(U.src),
    Pe = be.origin + "/anonymous";
  function Ie() {
    var e = function () {
      return Math.floor((1 + Math.random()) * 65536)
        .toString(16)
        .substring(1);
    };
    return (
      "" + e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e()
    );
  }
  function V(e) {
    if (!location.protocol.startsWith("http")) return;
    let t = {
      framerSiteId: U.framerSiteId,
      origin: document.location.origin,
      pathname: document.location.pathname,
      search: document.location.search,
    };
    fetch(Pe, {
      body: JSON.stringify(
        e.map((i) => ({
          ...i,
          data: { ...i.data, context: { ...t, ...i.data.context } },
        }))
      ),
      method: "POST",
      keepalive: !0,
      headers: { "Content-Type": "application/json" },
    });
  }
  function R(e, t) {
    return {
      source: "framer.site",
      timestamp: Date.now(),
      data: { type: "track", uuid: Ie(), event: e, ...t },
    };
  }
  function Me() {
    let e = new Set(),
      [t] = performance.getEntriesByType("navigation"),
      i = document.querySelector("div#main").dataset.framerPageOptimizedAt
        ? new Date(
            document.querySelector("div#main").dataset.framerPageOptimizedAt
          ).getTime()
        : null,
      r = document.querySelector("div#main").dataset.framerSsrReleasedAt
        ? new Date(
            document.querySelector("div#main").dataset.framerSsrReleasedAt
          ).getTime()
        : null,
      { origin: n, pathname: c, search: a } = document.location;
    function o(u) {
      e.add(u);
    }
    function s() {
      if (e.size > 0) {
        let u = [...e].map(({ name: d, delta: y, id: L, attribution: l }) => {
            let I = {
              metric: d,
              label: L,
              value: Math.round(y),
              pageOptimizedAt: i,
              ssrReleasedAt: r,
              context: { origin: n, pathname: c, search: a },
            };
            if (d === "LCP") {
              let h = {
                element: l.element,
                timeToFirstByte: l.timeToFirstByte,
                resourceLoadDelay: l.resourceLoadDelay,
                resourceLoadTime: l.resourceLoadTime,
                elementRenderDelay: l.elementRenderDelay,
                url: l.url,
              };
              I.attributionLcp = J(h) ? h : void 0;
            }
            if (d === "CLS") {
              let h = {
                largestShiftTarget: l.largestShiftTarget,
                largestShiftTime: l.largestShiftTime,
                largestShiftValue: l.largestShiftValue,
                loadState: l.loadState,
              };
              I.attributionCls = J(h) ? h : void 0;
            }
            if (d === "INP") {
              let h = {
                eventTarget: l.eventTarget,
                eventType: l.eventType,
                eventTime: l.eventTime ? Math.round(l.eventTime) : void 0,
                loadState: l.loadState,
              };
              I.attributionInp = J(h) ? h : void 0;
            }
            return R("published_site_performance_web_vitals", I);
          }),
          f = R("published_site_performance", {
            domNodes: document.getElementsByTagName("*").length,
            pageLoadDurationMs: Math.round(
              t.domContentLoadedEventEnd - t.domContentLoadedEventStart
            ),
            timeToFirstByteMs: Math.round(t.responseStart),
            resourcesCount: performance.getEntriesByType("resource").length,
            hydrationDurationMs: null,
            pageOptimizedAt: i,
            ssrReleasedAt: r,
            context: { origin: n, pathname: c, search: a },
          });
        e.clear(), V([...u, f]);
      }
    }
    ce(o),
      he(o),
      ne(o),
      te(({ delta: u, ...f }) => {
        o({ ...f, delta: u * 1e3 });
      }),
      pe(o),
      addEventListener("visibilitychange", () => {
        document.visibilityState === "hidden" && s();
      }),
      addEventListener("pagehide", s);
  }
  function Ae() {
    window.addEventListener("popstate", Q),
      typeof Proxy != "undefined" &&
        (window.history.pushState = new Proxy(window.history.pushState, {
          apply: (e, t, i) => {
            e.apply(t, i), Q();
          },
        }));
  }
  function Q(e) {
    let t = [
      R("published_site_pageview", {
        referrer: (e && e.initialReferrer) || null,
        url: location.href,
        hostname: location.hostname || null,
        pathname: location.pathname || null,
        hash: location.hash || null,
        search: location.search || null,
        framerSiteId: U.framerSiteId,
      }),
    ];
    V(t);
  }
  function De() {
    window.__send_framer_event = (e, t) => {
      let i = R(e, t);
      V([i]);
    };
  }
  function J(e) {
    return Object.values(e).some((t) => t !== void 0);
  }
  (function () {
    let e = typeof document.referrer == "string";
    Me(), Ae(), De(), Q({ initialReferrer: (e && document.referrer) || null });
  })();
})();
