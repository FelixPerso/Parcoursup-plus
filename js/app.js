var riot_min = {exports: {}};

(function (module, exports) {
  var e;
  e = function (t) {

    const e = {
      EACH: 0,
      IF: 1,
      SIMPLE: 2,
      TAG: 3,
      SLOT: 4
    };
    function n(t, e) {
      return typeof t === e;
    }
    function r(t) {
      const e = t.ownerSVGElement;
      return !!e || null === e;
    }
    function s(t) {
      return "template" === t.tagName.toLowerCase();
    }
    function o(t) {
      return n(t, "function");
    }
    function i(t) {
      return !u(t) && t.constructor === Object;
    }
    function u(t) {
      return null == t;
    }
    const a = new Map(),
      c = Symbol(),
      l = new Set(),
      h = "mount",
      d = "update",
      p = "unmount",
      m = "props",
      f = "slots",
      b = "root",
      g = Symbol(),
      v = Symbol(),
      y = Symbol(),
      O = Symbol(),
      j = Symbol();
    function N(t) {
      return t.replace(/-(\w)/g, (t, e) => e.toUpperCase());
    }
    function x(t) {
      for (; t.firstChild;) t.removeChild(t.firstChild);
    }
    const M = t => t.remove(),
      E = (t, e) => e && e.parentNode && e.parentNode.insertBefore(t, e),
      A = {
        ATTRIBUTE: 0,
        EVENT: 1,
        TEXT: 2,
        VALUE: 3
      };
    function T() {
      return this;
    }
    function w(t) {
      return o(t) ? t.prototype && t.prototype.constructor ? new t() : t() : t;
    }
    function S(t) {
      const e = new Map(),
        n = n => (e.has(n) || e.set(n, t.call(this, n))) && e.get(n);
      return n.cache = e, n;
    }
    function C(t) {
      return t.reduce((t, e) => {
        const {
          value: n,
          type: r
        } = e;
        switch (!0) {
          case !e.name && 0 === r:
            return Object.assign({}, t, n);
          case 3 === r:
            t.value = e.value;
            break;
          default:
            t[N(e.name)] = e.value;
        }
        return t;
      }, {});
    }
    function D(t, e, n, r) {
      return void 0 === r && (r = {}), Object.defineProperty(t, e, Object.assign({
        value: n,
        enumerable: !1,
        writable: !1,
        configurable: !0
      }, r)), t;
    }
    function k(t, e, n) {
      return Object.entries(e).forEach(e => {
        let [r, s] = e;
        D(t, r, s, n);
      }), t;
    }
    function L(t, e) {
      return Object.entries(e).forEach(e => {
        let [n, r] = e;
        t[n] || (t[n] = r);
      }), t;
    }
    const U = Object.freeze({
        [h]: T,
        [d]: T,
        [p]: T
      }),
      B = Object.assign({}, U, {
        clone: T,
        createDOM: T
      }),
      I = Symbol(),
      P = Symbol(),
      _ = Symbol(),
      $ = {
        nodes: [],
        mount(t, e) {
          return this.update(t, e);
        },
        update(t, e) {
          const {
              placeholder: n,
              nodes: r,
              childrenMap: s
            } = this,
            o = t === _ ? null : this.evaluate(t),
            i = o ? Array.from(o) : [],
            {
              newChildrenMap: u,
              batches: a,
              futureNodes: c
            } = function (t, e, n, r) {
              const {
                  condition: s,
                  template: o,
                  childrenMap: i,
                  itemName: u,
                  getKey: a,
                  indexName: c,
                  root: l,
                  isTemplateTag: h
                } = r,
                d = new Map(),
                p = [],
                m = [];
              return t.forEach((t, r) => {
                const f = function (t, e) {
                    let {
                      itemName: n,
                      indexName: r,
                      index: s,
                      item: o
                    } = e;
                    return D(t, n, o), r && D(t, r, s), t;
                  }(Object.create(e), {
                    itemName: u,
                    indexName: c,
                    index: r,
                    item: t
                  }),
                  b = a ? a(f) : r,
                  g = i.get(b),
                  v = [];
                if (function (t, e) {
                  return !!t && !t(e);
                }(s, f)) return;
                const y = !g,
                  O = g ? g.template : o.clone(),
                  j = O.el || l.cloneNode(),
                  N = h && y ? function (t) {
                    const e = t.dom.cloneNode(!0),
                      {
                        head: n,
                        tail: r
                      } = function () {
                        const t = document.createTextNode(""),
                          e = document.createTextNode("");
                        return t[I] = !0, e[P] = !0, {
                          head: t,
                          tail: e
                        };
                      }();
                    return {
                      avoidDOMInjection: !0,
                      fragment: e,
                      head: n,
                      tail: r,
                      children: [n, ...Array.from(e.childNodes), r]
                    };
                  }(O) : O.meta;
                y ? p.push(() => O.mount(j, f, n, N)) : p.push(() => O.update(f, n)), h ? v.push(...N.children) : v.push(j), i.delete(b), m.push(...v), d.set(b, {
                  nodes: v,
                  template: O,
                  context: f,
                  index: r
                });
              }), {
                newChildrenMap: d,
                batches: p,
                futureNodes: m
              };
            }(i, t, e, this);
          return ((t, e, n, r) => {
            const s = e.length;
            let o = t.length,
              i = s,
              u = 0,
              a = 0,
              c = null;
            for (; u < o || a < i;) if (o === u) {
              const t = i < s ? a ? n(e[a - 1], -0).nextSibling : n(e[i - a], 0) : r;
              for (; a < i;) E(n(e[a++], 1), t);
            } else if (i === a) for (; u < o;) c && c.has(t[u]) || M(n(t[u], -1)), u++;else if (t[u] === e[a]) u++, a++;else if (t[o - 1] === e[i - 1]) o--, i--;else if (t[u] === e[i - 1] && e[a] === t[o - 1]) {
              const r = n(t[--o], -1).nextSibling;
              E(n(e[a++], 1), n(t[u++], -1).nextSibling), E(n(e[--i], 1), r), t[o] = e[i];
            } else {
              if (!c) {
                c = new Map();
                let t = a;
                for (; t < i;) c.set(e[t], t++);
              }
              if (c.has(t[u])) {
                const r = c.get(t[u]);
                if (a < r && r < i) {
                  let s = u,
                    d = 1;
                  for (; ++s < o && s < i && c.get(t[s]) === r + d;) d++;
                  if (d > r - a) {
                    const s = n(t[u], 0);
                    for (; a < r;) E(n(e[a++], 1), s);
                  } else l = n(e[a++], 1), (h = n(t[u++], -1)) && h.parentNode && h.parentNode.replaceChild(l, h);
                } else u++;
              } else M(n(t[u++], -1));
            }
            var l, h;
          })(r, c, function (t, e) {
            return (n, r) => {
              if (r < 0) {
                const n = t[t.length - 1];
                if (n) {
                  const {
                    template: r,
                    nodes: s,
                    context: o
                  } = n;
                  s.pop(), s.length || (t.pop(), r.unmount(o, e, null));
                }
              }
              return n;
            };
          }(Array.from(s.values()), e), n), a.forEach(t => t()), this.childrenMap = u, this.nodes = c, this;
        },
        unmount(t, e) {
          return this.update(_, e), this;
        }
      },
      z = {
        mount(t, e) {
          return this.update(t, e);
        },
        update(t, e) {
          const n = !!this.evaluate(t),
            r = !this.value && n,
            s = this.value && !n,
            o = () => {
              const n = this.node.cloneNode();
              E(n, this.placeholder), this.template = this.template.clone(), this.template.mount(n, t, e);
            };
          switch (!0) {
            case r:
              o();
              break;
            case s:
              this.unmount(t);
              break;
            default:
              n && this.template.update(t, e);
          }
          return this.value = n, this;
        },
        unmount(t, e) {
          return this.template.unmount(t, e, !0), this;
        }
      },
      H = "undefined" == typeof Element ? {} : Element.prototype,
      K = S(t => H.hasOwnProperty(t)),
      R = /^on/,
      Y = {
        handleEvent(t) {
          this[t.type](t);
        }
      },
      F = new WeakMap();
    function V(t) {
      return u(t) ? "" : t;
    }
    const q = (t, e) => {
        const n = t.childNodes[e];
        if (n.nodeType === Node.COMMENT_NODE) {
          const e = document.createTextNode("");
          return t.replaceChild(e, n), e;
        }
        return n;
      },
      G = {
        0: function t(e, r, s, u) {
          let {
            name: a
          } = r;
          if (!a) return u && function (t, e, n) {
            const r = e ? Object.keys(e) : [];
            Object.keys(n).filter(t => !r.includes(t)).forEach(e => t.removeAttribute(e));
          }(e, s, u), void (s && function (e, n) {
            Object.entries(n).forEach(n => {
              let [r, s] = n;
              return t(e, {
                name: r
              }, s);
            });
          }(e, s));
          !K(a) && (function (t) {
            return n(t, "boolean");
          }(s) || i(s) || o(s)) && (e[a] = s), function (t) {
            return !t && 0 !== t;
          }(s) ? e.removeAttribute(a) : function (t) {
            return !0 === t || ["string", "number"].includes(typeof t);
          }(s) && e.setAttribute(a, function (t, e) {
            return !0 === e ? t : e;
          }(a, s));
        },
        1: function (t, e, n) {
          let {
            name: r
          } = e;
          const s = r.replace(R, ""),
            o = F.get(t) || (t => {
              const e = Object.create(Y);
              return F.set(t, e), e;
            })(t),
            [i, u] = (t => Array.isArray(t) ? t : [t, !1])(n),
            a = o[s],
            c = i && !a;
          a && !i && t.removeEventListener(s, o), c && t.addEventListener(s, o, u), o[s] = i;
        },
        2: function (t, e, n) {
          t.data = V(n);
        },
        3: function (t, e, n) {
          t.value = V(n);
        }
      },
      W = {
        mount(t) {
          return this.value = this.evaluate(t), X(this, this.value), this;
        },
        update(t) {
          const e = this.evaluate(t);
          return this.value !== e && (X(this, e), this.value = e), this;
        },
        unmount() {
          return 1 === this.type && X(this, null), this;
        }
      };
    function X(t, e) {
      return G[t.type](t.node, t, e, t.value);
    }
    function Z(t, e) {
      return Object.assign({}, W, e, {
        node: 2 === e.type ? q(t, e.childNodeIndex) : t
      });
    }
    const J = (t, e) => t[y] || e,
      Q = {
        attributes: [],
        getTemplateScope(t, e) {
          return function (t, e, n) {
            if (!t || !t.length) return n;
            const r = t.map(t => Object.assign({}, t, {
              value: t.evaluate(e)
            }));
            return Object.assign(Object.create(n || null), C(r));
          }(this.attributes, t, e);
        },
        mount(t, e) {
          const n = !!t.slots && t.slots.find(t => {
              let {
                id: e
              } = t;
              return e === this.name;
            }),
            {
              parentNode: r
            } = this.node,
            s = J(t, e);
          return this.template = n && ut(n.html, n.bindings).createDOM(r), this.template && (x(this.node), this.template.mount(this.node, this.getTemplateScope(t, s), s), this.template.children = Array.from(this.node.childNodes)), tt(this.node), M(this.node), this;
        },
        update(t, e) {
          if (this.template) {
            const n = J(t, e);
            this.template.update(this.getTemplateScope(t, n), n);
          }
          return this;
        },
        unmount(t, e, n) {
          return this.template && this.template.unmount(this.getTemplateScope(t, e), null, n), this;
        }
      };
    function tt(t) {
      const e = t && t.firstChild;
      e && (E(e, t), tt(t));
    }
    function et(t) {
      return t.reduce((t, e) => {
        let {
          bindings: n
        } = e;
        return t.concat(n);
      }, []);
    }
    const nt = {
        mount(t) {
          return this.update(t);
        },
        update(t, e) {
          const n = this.evaluate(t);
          return n && n === this.name ? this.tag.update(t) : (this.unmount(t, e, !0), this.name = n, this.tag = (r = this.getComponent(n), void 0 === (s = this.slots) && (s = []), void 0 === (o = this.attributes) && (o = []), r ? r({
            slots: s,
            attributes: o
          }) : ut(function (t) {
            return t.reduce((t, e) => t + e.html, "");
          }(s), [...et(s), {
            expressions: o.map(t => Object.assign({
              type: 0
            }, t))
          }])), this.tag.mount(this.node, t)), this;
          var r, s, o;
        },
        unmount(t, e, n) {
          return this.tag && this.tag.unmount(n), this;
        }
      },
      rt = {
        1: function (t, e) {
          let {
            evaluate: n,
            template: r
          } = e;
          const s = document.createTextNode("");
          return E(s, t), M(t), Object.assign({}, z, {
            node: t,
            evaluate: n,
            placeholder: s,
            template: r.createDOM(t)
          });
        },
        2: function (t, e) {
          let {
            expressions: n
          } = e;
          return Object.assign({}, (r = n.map(e => Z(t, e)), ["mount", "update", "unmount"].reduce((t, e) => Object.assign({}, t, {
            [e]: t => r.map(n => n[e](t)) && void 0
          }), {})));
          var r;
        },
        0: function (t, e) {
          let {
            evaluate: n,
            condition: r,
            itemName: o,
            indexName: i,
            getKey: u,
            template: a
          } = e;
          const c = document.createTextNode(""),
            l = t.cloneNode();
          return E(c, t), M(t), Object.assign({}, $, {
            childrenMap: new Map(),
            node: t,
            root: l,
            condition: r,
            evaluate: n,
            isTemplateTag: s(l),
            template: a.createDOM(t),
            getKey: u,
            indexName: i,
            itemName: o,
            placeholder: c
          });
        },
        3: function (t, e) {
          let {
            evaluate: n,
            getComponent: r,
            slots: s,
            attributes: o
          } = e;
          return Object.assign({}, nt, {
            node: t,
            evaluate: n,
            slots: s,
            attributes: o,
            getComponent: r
          });
        },
        4: function (t, e) {
          let {
            name: n,
            attributes: r
          } = e;
          return Object.assign({}, Q, {
            attributes: r,
            node: t,
            name: n
          });
        }
      };
    function st(t, e) {
      return t.map(t => 2 === t.type ? Object.assign({}, t, {
        childNodeIndex: t.childNodeIndex + e
      }) : t);
    }
    function ot(t, e, n) {
      const {
          selector: r,
          type: s,
          redundantAttribute: o,
          expressions: i
        } = e,
        u = r ? t.querySelector(r) : t;
      o && u.removeAttribute(o);
      const a = i || [];
      return (rt[s] || rt[2])(u, Object.assign({}, e, {
        expressions: n && !r ? st(a, n) : a
      }));
    }
    const it = {
      createDOM(t) {
        return this.dom = this.dom || function (t, e) {
          return e && ("string" == typeof e ? function (t, e) {
            return r(t) ? function (t, e) {
              return e.ownerDocument.importNode(new window.DOMParser().parseFromString(`<svg xmlns="http://www.w3.org/2000/svg">${t}</svg>`, "application/xml").documentElement, !0);
            }(e, t) : function (t, e) {
              const n = s(e) ? e : document.createElement("template");
              return n.innerHTML = t, n.content;
            }(e, t);
          }(t, e) : e);
        }(t, this.html) || document.createDocumentFragment(), this;
      },
      mount(t, e, n, o) {
        void 0 === o && (o = {}), this.el && this.unmount(e);
        const {
            fragment: i,
            children: u,
            avoidDOMInjection: a
          } = o,
          {
            parentNode: c
          } = u ? u[0] : t,
          l = s(t),
          h = l ? function (t, e, n) {
            const r = Array.from(t.childNodes);
            return Math.max(r.indexOf(e), r.indexOf(n.head) + 1, 0);
          }(c, t, o) : null;
        this.createDOM(t);
        const d = i || this.dom.cloneNode(!0);
        return this.el = l ? c : t, this.children = l ? u || Array.from(d.childNodes) : null, !a && d && function (t, e) {
          switch (!0) {
            case r(t):
              !function (t, e) {
                for (; t.firstChild;) e.appendChild(t.firstChild);
              }(e, t);
              break;
            case s(t):
              t.parentNode.replaceChild(e, t);
              break;
            default:
              t.appendChild(e);
          }
        }(t, d), this.bindings = this.bindingsData.map(t => ot(this.el, t, h)), this.bindings.forEach(t => t.mount(e, n)), this.meta = o, this;
      },
      update(t, e) {
        return this.bindings.forEach(n => n.update(t, e)), this;
      },
      unmount(t, e, n) {
        void 0 === n && (n = !1);
        const r = this.el;
        if (!r) return this;
        switch (this.bindings.forEach(r => r.unmount(t, e, n)), !0) {
          case r[g] || null === n:
            break;
          case Array.isArray(this.children):
            !function (t) {
              for (let e = 0; e < t.length; e++) M(t[e]);
            }(this.children);
            break;
          case !n:
            x(r);
            break;
          case !!n:
            M(r);
        }
        return this.el = null, this;
      },
      clone() {
        return Object.assign({}, this, {
          meta: {},
          el: null
        });
      }
    };
    function ut(t, e) {
      return void 0 === e && (e = []), Object.assign({}, it, {
        html: t,
        bindingsData: e
      });
    }
    const at = (t, e) => t[c] = e;
    function ct(t) {
      return [h, d, p].reduce((e, n) => (e[n] = t(n), e), {});
    }
    function lt(t) {
      return Array.isArray(t) ? t : /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(t)) && "number" == typeof t.length ? Array.from(t) : [t];
    }
    function ht(t, e) {
      return lt("string" == typeof t ? (e || document).querySelectorAll(t) : t);
    }
    const dt = Object.freeze({
        $(t) {
          return ht(t, this.root)[0];
        },
        $$(t) {
          return ht(t, this.root);
        }
      }),
      pt = Object.freeze({
        shouldUpdate: T,
        onBeforeMount: T,
        onMounted: T,
        onBeforeUpdate: T,
        onUpdated: T,
        onBeforeUnmount: T,
        onUnmounted: T
      }),
      mt = t => 1 === t.length ? t[0] : t;
    function ft(t, e, n) {
      const r = "object" == typeof e ? e : {
          [e]: n
        },
        s = Object.keys(r);
      return lt(t).forEach(t => {
        s.forEach(e => t.setAttribute(e, r[e]));
      }), t;
    }
    const bt = new Map();
    var gt;
    const vt = {
      CSS_BY_NAME: bt,
      add(t, e) {
        return bt.has(t) || (bt.set(t, e), this.inject()), this;
      },
      inject() {
        return (gt || (ft(gt = ht("style[riot]")[0] || document.createElement("style"), "type", "text/css"), gt.parentNode || document.head.appendChild(gt), gt)).innerHTML = [...bt.values()].join("\n"), this;
      },
      remove(t) {
        return bt.has(t) && (bt.delete(t), this.inject()), this;
      }
    };
    function yt(t) {
      for (var e = arguments.length, n = Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) n[r - 1] = arguments[r];
      return function () {
        for (var e = arguments.length, r = Array(e), s = 0; s < e; s++) r[s] = arguments[s];
        return (r = [...n, ...r]).length < t.length ? yt(t, ...r) : t(...r);
      };
    }
    function Ot(t) {
      return function (t, e, n) {
        const r = ["is"];
        return mt(lt(t).map(t => mt(r.map(e => t.getAttribute(e)))));
      }(t) || t.tagName.toLowerCase();
    }
    function jt(t, e) {
      return Object.assign({}, t, w(e));
    }
    function Nt(t, e) {
      let {
        slots: n,
        attributes: r,
        props: s
      } = e;
      return u = function (t) {
        return [...l].reduce((t, e) => e(t) || t, t);
      }(k(i(t) ? Object.create(t) : t, {
        mount(e, o, i) {
          return void 0 === o && (o = {}), D(e, g, !1), this[y] = i, this[O] = function (t, e) {
            void 0 === e && (e = []);
            const n = e.map(e => Z(t, e)),
              r = {};
            return Object.assign(r, Object.assign({
              expressions: n
            }, ct(t => e => (n.forEach(n => n[t](e)), r))));
          }(e, r).mount(i), D(this, m, Object.freeze(Object.assign({}, function (t, e) {
            return void 0 === e && (e = {}), Object.assign({}, function (t) {
              return Array.from(t.attributes).reduce((t, e) => (t[N(e.name)] = e.value, t), {});
            }(t), w(e));
          }(e, s), C(this[O].expressions)))), this.state = jt(this.state, o), this[j] = this.template.createDOM(e).clone(), at(e, this), t.name && function (t, e) {
            Ot(t) !== e && ft(t, "is", e);
          }(e, t.name), D(this, b, e), D(this, f, n), this.onBeforeMount(this.props, this.state), this[j].mount(e, this, i), this.onMounted(this.props, this.state), this;
        },
        update(t, e) {
          void 0 === t && (t = {}), e && (this[y] = e, this[O].update(e));
          const n = C(this[O].expressions);
          if (!1 !== this.shouldUpdate(n, this.props)) return D(this, m, Object.freeze(Object.assign({}, this.props, n))), this.state = jt(this.state, t), this.onBeforeUpdate(this.props, this.state), this[v] || (this[v] = !0, this[j].update(this, this[y])), this.onUpdated(this.props, this.state), this[v] = !1, this;
        },
        unmount(t) {
          return this.onBeforeUnmount(this.props, this.state), this[O].unmount(), this[j].unmount(this, this[y], null === t ? null : !t), this.onUnmounted(this.props, this.state), this;
        }
      })), Object.keys(t).filter(e => o(t[e])).forEach(t => {
        u[t] = u[t].bind(u);
      }), u;
      var u;
    }
    function xt(t) {
      let {
        css: e,
        template: n,
        componentAPI: r,
        name: s
      } = t;
      return e && s && vt.add(s, e), yt(Nt)(k(L(r, Object.assign({}, pt, {
        [m]: {},
        state: {}
      })), Object.assign({
        [f]: null,
        [b]: null
      }, dt, {
        name: s,
        css: e,
        template: n
      })));
    }
    const Mt = S(Et);
    function Et(t) {
      const {
          css: n,
          template: r,
          exports: s,
          name: o
        } = t,
        i = r ? function (t, n, r) {
          return t(ut, A, e, r);
        }(r, 0, (t => {
          const e = (void 0 === (n = t.exports ? t.exports.components : {}) && (n = {}), Object.entries(w(n)).reduce((t, e) => {
            let [n, r] = e;
            var s;
            return t[(s = n, s.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase())] = Et(r), t;
          }, {}));
          var n;
          return n => n === t.name ? Mt(t) : e[n] || a.get(n);
        })(t)) : B;
      return t => {
        let {
          slots: e,
          attributes: u,
          props: a
        } = t;
        if (s && s[g]) return function (t, e) {
          let {
            slots: n,
            attributes: r,
            props: s,
            css: o,
            template: i
          } = e;
          const u = L(t({
            slots: n,
            attributes: r,
            props: s
          }), U);
          return ct(t => function () {
            for (var e = arguments.length, n = Array(e), r = 0; r < e; r++) n[r] = arguments[r];
            if (t === h) {
              const [t] = n;
              D(t, g, !0), at(t, u);
            }
            return u[t](...n), u;
          });
        }(s, {
          slots: e,
          attributes: u,
          props: a,
          css: n,
          template: r
        });
        const c = w(s) || {},
          l = xt({
            css: n,
            template: i,
            componentAPI: c,
            name: o
          })({
            slots: e,
            attributes: u,
            props: a
          });
        return {
          mount: (t, e, n) => l.mount(t, n, e),
          update: (t, e) => l.update(e, t),
          unmount: t => l.unmount(t)
        };
      };
    }
    const At = {
      cssManager: vt,
      DOMBindings: {
        template: ut,
        createBinding: ot,
        createExpression: Z,
        bindingTypes: e,
        expressionTypes: A
      },
      globals: {
        DOM_COMPONENT_INSTANCE_PROPERTY: c,
        PARENT_KEY_SYMBOL: y
      }
    };
    t.__ = At, t.component = function (t) {
      return function (e, n, r) {
        let {
          slots: s,
          attributes: o,
          parentScope: i
        } = void 0 === r ? {} : r;
        return function () {
          for (var t = arguments.length, e = Array(t), n = 0; n < t; n++) e[n] = arguments[n];
          return e.reduce((t, e) => function () {
            return t(e(...arguments));
          });
        }(t => t.mount(e, i), t => t({
          props: n,
          slots: s,
          attributes: o
        }), Et)(t);
      };
    }, t.install = function (t) {
      return l.has(t), l.add(t), l;
    }, t.mount = function (t, e, n) {
      return ht(t).map(t => function (t, e, n, r) {
        const s = n || Ot(t);
        return a.has(s), a.get(s)({
          props: e,
          slots: void 0
        }).mount(t);
      }(t, e, n));
    }, t.pure = function (t) {
      return t[g] = !0, t;
    }, t.register = function (t, e) {
      let {
        css: n,
        template: r,
        exports: s
      } = e;
      return a.has(t), a.set(t, Et({
        name: t,
        css: n,
        template: r,
        exports: s
      })), a;
    }, t.uninstall = function (t) {
      return l.has(t), l.delete(t), l;
    }, t.unmount = function (t, e) {
      return ht(t).map(t => (t[c] && t[c].unmount(e), t));
    }, t.unregister = function (t) {
      return a.has(t), a.delete(t), vt.remove(t), a;
    }, t.version = "v7.1.0", t.withTypes = t => t;
  }, e(exports) ;
})(riot_min, riot_min.exports);

var BarChart = {
  css: null,
  exports: {
    onBeforeMount(props, state) {
      this.state.hasMinimumData = this.detectMinimumData();
    },
    onBeforeUpdate() {
      this.state.hasMinimumData = this.detectMinimumData();
    },
    detectMinimumData() {
      if (!this.props.elements) return false;
      let sum = 0;
      for (element of this.props.elements) {
        sum += element.percentage;
      }
      return sum > 0;
    }
  },
  template: (template, expressionTypes, bindingTypes, getComponent) => template('<div class="bar-chart block m-5"><template expr54="expr54"></template><template expr62="expr62"></template></div>', [{
    type: bindingTypes.IF,
    evaluate: _scope => _scope.state.hasMinimumData,
    redundantAttribute: 'expr54',
    selector: '[expr54]',
    template: template('<div class="has-text-centered block is-size-5"><h2 expr55="expr55" class="is-unselectable"> </h2></div><div class="is-size-7"><div class="columns is-mobile is-vcentered"><template expr56="expr56"></template></div><div class="columns is-mobile is-justify-content-center"><template expr59="expr59"></template></div></div>', [{
      redundantAttribute: 'expr55',
      selector: '[expr55]',
      expressions: [{
        type: expressionTypes.TEXT,
        childNodeIndex: 0,
        evaluate: _scope => [_scope.props.label].join('')
      }]
    }, {
      type: bindingTypes.EACH,
      getKey: null,
      condition: _scope => _scope.element.percentage > 0,
      template: template('<div expr57="expr57" class="column is-narrow ml-1 mr-1 p-0 is-flex-shrink-1" "><p expr58="expr58"> </p></div>', [{
        redundantAttribute: 'expr57',
        selector: '[expr57]',
        expressions: [{
          type: expressionTypes.ATTRIBUTE,
          name: 'style',
          evaluate: _scope => ['width:', _scope.element.percentage, '%;background-color:', _scope.element.color, ';'].join('')
        }]
      }, {
        redundantAttribute: 'expr58',
        selector: '[expr58]',
        expressions: [{
          type: expressionTypes.TEXT,
          childNodeIndex: 0,
          evaluate: _scope => [_scope.element.percentage, '%'].join('')
        }, {
          type: expressionTypes.ATTRIBUTE,
          name: 'class',
          evaluate: _scope => ['has-text-centered m-1 ', _scope.element.percentage > 2 ? "has-text-white" : null, ' is-unselectable'].join('')
        }]
      }]),
      redundantAttribute: 'expr56',
      selector: '[expr56]',
      itemName: 'element',
      indexName: null,
      evaluate: _scope => _scope.props.elements
    }, {
      type: bindingTypes.EACH,
      getKey: null,
      condition: null,
      template: template('<div class="column is-narrow"><span class="icon-text"><span expr60="expr60" class="icon"></span><span expr61="expr61" class="is-unselectable"> </span></span></div>', [{
        redundantAttribute: 'expr60',
        selector: '[expr60]',
        expressions: [{
          type: expressionTypes.ATTRIBUTE,
          name: 'title',
          evaluate: _scope => _scope.element.title
        }, {
          type: expressionTypes.ATTRIBUTE,
          name: 'style',
          evaluate: _scope => ['background-color:', _scope.element.color].join('')
        }]
      }, {
        redundantAttribute: 'expr61',
        selector: '[expr61]',
        expressions: [{
          type: expressionTypes.TEXT,
          childNodeIndex: 0,
          evaluate: _scope => _scope.element.name
        }]
      }]),
      redundantAttribute: 'expr59',
      selector: '[expr59]',
      itemName: 'element',
      indexName: null,
      evaluate: _scope => _scope.props.elements
    }])
  }, {
    type: bindingTypes.IF,
    evaluate: _scope => !_scope.state.hasMinimumData,
    redundantAttribute: 'expr62',
    selector: '[expr62]',
    template: template('<h3>Pas assez de données</h3>', [])
  }]),
  name: 'bar-chart'
};

var ProgressBar = {
  css: null,
  exports: {
    color(number) {
      if (number < 0) return;
      if (number < 20) return "is-danger";else if (number < 50) return "is-warning";else return "is-info";
    }
  },
  template: (template, expressionTypes, bindingTypes, getComponent) => template('<div class="columns is-mobile is-vcentered"><div class="column is-narrow pr-1"><p expr63="expr63" class="has-text-right has-text-weight-bold"> </p></div><div class="column pl-0"><progress expr64="expr64" max="100"></progress></div></div>', [{
    redundantAttribute: 'expr63',
    selector: '[expr63]',
    expressions: [{
      type: expressionTypes.TEXT,
      childNodeIndex: 0,
      evaluate: _scope => ['(', _scope.props.select >= 0 ? `${_scope.props.select}%` : "NR", ')'].join('')
    }]
  }, {
    redundantAttribute: 'expr64',
    selector: '[expr64]',
    expressions: [{
      type: expressionTypes.ATTRIBUTE,
      name: 'class',
      evaluate: _scope => ['progress ', _scope.color(_scope.props.select)].join('')
    }, {
      type: expressionTypes.ATTRIBUTE,
      name: 'value',
      evaluate: _scope => 100 - _scope.props.select
    }]
  }]),
  name: 'progress-bar'
};

var FormationRecap = {
  css: `formation-recap .recap,[is="formation-recap"] .recap{ max-width: 50%; margin : 0 auto; }`,
  exports: {
    components: {
      BarChart,
      ProgressBar
    }
  },
  template: (template, expressionTypes, bindingTypes, getComponent) => template('<div class="box p-5 my-5"><div class="recap box has-background-light has-text-weight-normal"><p>Moyenne des admis :<span expr34="expr34" class="is-pulled-right"> </span></p><p>Nombre de formations :<span expr35="expr35" class="is-pulled-right"> </span></p><p>Capacité :<span expr36="expr36" class="is-pulled-right"> </span></p><div class="is-flex m-0"><p class="column is-5 p-0">Sélectivité :</p><div class="column p-0"><progress-bar expr37="expr37"></progress-bar></div></div></div><bar-chart expr38="expr38"></bar-chart><bar-chart expr39="expr39"></bar-chart><bar-chart expr40="expr40"></bar-chart></div>', [{
    redundantAttribute: 'expr34',
    selector: '[expr34]',
    expressions: [{
      type: expressionTypes.TEXT,
      childNodeIndex: 0,
      evaluate: _scope => _scope.props.data?.moyenne
    }]
  }, {
    redundantAttribute: 'expr35',
    selector: '[expr35]',
    expressions: [{
      type: expressionTypes.TEXT,
      childNodeIndex: 0,
      evaluate: _scope => _scope.props.data?.nb_form
    }]
  }, {
    redundantAttribute: 'expr36',
    selector: '[expr36]',
    expressions: [{
      type: expressionTypes.TEXT,
      childNodeIndex: 0,
      evaluate: _scope => _scope.props.data?.capac
    }]
  }, {
    type: bindingTypes.TAG,
    getComponent: getComponent,
    evaluate: _scope => 'progress-bar',
    slots: [],
    attributes: [{
      type: expressionTypes.ATTRIBUTE,
      name: 'select',
      evaluate: _scope => _scope.props.data?.select
    }],
    redundantAttribute: 'expr37',
    selector: '[expr37]'
  }, {
    type: bindingTypes.TAG,
    getComponent: getComponent,
    evaluate: _scope => 'bar-chart',
    slots: [],
    attributes: [{
      type: expressionTypes.ATTRIBUTE,
      name: 'elements',
      evaluate: _scope => _scope.props.data?.genre?.elements
    }, {
      type: expressionTypes.ATTRIBUTE,
      name: 'label',
      evaluate: _scope => _scope.props.data?.genre?.label
    }],
    redundantAttribute: 'expr38',
    selector: '[expr38]'
  }, {
    type: bindingTypes.TAG,
    getComponent: getComponent,
    evaluate: _scope => 'bar-chart',
    slots: [],
    attributes: [{
      type: expressionTypes.ATTRIBUTE,
      name: 'elements',
      evaluate: _scope => _scope.props.data?.bac?.elements
    }, {
      type: expressionTypes.ATTRIBUTE,
      name: 'label',
      evaluate: _scope => _scope.props.data?.bac?.label
    }],
    redundantAttribute: 'expr39',
    selector: '[expr39]'
  }, {
    type: bindingTypes.TAG,
    getComponent: getComponent,
    evaluate: _scope => 'bar-chart',
    slots: [],
    attributes: [{
      type: expressionTypes.ATTRIBUTE,
      name: 'elements',
      evaluate: _scope => _scope.props.data?.mention?.elements
    }, {
      type: expressionTypes.ATTRIBUTE,
      name: 'label',
      evaluate: _scope => _scope.props.data?.mention?.label
    }],
    redundantAttribute: 'expr40',
    selector: '[expr40]'
  }]),
  name: 'formation-recap'
};

/*
 * anime.js v3.2.1
 * (c) 2020 Julian Garnier
 * Released under the MIT license
 * animejs.com
 */

// Defaults

var defaultInstanceSettings = {
  update: null,
  begin: null,
  loopBegin: null,
  changeBegin: null,
  change: null,
  changeComplete: null,
  loopComplete: null,
  complete: null,
  loop: 1,
  direction: 'normal',
  autoplay: true,
  timelineOffset: 0
};
var defaultTweenSettings = {
  duration: 1000,
  delay: 0,
  endDelay: 0,
  easing: 'easeOutElastic(1, .5)',
  round: 0
};
var validTransforms = ['translateX', 'translateY', 'translateZ', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scaleX', 'scaleY', 'scaleZ', 'skew', 'skewX', 'skewY', 'perspective', 'matrix', 'matrix3d'];

// Caching

var cache = {
  CSS: {},
  springs: {}
};

// Utils

function minMax(val, min, max) {
  return Math.min(Math.max(val, min), max);
}
function stringContains(str, text) {
  return str.indexOf(text) > -1;
}
function applyArguments(func, args) {
  return func.apply(null, args);
}
var is = {
  arr: function (a) {
    return Array.isArray(a);
  },
  obj: function (a) {
    return stringContains(Object.prototype.toString.call(a), 'Object');
  },
  pth: function (a) {
    return is.obj(a) && a.hasOwnProperty('totalLength');
  },
  svg: function (a) {
    return a instanceof SVGElement;
  },
  inp: function (a) {
    return a instanceof HTMLInputElement;
  },
  dom: function (a) {
    return a.nodeType || is.svg(a);
  },
  str: function (a) {
    return typeof a === 'string';
  },
  fnc: function (a) {
    return typeof a === 'function';
  },
  und: function (a) {
    return typeof a === 'undefined';
  },
  nil: function (a) {
    return is.und(a) || a === null;
  },
  hex: function (a) {
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a);
  },
  rgb: function (a) {
    return /^rgb/.test(a);
  },
  hsl: function (a) {
    return /^hsl/.test(a);
  },
  col: function (a) {
    return is.hex(a) || is.rgb(a) || is.hsl(a);
  },
  key: function (a) {
    return !defaultInstanceSettings.hasOwnProperty(a) && !defaultTweenSettings.hasOwnProperty(a) && a !== 'targets' && a !== 'keyframes';
  }
};

// Easings

function parseEasingParameters(string) {
  var match = /\(([^)]+)\)/.exec(string);
  return match ? match[1].split(',').map(function (p) {
    return parseFloat(p);
  }) : [];
}

// Spring solver inspired by Webkit Copyright © 2016 Apple Inc. All rights reserved. https://webkit.org/demos/spring/spring.js

function spring(string, duration) {
  var params = parseEasingParameters(string);
  var mass = minMax(is.und(params[0]) ? 1 : params[0], .1, 100);
  var stiffness = minMax(is.und(params[1]) ? 100 : params[1], .1, 100);
  var damping = minMax(is.und(params[2]) ? 10 : params[2], .1, 100);
  var velocity = minMax(is.und(params[3]) ? 0 : params[3], .1, 100);
  var w0 = Math.sqrt(stiffness / mass);
  var zeta = damping / (2 * Math.sqrt(stiffness * mass));
  var wd = zeta < 1 ? w0 * Math.sqrt(1 - zeta * zeta) : 0;
  var a = 1;
  var b = zeta < 1 ? (zeta * w0 + -velocity) / wd : -velocity + w0;
  function solver(t) {
    var progress = duration ? duration * t / 1000 : t;
    if (zeta < 1) {
      progress = Math.exp(-progress * zeta * w0) * (a * Math.cos(wd * progress) + b * Math.sin(wd * progress));
    } else {
      progress = (a + b * progress) * Math.exp(-progress * w0);
    }
    if (t === 0 || t === 1) {
      return t;
    }
    return 1 - progress;
  }
  function getDuration() {
    var cached = cache.springs[string];
    if (cached) {
      return cached;
    }
    var frame = 1 / 6;
    var elapsed = 0;
    var rest = 0;
    while (true) {
      elapsed += frame;
      if (solver(elapsed) === 1) {
        rest++;
        if (rest >= 16) {
          break;
        }
      } else {
        rest = 0;
      }
    }
    var duration = elapsed * frame * 1000;
    cache.springs[string] = duration;
    return duration;
  }
  return duration ? solver : getDuration;
}

// Basic steps easing implementation https://developer.mozilla.org/fr/docs/Web/CSS/transition-timing-function

function steps(steps) {
  if (steps === void 0) steps = 10;
  return function (t) {
    return Math.ceil(minMax(t, 0.000001, 1) * steps) * (1 / steps);
  };
}

// BezierEasing https://github.com/gre/bezier-easing

var bezier = function () {
  var kSplineTableSize = 11;
  var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);
  function A(aA1, aA2) {
    return 1.0 - 3.0 * aA2 + 3.0 * aA1;
  }
  function B(aA1, aA2) {
    return 3.0 * aA2 - 6.0 * aA1;
  }
  function C(aA1) {
    return 3.0 * aA1;
  }
  function calcBezier(aT, aA1, aA2) {
    return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
  }
  function getSlope(aT, aA1, aA2) {
    return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
  }
  function binarySubdivide(aX, aA, aB, mX1, mX2) {
    var currentX,
      currentT,
      i = 0;
    do {
      currentT = aA + (aB - aA) / 2.0;
      currentX = calcBezier(currentT, mX1, mX2) - aX;
      if (currentX > 0.0) {
        aB = currentT;
      } else {
        aA = currentT;
      }
    } while (Math.abs(currentX) > 0.0000001 && ++i < 10);
    return currentT;
  }
  function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
    for (var i = 0; i < 4; ++i) {
      var currentSlope = getSlope(aGuessT, mX1, mX2);
      if (currentSlope === 0.0) {
        return aGuessT;
      }
      var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
      aGuessT -= currentX / currentSlope;
    }
    return aGuessT;
  }
  function bezier(mX1, mY1, mX2, mY2) {
    if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
      return;
    }
    var sampleValues = new Float32Array(kSplineTableSize);
    if (mX1 !== mY1 || mX2 !== mY2) {
      for (var i = 0; i < kSplineTableSize; ++i) {
        sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
      }
    }
    function getTForX(aX) {
      var intervalStart = 0;
      var currentSample = 1;
      var lastSample = kSplineTableSize - 1;
      for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
        intervalStart += kSampleStepSize;
      }
      --currentSample;
      var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
      var guessForT = intervalStart + dist * kSampleStepSize;
      var initialSlope = getSlope(guessForT, mX1, mX2);
      if (initialSlope >= 0.001) {
        return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
      } else if (initialSlope === 0.0) {
        return guessForT;
      } else {
        return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
      }
    }
    return function (x) {
      if (mX1 === mY1 && mX2 === mY2) {
        return x;
      }
      if (x === 0 || x === 1) {
        return x;
      }
      return calcBezier(getTForX(x), mY1, mY2);
    };
  }
  return bezier;
}();
var penner = function () {
  // Based on jQuery UI's implemenation of easing equations from Robert Penner (http://www.robertpenner.com/easing)

  var eases = {
    linear: function () {
      return function (t) {
        return t;
      };
    }
  };
  var functionEasings = {
    Sine: function () {
      return function (t) {
        return 1 - Math.cos(t * Math.PI / 2);
      };
    },
    Circ: function () {
      return function (t) {
        return 1 - Math.sqrt(1 - t * t);
      };
    },
    Back: function () {
      return function (t) {
        return t * t * (3 * t - 2);
      };
    },
    Bounce: function () {
      return function (t) {
        var pow2,
          b = 4;
        while (t < ((pow2 = Math.pow(2, --b)) - 1) / 11) {}
        return 1 / Math.pow(4, 3 - b) - 7.5625 * Math.pow((pow2 * 3 - 2) / 22 - t, 2);
      };
    },
    Elastic: function (amplitude, period) {
      if (amplitude === void 0) amplitude = 1;
      if (period === void 0) period = .5;
      var a = minMax(amplitude, 1, 10);
      var p = minMax(period, .1, 2);
      return function (t) {
        return t === 0 || t === 1 ? t : -a * Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1 - p / (Math.PI * 2) * Math.asin(1 / a)) * (Math.PI * 2) / p);
      };
    }
  };
  var baseEasings = ['Quad', 'Cubic', 'Quart', 'Quint', 'Expo'];
  baseEasings.forEach(function (name, i) {
    functionEasings[name] = function () {
      return function (t) {
        return Math.pow(t, i + 2);
      };
    };
  });
  Object.keys(functionEasings).forEach(function (name) {
    var easeIn = functionEasings[name];
    eases['easeIn' + name] = easeIn;
    eases['easeOut' + name] = function (a, b) {
      return function (t) {
        return 1 - easeIn(a, b)(1 - t);
      };
    };
    eases['easeInOut' + name] = function (a, b) {
      return function (t) {
        return t < 0.5 ? easeIn(a, b)(t * 2) / 2 : 1 - easeIn(a, b)(t * -2 + 2) / 2;
      };
    };
    eases['easeOutIn' + name] = function (a, b) {
      return function (t) {
        return t < 0.5 ? (1 - easeIn(a, b)(1 - t * 2)) / 2 : (easeIn(a, b)(t * 2 - 1) + 1) / 2;
      };
    };
  });
  return eases;
}();
function parseEasings(easing, duration) {
  if (is.fnc(easing)) {
    return easing;
  }
  var name = easing.split('(')[0];
  var ease = penner[name];
  var args = parseEasingParameters(easing);
  switch (name) {
    case 'spring':
      return spring(easing, duration);
    case 'cubicBezier':
      return applyArguments(bezier, args);
    case 'steps':
      return applyArguments(steps, args);
    default:
      return applyArguments(ease, args);
  }
}

// Strings

function selectString(str) {
  try {
    var nodes = document.querySelectorAll(str);
    return nodes;
  } catch (e) {
    return;
  }
}

// Arrays

function filterArray(arr, callback) {
  var len = arr.length;
  var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
  var result = [];
  for (var i = 0; i < len; i++) {
    if (i in arr) {
      var val = arr[i];
      if (callback.call(thisArg, val, i, arr)) {
        result.push(val);
      }
    }
  }
  return result;
}
function flattenArray(arr) {
  return arr.reduce(function (a, b) {
    return a.concat(is.arr(b) ? flattenArray(b) : b);
  }, []);
}
function toArray(o) {
  if (is.arr(o)) {
    return o;
  }
  if (is.str(o)) {
    o = selectString(o) || o;
  }
  if (o instanceof NodeList || o instanceof HTMLCollection) {
    return [].slice.call(o);
  }
  return [o];
}
function arrayContains(arr, val) {
  return arr.some(function (a) {
    return a === val;
  });
}

// Objects

function cloneObject(o) {
  var clone = {};
  for (var p in o) {
    clone[p] = o[p];
  }
  return clone;
}
function replaceObjectProps(o1, o2) {
  var o = cloneObject(o1);
  for (var p in o1) {
    o[p] = o2.hasOwnProperty(p) ? o2[p] : o1[p];
  }
  return o;
}
function mergeObjects(o1, o2) {
  var o = cloneObject(o1);
  for (var p in o2) {
    o[p] = is.und(o1[p]) ? o2[p] : o1[p];
  }
  return o;
}

// Colors

function rgbToRgba(rgbValue) {
  var rgb = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(rgbValue);
  return rgb ? "rgba(" + rgb[1] + ",1)" : rgbValue;
}
function hexToRgba(hexValue) {
  var rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  var hex = hexValue.replace(rgx, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });
  var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  var r = parseInt(rgb[1], 16);
  var g = parseInt(rgb[2], 16);
  var b = parseInt(rgb[3], 16);
  return "rgba(" + r + "," + g + "," + b + ",1)";
}
function hslToRgba(hslValue) {
  var hsl = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(hslValue) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(hslValue);
  var h = parseInt(hsl[1], 10) / 360;
  var s = parseInt(hsl[2], 10) / 100;
  var l = parseInt(hsl[3], 10) / 100;
  var a = hsl[4] || 1;
  function hue2rgb(p, q, t) {
    if (t < 0) {
      t += 1;
    }
    if (t > 1) {
      t -= 1;
    }
    if (t < 1 / 6) {
      return p + (q - p) * 6 * t;
    }
    if (t < 1 / 2) {
      return q;
    }
    if (t < 2 / 3) {
      return p + (q - p) * (2 / 3 - t) * 6;
    }
    return p;
  }
  var r, g, b;
  if (s == 0) {
    r = g = b = l;
  } else {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return "rgba(" + r * 255 + "," + g * 255 + "," + b * 255 + "," + a + ")";
}
function colorToRgb(val) {
  if (is.rgb(val)) {
    return rgbToRgba(val);
  }
  if (is.hex(val)) {
    return hexToRgba(val);
  }
  if (is.hsl(val)) {
    return hslToRgba(val);
  }
}

// Units

function getUnit(val) {
  var split = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(val);
  if (split) {
    return split[1];
  }
}
function getTransformUnit(propName) {
  if (stringContains(propName, 'translate') || propName === 'perspective') {
    return 'px';
  }
  if (stringContains(propName, 'rotate') || stringContains(propName, 'skew')) {
    return 'deg';
  }
}

// Values

function getFunctionValue(val, animatable) {
  if (!is.fnc(val)) {
    return val;
  }
  return val(animatable.target, animatable.id, animatable.total);
}
function getAttribute(el, prop) {
  return el.getAttribute(prop);
}
function convertPxToUnit(el, value, unit) {
  var valueUnit = getUnit(value);
  if (arrayContains([unit, 'deg', 'rad', 'turn'], valueUnit)) {
    return value;
  }
  var cached = cache.CSS[value + unit];
  if (!is.und(cached)) {
    return cached;
  }
  var baseline = 100;
  var tempEl = document.createElement(el.tagName);
  var parentEl = el.parentNode && el.parentNode !== document ? el.parentNode : document.body;
  parentEl.appendChild(tempEl);
  tempEl.style.position = 'absolute';
  tempEl.style.width = baseline + unit;
  var factor = baseline / tempEl.offsetWidth;
  parentEl.removeChild(tempEl);
  var convertedUnit = factor * parseFloat(value);
  cache.CSS[value + unit] = convertedUnit;
  return convertedUnit;
}
function getCSSValue(el, prop, unit) {
  if (prop in el.style) {
    var uppercasePropName = prop.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    var value = el.style[prop] || getComputedStyle(el).getPropertyValue(uppercasePropName) || '0';
    return unit ? convertPxToUnit(el, value, unit) : value;
  }
}
function getAnimationType(el, prop) {
  if (is.dom(el) && !is.inp(el) && (!is.nil(getAttribute(el, prop)) || is.svg(el) && el[prop])) {
    return 'attribute';
  }
  if (is.dom(el) && arrayContains(validTransforms, prop)) {
    return 'transform';
  }
  if (is.dom(el) && prop !== 'transform' && getCSSValue(el, prop)) {
    return 'css';
  }
  if (el[prop] != null) {
    return 'object';
  }
}
function getElementTransforms(el) {
  if (!is.dom(el)) {
    return;
  }
  var str = el.style.transform || '';
  var reg = /(\w+)\(([^)]*)\)/g;
  var transforms = new Map();
  var m;
  while (m = reg.exec(str)) {
    transforms.set(m[1], m[2]);
  }
  return transforms;
}
function getTransformValue(el, propName, animatable, unit) {
  var defaultVal = stringContains(propName, 'scale') ? 1 : 0 + getTransformUnit(propName);
  var value = getElementTransforms(el).get(propName) || defaultVal;
  if (animatable) {
    animatable.transforms.list.set(propName, value);
    animatable.transforms['last'] = propName;
  }
  return unit ? convertPxToUnit(el, value, unit) : value;
}
function getOriginalTargetValue(target, propName, unit, animatable) {
  switch (getAnimationType(target, propName)) {
    case 'transform':
      return getTransformValue(target, propName, animatable, unit);
    case 'css':
      return getCSSValue(target, propName, unit);
    case 'attribute':
      return getAttribute(target, propName);
    default:
      return target[propName] || 0;
  }
}
function getRelativeValue(to, from) {
  var operator = /^(\*=|\+=|-=)/.exec(to);
  if (!operator) {
    return to;
  }
  var u = getUnit(to) || 0;
  var x = parseFloat(from);
  var y = parseFloat(to.replace(operator[0], ''));
  switch (operator[0][0]) {
    case '+':
      return x + y + u;
    case '-':
      return x - y + u;
    case '*':
      return x * y + u;
  }
}
function validateValue(val, unit) {
  if (is.col(val)) {
    return colorToRgb(val);
  }
  if (/\s/g.test(val)) {
    return val;
  }
  var originalUnit = getUnit(val);
  var unitLess = originalUnit ? val.substr(0, val.length - originalUnit.length) : val;
  if (unit) {
    return unitLess + unit;
  }
  return unitLess;
}

// getTotalLength() equivalent for circle, rect, polyline, polygon and line shapes
// adapted from https://gist.github.com/SebLambla/3e0550c496c236709744

function getDistance(p1, p2) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}
function getCircleLength(el) {
  return Math.PI * 2 * getAttribute(el, 'r');
}
function getRectLength(el) {
  return getAttribute(el, 'width') * 2 + getAttribute(el, 'height') * 2;
}
function getLineLength(el) {
  return getDistance({
    x: getAttribute(el, 'x1'),
    y: getAttribute(el, 'y1')
  }, {
    x: getAttribute(el, 'x2'),
    y: getAttribute(el, 'y2')
  });
}
function getPolylineLength(el) {
  var points = el.points;
  var totalLength = 0;
  var previousPos;
  for (var i = 0; i < points.numberOfItems; i++) {
    var currentPos = points.getItem(i);
    if (i > 0) {
      totalLength += getDistance(previousPos, currentPos);
    }
    previousPos = currentPos;
  }
  return totalLength;
}
function getPolygonLength(el) {
  var points = el.points;
  return getPolylineLength(el) + getDistance(points.getItem(points.numberOfItems - 1), points.getItem(0));
}

// Path animation

function getTotalLength(el) {
  if (el.getTotalLength) {
    return el.getTotalLength();
  }
  switch (el.tagName.toLowerCase()) {
    case 'circle':
      return getCircleLength(el);
    case 'rect':
      return getRectLength(el);
    case 'line':
      return getLineLength(el);
    case 'polyline':
      return getPolylineLength(el);
    case 'polygon':
      return getPolygonLength(el);
  }
}
function setDashoffset(el) {
  var pathLength = getTotalLength(el);
  el.setAttribute('stroke-dasharray', pathLength);
  return pathLength;
}

// Motion path

function getParentSvgEl(el) {
  var parentEl = el.parentNode;
  while (is.svg(parentEl)) {
    if (!is.svg(parentEl.parentNode)) {
      break;
    }
    parentEl = parentEl.parentNode;
  }
  return parentEl;
}
function getParentSvg(pathEl, svgData) {
  var svg = svgData || {};
  var parentSvgEl = svg.el || getParentSvgEl(pathEl);
  var rect = parentSvgEl.getBoundingClientRect();
  var viewBoxAttr = getAttribute(parentSvgEl, 'viewBox');
  var width = rect.width;
  var height = rect.height;
  var viewBox = svg.viewBox || (viewBoxAttr ? viewBoxAttr.split(' ') : [0, 0, width, height]);
  return {
    el: parentSvgEl,
    viewBox: viewBox,
    x: viewBox[0] / 1,
    y: viewBox[1] / 1,
    w: width,
    h: height,
    vW: viewBox[2],
    vH: viewBox[3]
  };
}
function getPath(path, percent) {
  var pathEl = is.str(path) ? selectString(path)[0] : path;
  var p = percent || 100;
  return function (property) {
    return {
      property: property,
      el: pathEl,
      svg: getParentSvg(pathEl),
      totalLength: getTotalLength(pathEl) * (p / 100)
    };
  };
}
function getPathProgress(path, progress, isPathTargetInsideSVG) {
  function point(offset) {
    if (offset === void 0) offset = 0;
    var l = progress + offset >= 1 ? progress + offset : 0;
    return path.el.getPointAtLength(l);
  }
  var svg = getParentSvg(path.el, path.svg);
  var p = point();
  var p0 = point(-1);
  var p1 = point(+1);
  var scaleX = isPathTargetInsideSVG ? 1 : svg.w / svg.vW;
  var scaleY = isPathTargetInsideSVG ? 1 : svg.h / svg.vH;
  switch (path.property) {
    case 'x':
      return (p.x - svg.x) * scaleX;
    case 'y':
      return (p.y - svg.y) * scaleY;
    case 'angle':
      return Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180 / Math.PI;
  }
}

// Decompose value

function decomposeValue(val, unit) {
  // const rgx = /-?\d*\.?\d+/g; // handles basic numbers
  // const rgx = /[+-]?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g; // handles exponents notation
  var rgx = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g; // handles exponents notation
  var value = validateValue(is.pth(val) ? val.totalLength : val, unit) + '';
  return {
    original: value,
    numbers: value.match(rgx) ? value.match(rgx).map(Number) : [0],
    strings: is.str(val) || unit ? value.split(rgx) : []
  };
}

// Animatables

function parseTargets(targets) {
  var targetsArray = targets ? flattenArray(is.arr(targets) ? targets.map(toArray) : toArray(targets)) : [];
  return filterArray(targetsArray, function (item, pos, self) {
    return self.indexOf(item) === pos;
  });
}
function getAnimatables(targets) {
  var parsed = parseTargets(targets);
  return parsed.map(function (t, i) {
    return {
      target: t,
      id: i,
      total: parsed.length,
      transforms: {
        list: getElementTransforms(t)
      }
    };
  });
}

// Properties

function normalizePropertyTweens(prop, tweenSettings) {
  var settings = cloneObject(tweenSettings);
  // Override duration if easing is a spring
  if (/^spring/.test(settings.easing)) {
    settings.duration = spring(settings.easing);
  }
  if (is.arr(prop)) {
    var l = prop.length;
    var isFromTo = l === 2 && !is.obj(prop[0]);
    if (!isFromTo) {
      // Duration divided by the number of tweens
      if (!is.fnc(tweenSettings.duration)) {
        settings.duration = tweenSettings.duration / l;
      }
    } else {
      // Transform [from, to] values shorthand to a valid tween value
      prop = {
        value: prop
      };
    }
  }
  var propArray = is.arr(prop) ? prop : [prop];
  return propArray.map(function (v, i) {
    var obj = is.obj(v) && !is.pth(v) ? v : {
      value: v
    };
    // Default delay value should only be applied to the first tween
    if (is.und(obj.delay)) {
      obj.delay = !i ? tweenSettings.delay : 0;
    }
    // Default endDelay value should only be applied to the last tween
    if (is.und(obj.endDelay)) {
      obj.endDelay = i === propArray.length - 1 ? tweenSettings.endDelay : 0;
    }
    return obj;
  }).map(function (k) {
    return mergeObjects(k, settings);
  });
}
function flattenKeyframes(keyframes) {
  var propertyNames = filterArray(flattenArray(keyframes.map(function (key) {
    return Object.keys(key);
  })), function (p) {
    return is.key(p);
  }).reduce(function (a, b) {
    if (a.indexOf(b) < 0) {
      a.push(b);
    }
    return a;
  }, []);
  var properties = {};
  var loop = function (i) {
    var propName = propertyNames[i];
    properties[propName] = keyframes.map(function (key) {
      var newKey = {};
      for (var p in key) {
        if (is.key(p)) {
          if (p == propName) {
            newKey.value = key[p];
          }
        } else {
          newKey[p] = key[p];
        }
      }
      return newKey;
    });
  };
  for (var i = 0; i < propertyNames.length; i++) loop(i);
  return properties;
}
function getProperties(tweenSettings, params) {
  var properties = [];
  var keyframes = params.keyframes;
  if (keyframes) {
    params = mergeObjects(flattenKeyframes(keyframes), params);
  }
  for (var p in params) {
    if (is.key(p)) {
      properties.push({
        name: p,
        tweens: normalizePropertyTweens(params[p], tweenSettings)
      });
    }
  }
  return properties;
}

// Tweens

function normalizeTweenValues(tween, animatable) {
  var t = {};
  for (var p in tween) {
    var value = getFunctionValue(tween[p], animatable);
    if (is.arr(value)) {
      value = value.map(function (v) {
        return getFunctionValue(v, animatable);
      });
      if (value.length === 1) {
        value = value[0];
      }
    }
    t[p] = value;
  }
  t.duration = parseFloat(t.duration);
  t.delay = parseFloat(t.delay);
  return t;
}
function normalizeTweens(prop, animatable) {
  var previousTween;
  return prop.tweens.map(function (t) {
    var tween = normalizeTweenValues(t, animatable);
    var tweenValue = tween.value;
    var to = is.arr(tweenValue) ? tweenValue[1] : tweenValue;
    var toUnit = getUnit(to);
    var originalValue = getOriginalTargetValue(animatable.target, prop.name, toUnit, animatable);
    var previousValue = previousTween ? previousTween.to.original : originalValue;
    var from = is.arr(tweenValue) ? tweenValue[0] : previousValue;
    var fromUnit = getUnit(from) || getUnit(originalValue);
    var unit = toUnit || fromUnit;
    if (is.und(to)) {
      to = previousValue;
    }
    tween.from = decomposeValue(from, unit);
    tween.to = decomposeValue(getRelativeValue(to, from), unit);
    tween.start = previousTween ? previousTween.end : 0;
    tween.end = tween.start + tween.delay + tween.duration + tween.endDelay;
    tween.easing = parseEasings(tween.easing, tween.duration);
    tween.isPath = is.pth(tweenValue);
    tween.isPathTargetInsideSVG = tween.isPath && is.svg(animatable.target);
    tween.isColor = is.col(tween.from.original);
    if (tween.isColor) {
      tween.round = 1;
    }
    previousTween = tween;
    return tween;
  });
}

// Tween progress

var setProgressValue = {
  css: function (t, p, v) {
    return t.style[p] = v;
  },
  attribute: function (t, p, v) {
    return t.setAttribute(p, v);
  },
  object: function (t, p, v) {
    return t[p] = v;
  },
  transform: function (t, p, v, transforms, manual) {
    transforms.list.set(p, v);
    if (p === transforms.last || manual) {
      var str = '';
      transforms.list.forEach(function (value, prop) {
        str += prop + "(" + value + ") ";
      });
      t.style.transform = str;
    }
  }
};

// Set Value helper

function setTargetsValue(targets, properties) {
  var animatables = getAnimatables(targets);
  animatables.forEach(function (animatable) {
    for (var property in properties) {
      var value = getFunctionValue(properties[property], animatable);
      var target = animatable.target;
      var valueUnit = getUnit(value);
      var originalValue = getOriginalTargetValue(target, property, valueUnit, animatable);
      var unit = valueUnit || getUnit(originalValue);
      var to = getRelativeValue(validateValue(value, unit), originalValue);
      var animType = getAnimationType(target, property);
      setProgressValue[animType](target, property, to, animatable.transforms, true);
    }
  });
}

// Animations

function createAnimation(animatable, prop) {
  var animType = getAnimationType(animatable.target, prop.name);
  if (animType) {
    var tweens = normalizeTweens(prop, animatable);
    var lastTween = tweens[tweens.length - 1];
    return {
      type: animType,
      property: prop.name,
      animatable: animatable,
      tweens: tweens,
      duration: lastTween.end,
      delay: tweens[0].delay,
      endDelay: lastTween.endDelay
    };
  }
}
function getAnimations(animatables, properties) {
  return filterArray(flattenArray(animatables.map(function (animatable) {
    return properties.map(function (prop) {
      return createAnimation(animatable, prop);
    });
  })), function (a) {
    return !is.und(a);
  });
}

// Create Instance

function getInstanceTimings(animations, tweenSettings) {
  var animLength = animations.length;
  var getTlOffset = function (anim) {
    return anim.timelineOffset ? anim.timelineOffset : 0;
  };
  var timings = {};
  timings.duration = animLength ? Math.max.apply(Math, animations.map(function (anim) {
    return getTlOffset(anim) + anim.duration;
  })) : tweenSettings.duration;
  timings.delay = animLength ? Math.min.apply(Math, animations.map(function (anim) {
    return getTlOffset(anim) + anim.delay;
  })) : tweenSettings.delay;
  timings.endDelay = animLength ? timings.duration - Math.max.apply(Math, animations.map(function (anim) {
    return getTlOffset(anim) + anim.duration - anim.endDelay;
  })) : tweenSettings.endDelay;
  return timings;
}
var instanceID = 0;
function createNewInstance(params) {
  var instanceSettings = replaceObjectProps(defaultInstanceSettings, params);
  var tweenSettings = replaceObjectProps(defaultTweenSettings, params);
  var properties = getProperties(tweenSettings, params);
  var animatables = getAnimatables(params.targets);
  var animations = getAnimations(animatables, properties);
  var timings = getInstanceTimings(animations, tweenSettings);
  var id = instanceID;
  instanceID++;
  return mergeObjects(instanceSettings, {
    id: id,
    children: [],
    animatables: animatables,
    animations: animations,
    duration: timings.duration,
    delay: timings.delay,
    endDelay: timings.endDelay
  });
}

// Core

var activeInstances = [];
var engine = function () {
  var raf;
  function play() {
    if (!raf && (!isDocumentHidden() || !anime.suspendWhenDocumentHidden) && activeInstances.length > 0) {
      raf = requestAnimationFrame(step);
    }
  }
  function step(t) {
    // memo on algorithm issue:
    // dangerous iteration over mutable `activeInstances`
    // (that collection may be updated from within callbacks of `tick`-ed animation instances)
    var activeInstancesLength = activeInstances.length;
    var i = 0;
    while (i < activeInstancesLength) {
      var activeInstance = activeInstances[i];
      if (!activeInstance.paused) {
        activeInstance.tick(t);
        i++;
      } else {
        activeInstances.splice(i, 1);
        activeInstancesLength--;
      }
    }
    raf = i > 0 ? requestAnimationFrame(step) : undefined;
  }
  function handleVisibilityChange() {
    if (!anime.suspendWhenDocumentHidden) {
      return;
    }
    if (isDocumentHidden()) {
      // suspend ticks
      raf = cancelAnimationFrame(raf);
    } else {
      // is back to active tab
      // first adjust animations to consider the time that ticks were suspended
      activeInstances.forEach(function (instance) {
        return instance._onDocumentVisibility();
      });
      engine();
    }
  }
  if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', handleVisibilityChange);
  }
  return play;
}();
function isDocumentHidden() {
  return !!document && document.hidden;
}

// Public Instance

function anime(params) {
  if (params === void 0) params = {};
  var startTime = 0,
    lastTime = 0,
    now = 0;
  var children,
    childrenLength = 0;
  var resolve = null;
  function makePromise(instance) {
    var promise = window.Promise && new Promise(function (_resolve) {
      return resolve = _resolve;
    });
    instance.finished = promise;
    return promise;
  }
  var instance = createNewInstance(params);
  makePromise(instance);
  function toggleInstanceDirection() {
    var direction = instance.direction;
    if (direction !== 'alternate') {
      instance.direction = direction !== 'normal' ? 'normal' : 'reverse';
    }
    instance.reversed = !instance.reversed;
    children.forEach(function (child) {
      return child.reversed = instance.reversed;
    });
  }
  function adjustTime(time) {
    return instance.reversed ? instance.duration - time : time;
  }
  function resetTime() {
    startTime = 0;
    lastTime = adjustTime(instance.currentTime) * (1 / anime.speed);
  }
  function seekChild(time, child) {
    if (child) {
      child.seek(time - child.timelineOffset);
    }
  }
  function syncInstanceChildren(time) {
    if (!instance.reversePlayback) {
      for (var i = 0; i < childrenLength; i++) {
        seekChild(time, children[i]);
      }
    } else {
      for (var i$1 = childrenLength; i$1--;) {
        seekChild(time, children[i$1]);
      }
    }
  }
  function setAnimationsProgress(insTime) {
    var i = 0;
    var animations = instance.animations;
    var animationsLength = animations.length;
    while (i < animationsLength) {
      var anim = animations[i];
      var animatable = anim.animatable;
      var tweens = anim.tweens;
      var tweenLength = tweens.length - 1;
      var tween = tweens[tweenLength];
      // Only check for keyframes if there is more than one tween
      if (tweenLength) {
        tween = filterArray(tweens, function (t) {
          return insTime < t.end;
        })[0] || tween;
      }
      var elapsed = minMax(insTime - tween.start - tween.delay, 0, tween.duration) / tween.duration;
      var eased = isNaN(elapsed) ? 1 : tween.easing(elapsed);
      var strings = tween.to.strings;
      var round = tween.round;
      var numbers = [];
      var toNumbersLength = tween.to.numbers.length;
      var progress = void 0;
      for (var n = 0; n < toNumbersLength; n++) {
        var value = void 0;
        var toNumber = tween.to.numbers[n];
        var fromNumber = tween.from.numbers[n] || 0;
        if (!tween.isPath) {
          value = fromNumber + eased * (toNumber - fromNumber);
        } else {
          value = getPathProgress(tween.value, eased * toNumber, tween.isPathTargetInsideSVG);
        }
        if (round) {
          if (!(tween.isColor && n > 2)) {
            value = Math.round(value * round) / round;
          }
        }
        numbers.push(value);
      }
      // Manual Array.reduce for better performances
      var stringsLength = strings.length;
      if (!stringsLength) {
        progress = numbers[0];
      } else {
        progress = strings[0];
        for (var s = 0; s < stringsLength; s++) {
          strings[s];
          var b = strings[s + 1];
          var n$1 = numbers[s];
          if (!isNaN(n$1)) {
            if (!b) {
              progress += n$1 + ' ';
            } else {
              progress += n$1 + b;
            }
          }
        }
      }
      setProgressValue[anim.type](animatable.target, anim.property, progress, animatable.transforms);
      anim.currentValue = progress;
      i++;
    }
  }
  function setCallback(cb) {
    if (instance[cb] && !instance.passThrough) {
      instance[cb](instance);
    }
  }
  function countIteration() {
    if (instance.remaining && instance.remaining !== true) {
      instance.remaining--;
    }
  }
  function setInstanceProgress(engineTime) {
    var insDuration = instance.duration;
    var insDelay = instance.delay;
    var insEndDelay = insDuration - instance.endDelay;
    var insTime = adjustTime(engineTime);
    instance.progress = minMax(insTime / insDuration * 100, 0, 100);
    instance.reversePlayback = insTime < instance.currentTime;
    if (children) {
      syncInstanceChildren(insTime);
    }
    if (!instance.began && instance.currentTime > 0) {
      instance.began = true;
      setCallback('begin');
    }
    if (!instance.loopBegan && instance.currentTime > 0) {
      instance.loopBegan = true;
      setCallback('loopBegin');
    }
    if (insTime <= insDelay && instance.currentTime !== 0) {
      setAnimationsProgress(0);
    }
    if (insTime >= insEndDelay && instance.currentTime !== insDuration || !insDuration) {
      setAnimationsProgress(insDuration);
    }
    if (insTime > insDelay && insTime < insEndDelay) {
      if (!instance.changeBegan) {
        instance.changeBegan = true;
        instance.changeCompleted = false;
        setCallback('changeBegin');
      }
      setCallback('change');
      setAnimationsProgress(insTime);
    } else {
      if (instance.changeBegan) {
        instance.changeCompleted = true;
        instance.changeBegan = false;
        setCallback('changeComplete');
      }
    }
    instance.currentTime = minMax(insTime, 0, insDuration);
    if (instance.began) {
      setCallback('update');
    }
    if (engineTime >= insDuration) {
      lastTime = 0;
      countIteration();
      if (!instance.remaining) {
        instance.paused = true;
        if (!instance.completed) {
          instance.completed = true;
          setCallback('loopComplete');
          setCallback('complete');
          if (!instance.passThrough && 'Promise' in window) {
            resolve();
            makePromise(instance);
          }
        }
      } else {
        startTime = now;
        setCallback('loopComplete');
        instance.loopBegan = false;
        if (instance.direction === 'alternate') {
          toggleInstanceDirection();
        }
      }
    }
  }
  instance.reset = function () {
    var direction = instance.direction;
    instance.passThrough = false;
    instance.currentTime = 0;
    instance.progress = 0;
    instance.paused = true;
    instance.began = false;
    instance.loopBegan = false;
    instance.changeBegan = false;
    instance.completed = false;
    instance.changeCompleted = false;
    instance.reversePlayback = false;
    instance.reversed = direction === 'reverse';
    instance.remaining = instance.loop;
    children = instance.children;
    childrenLength = children.length;
    for (var i = childrenLength; i--;) {
      instance.children[i].reset();
    }
    if (instance.reversed && instance.loop !== true || direction === 'alternate' && instance.loop === 1) {
      instance.remaining++;
    }
    setAnimationsProgress(instance.reversed ? instance.duration : 0);
  };

  // internal method (for engine) to adjust animation timings before restoring engine ticks (rAF)
  instance._onDocumentVisibility = resetTime;

  // Set Value helper

  instance.set = function (targets, properties) {
    setTargetsValue(targets, properties);
    return instance;
  };
  instance.tick = function (t) {
    now = t;
    if (!startTime) {
      startTime = now;
    }
    setInstanceProgress((now + (lastTime - startTime)) * anime.speed);
  };
  instance.seek = function (time) {
    setInstanceProgress(adjustTime(time));
  };
  instance.pause = function () {
    instance.paused = true;
    resetTime();
  };
  instance.play = function () {
    if (!instance.paused) {
      return;
    }
    if (instance.completed) {
      instance.reset();
    }
    instance.paused = false;
    activeInstances.push(instance);
    resetTime();
    engine();
  };
  instance.reverse = function () {
    toggleInstanceDirection();
    instance.completed = instance.reversed ? false : true;
    resetTime();
  };
  instance.restart = function () {
    instance.reset();
    instance.play();
  };
  instance.remove = function (targets) {
    var targetsArray = parseTargets(targets);
    removeTargetsFromInstance(targetsArray, instance);
  };
  instance.reset();
  if (instance.autoplay) {
    instance.play();
  }
  return instance;
}

// Remove targets from animation

function removeTargetsFromAnimations(targetsArray, animations) {
  for (var a = animations.length; a--;) {
    if (arrayContains(targetsArray, animations[a].animatable.target)) {
      animations.splice(a, 1);
    }
  }
}
function removeTargetsFromInstance(targetsArray, instance) {
  var animations = instance.animations;
  var children = instance.children;
  removeTargetsFromAnimations(targetsArray, animations);
  for (var c = children.length; c--;) {
    var child = children[c];
    var childAnimations = child.animations;
    removeTargetsFromAnimations(targetsArray, childAnimations);
    if (!childAnimations.length && !child.children.length) {
      children.splice(c, 1);
    }
  }
  if (!animations.length && !children.length) {
    instance.pause();
  }
}
function removeTargetsFromActiveInstances(targets) {
  var targetsArray = parseTargets(targets);
  for (var i = activeInstances.length; i--;) {
    var instance = activeInstances[i];
    removeTargetsFromInstance(targetsArray, instance);
  }
}

// Stagger helpers

function stagger(val, params) {
  if (params === void 0) params = {};
  var direction = params.direction || 'normal';
  var easing = params.easing ? parseEasings(params.easing) : null;
  var grid = params.grid;
  var axis = params.axis;
  var fromIndex = params.from || 0;
  var fromFirst = fromIndex === 'first';
  var fromCenter = fromIndex === 'center';
  var fromLast = fromIndex === 'last';
  var isRange = is.arr(val);
  var val1 = isRange ? parseFloat(val[0]) : parseFloat(val);
  var val2 = isRange ? parseFloat(val[1]) : 0;
  var unit = getUnit(isRange ? val[1] : val) || 0;
  var start = params.start || 0 + (isRange ? val1 : 0);
  var values = [];
  var maxValue = 0;
  return function (el, i, t) {
    if (fromFirst) {
      fromIndex = 0;
    }
    if (fromCenter) {
      fromIndex = (t - 1) / 2;
    }
    if (fromLast) {
      fromIndex = t - 1;
    }
    if (!values.length) {
      for (var index = 0; index < t; index++) {
        if (!grid) {
          values.push(Math.abs(fromIndex - index));
        } else {
          var fromX = !fromCenter ? fromIndex % grid[0] : (grid[0] - 1) / 2;
          var fromY = !fromCenter ? Math.floor(fromIndex / grid[0]) : (grid[1] - 1) / 2;
          var toX = index % grid[0];
          var toY = Math.floor(index / grid[0]);
          var distanceX = fromX - toX;
          var distanceY = fromY - toY;
          var value = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
          if (axis === 'x') {
            value = -distanceX;
          }
          if (axis === 'y') {
            value = -distanceY;
          }
          values.push(value);
        }
        maxValue = Math.max.apply(Math, values);
      }
      if (easing) {
        values = values.map(function (val) {
          return easing(val / maxValue) * maxValue;
        });
      }
      if (direction === 'reverse') {
        values = values.map(function (val) {
          return axis ? val < 0 ? val * -1 : -val : Math.abs(maxValue - val);
        });
      }
    }
    var spacing = isRange ? (val2 - val1) / maxValue : val1;
    return start + spacing * (Math.round(values[i] * 100) / 100) + unit;
  };
}

// Timeline

function timeline(params) {
  if (params === void 0) params = {};
  var tl = anime(params);
  tl.duration = 0;
  tl.add = function (instanceParams, timelineOffset) {
    var tlIndex = activeInstances.indexOf(tl);
    var children = tl.children;
    if (tlIndex > -1) {
      activeInstances.splice(tlIndex, 1);
    }
    function passThrough(ins) {
      ins.passThrough = true;
    }
    for (var i = 0; i < children.length; i++) {
      passThrough(children[i]);
    }
    var insParams = mergeObjects(instanceParams, replaceObjectProps(defaultTweenSettings, params));
    insParams.targets = insParams.targets || params.targets;
    var tlDuration = tl.duration;
    insParams.autoplay = false;
    insParams.direction = tl.direction;
    insParams.timelineOffset = is.und(timelineOffset) ? tlDuration : getRelativeValue(timelineOffset, tlDuration);
    passThrough(tl);
    tl.seek(insParams.timelineOffset);
    var ins = anime(insParams);
    passThrough(ins);
    children.push(ins);
    var timings = getInstanceTimings(children, params);
    tl.delay = timings.delay;
    tl.endDelay = timings.endDelay;
    tl.duration = timings.duration;
    tl.seek(0);
    tl.reset();
    if (tl.autoplay) {
      tl.play();
    }
    return tl;
  };
  return tl;
}
anime.version = '3.2.1';
anime.speed = 1;
// TODO:#review: naming, documentation
anime.suspendWhenDocumentHidden = true;
anime.running = activeInstances;
anime.remove = removeTargetsFromActiveInstances;
anime.get = getOriginalTargetValue;
anime.set = setTargetsValue;
anime.convertPx = convertPxToUnit;
anime.path = getPath;
anime.setDashoffset = setDashoffset;
anime.stagger = stagger;
anime.timeline = timeline;
anime.easing = parseEasings;
anime.penner = penner;
anime.random = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var Modal = {
  css: null,
  exports: {
    onMounted(props) {
      anime({
        targets: this.$('.modal-card'),
        translateY: [-200, 0],
        opacity: [0, 1],
        delay: 50,
        duration: 1500
      });
    }
  },
  template: (template, expressionTypes, bindingTypes, getComponent) => template('<div class="modal is-active"><div expr11="expr11" class="modal-background"></div><div class="modal-card"><div class="modal-content"><div class="box"><slot expr12="expr12" name="content"></slot><slot expr13="expr13" name="footer"></slot></div></div></div></div>', [{
    redundantAttribute: 'expr11',
    selector: '[expr11]',
    expressions: [{
      type: expressionTypes.EVENT,
      name: 'onclick',
      evaluate: _scope => _scope.props.close
    }]
  }, {
    type: bindingTypes.SLOT,
    attributes: [],
    name: 'content',
    redundantAttribute: 'expr12',
    selector: '[expr12]'
  }, {
    type: bindingTypes.SLOT,
    attributes: [],
    name: 'footer',
    redundantAttribute: 'expr13',
    selector: '[expr13]'
  }]),
  name: 'modal'
};

var MyHeader = {
  css: `my-header .st0,[is="my-header"] .st0{ stroke-width : 2; stroke : #3D566E; fill-opacity :0 } my-header .st1,[is="my-header"] .st1{ stroke-width : 2; stroke : #FF3333; fill-opacity :0 } my-header .transparent,[is="my-header"] .transparent{ background : unset; } my-header .navbar-brand,[is="my-header"] .navbar-brand{ width: 50vh; max-height: 15vh; } @media (max-height: 768px), screen and (orientation: portrait) { my-header .navbar-brand,[is="my-header"] .navbar-brand{ width: 50vw; max-height: 25vh; } my-header .navbar,[is="my-header"] .navbar{ display : flex; justify-content : center; } }`,
  exports: {
    onMounted() {
      anime({
        targets: this.$$('path '),
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 1500,
        delay: anime.stagger(50)
      });
    }
  },
  template: (template, expressionTypes, bindingTypes, getComponent) => template('<nav class="navbar transparent" role="navigation" aria-label="main navigation"><div class="navbar-brand"><svg version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 396.9 141.7" style="enable-background:new 0 0 396.9 141.7;" xml:space="preserve"><path shape-rendering="geometricPrecision " class="st0" d="M88.3,79.4c-1.8,1.8-4.7,2.9-7.9,2.9c-3.3,0-5.7-0.9-7.8-3.2v14.7h-8.1V49.6h7.8v3c2.2-2.5,4.7-3.4,8.1-3.4  c3.2,0,6.1,1.1,7.9,2.9c3.2,3.2,3.3,8.8,3.3,13.6C91.6,70.6,91.5,76.2,88.3,79.4z M78,56.5c-4.8,0-5.5,4-5.5,9.3  c0,5.3,0.6,9.3,5.5,9.3s5.5-4,5.5-9.3C83.5,60.5,82.9,56.5,78,56.5z"/><path shape-rendering="geometricPrecision " class="st0" d="M115.8,81.9v-2.8c-2.2,2.2-4.2,3.1-7.9,3.1c-3.7,0-6.3-0.9-8.3-2.9C97.9,77.6,97,75,97,72.1  c0-5.2,3.5-9.4,11.1-9.4h7.6v-1.6c0-3.5-1.7-5.1-6-5.1c-3.1,0-4.5,0.7-6.2,2.7l-5.2-5c3.2-3.5,6.3-4.5,11.7-4.5  c9.1,0,13.8,3.8,13.8,11.4v21.3H115.8z M115.6,68.3h-6.4c-2.9,0-4.5,1.4-4.5,3.7c0,2.2,1.5,3.7,4.7,3.7c2.2,0,3.7-0.2,5.1-1.6  c0.9-0.8,1.2-2.1,1.2-4.1V68.3z"/><path shape-rendering="geometricPrecision " class="st0" d="M150,58.4c-1.2-1.2-2.3-1.9-4.3-1.9c-2.5,0-5.2,1.9-5.2,6v19.5h-8.1V49.6h7.9v3.1c1.6-1.9,4.7-3.5,8.1-3.5  c3.2,0,5.4,0.8,7.6,3L150,58.4z"/><path shape-rendering="geometricPrecision " class="st0" d="M171.6,82.3c-6.5,0-14.5-3.5-14.5-16.6c0-13.1,8-16.5,14.5-16.5c4.5,0,7.8,1.4,10.7,4.3l-5.5,5.5  c-1.7-1.8-3.1-2.5-5.2-2.5c-1.9,0-3.4,0.7-4.6,2.1c-1.2,1.6-1.8,3.7-1.8,7.1c0,3.4,0.6,5.7,1.8,7.2c1.2,1.4,2.7,2.1,4.6,2.1  c2.1,0,3.5-0.7,5.2-2.5l5.5,5.4C179.4,80.9,176.1,82.3,171.6,82.3z"/><path shape-rendering="geometricPrecision " class="st0" d="M209.8,78.3c-2,2.1-5.3,4-10.1,4s-8-1.9-10-4c-2.9-3-3.7-6.7-3.7-12.6c0-5.8,0.7-9.5,3.7-12.5c2-2.1,5.2-4,10-4  s8.1,1.9,10.1,4c2.9,3,3.7,6.7,3.7,12.5C213.4,71.6,212.7,75.3,209.8,78.3z M203.5,57.9c-0.9-0.9-2.2-1.4-3.8-1.4s-2.8,0.5-3.7,1.4  c-1.7,1.7-1.9,4.5-1.9,7.8c0,3.4,0.2,6.2,1.9,7.9c0.9,0.9,2.1,1.4,3.7,1.4s2.9-0.5,3.8-1.4c1.7-1.7,1.9-4.5,1.9-7.9  C205.4,62.4,205.2,59.6,203.5,57.9z"/><path shape-rendering="geometricPrecision " class="st0" d="M239.7,81.9v-3c-2.1,2.2-5.1,3.4-8.1,3.4c-3.2,0-5.8-1.1-7.6-2.9c-2.6-2.6-3.3-5.6-3.3-9.2V49.6h8.1v19.6  c0,4.4,2.8,5.9,5.3,5.9c2.5,0,5.4-1.5,5.4-5.9V49.6h8.1v32.3H239.7z"/><path shape-rendering="geometricPrecision " class="st0" d="M274.3,58.4c-1.2-1.2-2.3-1.9-4.3-1.9c-2.5,0-5.2,1.9-5.2,6v19.5h-8.1V49.6h7.9v3.1c1.6-1.9,4.7-3.5,8.1-3.5  c3.2,0,5.4,0.8,7.6,3L274.3,58.4z"/><path shape-rendering="geometricPrecision " class="st1" d="M334,81.9v-3c-2.1,2.2-5.1,3.4-8.1,3.4c-3.2,0-5.8-1.1-7.6-2.9c-2.6-2.6-3.3-5.6-3.3-9.2V49.6h8.1v19.6  c0,4.4,2.8,5.9,5.3,5.9c2.5,0,5.4-1.5,5.4-5.9V49.6h8.1v32.3H334z"/><path shape-rendering="geometricPrecision " class="st1" d="M374.8,79.4c-1.8,1.8-4.7,2.9-7.9,2.9c-3.3,0-5.7-0.9-7.8-3.2v14.7H351V49.6h7.8v3c2.2-2.5,4.7-3.4,8.1-3.4  c3.2,0,6.1,1.1,7.9,2.9c3.2,3.2,3.3,8.8,3.3,13.6C378.1,70.6,378,76.2,374.8,79.4z M364.5,56.5c-4.8,0-5.5,4-5.5,9.3  c0,5.3,0.6,9.3,5.5,9.3s5.5-4,5.5-9.3C370,60.5,369.4,56.5,364.5,56.5z"/><g><g><path shape-rendering="geometricPrecision " class="st0" d="M295.2,55.9c2.8,0,5.7,0.5,7.5,2.2l5-5c-3.1-2.9-7.3-3.8-12.4-3.8c-0.2,0-0.3,0-0.5,0v6.6    C295,55.9,295.1,55.9,295.2,55.9z"/><path shape-rendering="geometricPrecision " class="st0" d="M299,62.3l-4.2-0.4v7l2.5,0.2c2.5,0.2,3.4,1.4,3.4,3c0,2.4-2.9,3.4-5.7,3.4c-0.1,0-0.1,0-0.2,0v6.9    c0,0,0.1,0,0.1,0c7.6,0,13.7-3.4,13.7-10.6C308.7,66.3,305.4,62.9,299,62.3z"/></g><g><path shape-rendering="geometricPrecision " class="st1" d="M282.8,59.5c0,6,3.6,8.5,9.4,9.1l2.6,0.3v-7l-0.9-0.1c-2.9-0.2-3.4-1.6-3.4-2.8c0-1.6,1.3-3,4.3-3.1v-6.6    C288.5,49.4,282.8,53,282.8,59.5z"/><path shape-rendering="geometricPrecision " class="st1" d="M286.4,72.4l-5.3,5.3c4.1,4.1,8.6,4.6,13.7,4.7v-6.9C292.4,75.4,289,75,286.4,72.4z"/></g></g><g><path shape-rendering="geometricPrecision " class="st1" d="M35.4,79.9l-13.7,0c-2.2,0-4.1,1.8-4.1,4.1c0,2.2,1.8,4.1,4.1,4.1l9.7,0v9.7c0,2.2,1.8,4.1,4.1,4.1   c1.1,0,2.1-0.5,2.9-1.2c0.7-0.7,1.2-1.8,1.2-2.9l0-13.7c0-1.1-0.5-2.1-1.2-2.9C37.5,80.3,36.5,79.9,35.4,79.9"/><path shape-rendering="geometricPrecision " class="st0" d="M52,63l-13.7,0c-2.2,0-4.1,1.8-4.1,4.1c0,2.2,1.8,4.1,4.1,4.1l9.7,0v9.7c0,2.2,1.8,4.1,4.1,4.1   c1.1,0,2.1-0.5,2.9-1.2c0.7-0.7,1.2-1.8,1.2-2.9l0-13.7c0-1.1-0.5-2.1-1.2-2.9C54.1,63.5,53.1,63,52,63"/><path shape-rendering="geometricPrecision " class="st1" d="M68.5,46.1l-13.7,0c-2.2,0-4.1,1.8-4.1,4.1c0,2.2,1.8,4.1,4.1,4.1l9.7,0V64c0,2.2,1.8,4.1,4.1,4.1   c1.1,0,2.1-0.5,2.9-1.2c0.7-0.7,1.2-1.8,1.2-2.9l0-13.7c0-1.1-0.5-2.1-1.2-2.9S69.7,46.1,68.5,46.1"/></g></svg></div></nav>', []),
  name: 'my-header'
};

Math.toRadians = function (degrees) {
  if (degrees < 0) {
    degrees += 360; /*from w  w  w .  java2 s.c o m*/
  }

  return degrees / 180 * Math.PI;
};
/**
 * Formate les données des facettes d'une formation demandées dans l'ordre suivant :
 *  - 1 : pct_sansmention
 *  - 2 : pct_ab
 * @param {*} facet_group 
 */
function formationSummary(facet_group, count_etablissement) {
  let newRecap = {};
  //Les données dans le tableau sont rangées dans l'ordre des facettes dans la requête : 1 = pct_sansmention, 2 = pct_ab, ...
  let pct_sansmention = facet_group[0].facets.reduce((accumulateur, value) => accumulateur + parseInt(value.name) * value.count, 0) / count_etablissement;
  let pct_ab = facet_group[1].facets.reduce((accumulateur, value) => accumulateur + parseInt(value.name) * value.count, 0) / count_etablissement;
  let pct_b = facet_group[2].facets.reduce((accumulateur, value) => accumulateur + parseInt(value.name) * value.count, 0) / count_etablissement;
  let pct_tb = facet_group[3].facets.reduce((accumulateur, value) => accumulateur + parseInt(value.name) * value.count, 0) / count_etablissement;
  let pct_tbf = facet_group[4].facets.reduce((accumulateur, value) => accumulateur + parseInt(value.name) * value.count, 0) / count_etablissement;
  let moyenne_admis = ((11 * pct_sansmention + 13 * pct_ab + 15 * pct_b + 17 * pct_tb + 19 * pct_tbf) / 100).toFixed(1);
  let capac_fin = Math.floor(facet_group[5].facets.reduce((accumulateur, value) => accumulateur + parseInt(value.name) * value.count, 0) / count_etablissement);
  let taux_acces_ens = Math.floor(facet_group[6].facets.reduce((accumulateur, value) => accumulateur + parseInt(value.name) * value.count, 0) / count_etablissement);
  let pct_f = Math.round(facet_group[7].facets.reduce((accumulateur, value) => accumulateur + parseInt(value.name) * value.count, 0) / count_etablissement);
  let pct_bg = Math.round(facet_group[8].facets.reduce((accumulateur, value) => accumulateur + parseInt(value.name) * value.count, 0) / count_etablissement);
  let pct_bt = Math.round(facet_group[9].facets.reduce((accumulateur, value) => accumulateur + parseInt(value.name) * value.count, 0) / count_etablissement);
  let pct_bp = Math.round(facet_group[10].facets.reduce((accumulateur, value) => accumulateur + parseInt(value.name) * value.count, 0) / count_etablissement);
  newRecap.moyenne = moyenne_admis;
  newRecap.nb_form = count_etablissement;
  newRecap.capac = capac_fin;
  newRecap.select = taux_acces_ens;
  newRecap.genre = {
    label: "Répartition par genre",
    elements: [{
      percentage: pct_f,
      color: "#003f5c",
      name: "F",
      title: "Femme"
    }, {
      percentage: 100 - pct_f,
      color: "#f95d6a",
      name: "H",
      title: "Homme"
    }]
  }, newRecap.bac = {
    label: "Répartition par bac",
    elements: [{
      percentage: pct_bg,
      color: "#003f5c",
      name: "Gen",
      title: "Général"
    }, {
      percentage: pct_bt,
      color: "#2f4b7c",
      name: "Tech",
      title: "Technologique"
    }, {
      percentage: pct_bp,
      color: "#665191",
      name: "Pro",
      title: "Professionnel"
    }, {
      percentage: 100 - pct_bg - pct_bt - pct_bp,
      color: "#a05195",
      name: "Aut",
      title: "Autre"
    }]
  }, newRecap.mention = {
    label: "Répartition par mention au bac",
    elements: [{
      percentage: Math.round(pct_sansmention),
      color: "#003f5c",
      name: "P",
      title: "Passable"
    }, {
      percentage: Math.round(pct_ab),
      color: "#2f4b7c",
      name: "AB",
      title: "Assez Bien"
    }, {
      percentage: Math.round(pct_b),
      color: "#665191",
      name: "B",
      title: "Bien"
    }, {
      percentage: Math.round(pct_tb),
      color: "#a05195",
      name: "TB",
      title: "Très Bien"
    }, {
      percentage: Math.round(pct_tbf),
      color: "#f95d6a",
      name: "TBF",
      title: "Très Bien avec Félicitation du jury"
    }]
  };
  return newRecap;
}
function moyenne(record) {
  let total = record.acc_tot - record.acc_at;
  let note = 0;
  note += 11 * record.acc_sansmention;
  note += 13 * record.acc_ab;
  note += 15 * record.acc_b;
  note += 17 * record.acc_tb;
  note += 19 * record.acc_tbf;
  return parseFloat((note / total).toFixed(1));
}
function filterForModal(data) {
  return {
    title: data.lib_comp_voe_ins,
    selectivite: data.select_form,
    genre: {
      label: "Répartition par genre",
      elements: [{
        percentage: data.pct_f,
        color: "#003f5c",
        name: "F",
        title: "Femme"
      }, {
        percentage: 100 - data.pct_f,
        color: "#f95d6a",
        name: "H",
        title: "Homme"
      }]
    },
    bac: {
      label: "Répartition par bac",
      elements: [{
        percentage: data.pct_bg,
        color: "#003f5c",
        name: "Gen",
        title: "Général"
      }, {
        percentage: data.pct_bt,
        color: "#2f4b7c",
        name: "Tech",
        title: "Technologique"
      }, {
        percentage: data.pct_bp,
        color: "#665191",
        name: "Pro",
        title: "Professionnel"
      }, {
        percentage: 100 - data.pct_bg - data.pct_bt - data.pct_bp,
        color: "#a05195",
        name: "Aut",
        title: "Autre"
      }]
    },
    mention: {
      label: "Répartition par mention au bac",
      elements: [{
        percentage: data.pct_sansmention,
        color: "#003f5c",
        name: "P",
        title: "Passable"
      }, {
        percentage: data.pct_ab,
        color: "#2f4b7c",
        name: "AB",
        title: "Assez Bien"
      }, {
        percentage: data.pct_b,
        color: "#665191",
        name: "B",
        title: "Bien"
      }, {
        percentage: data.pct_tb,
        color: "#a05195",
        name: "TB",
        title: "Très Bien"
      }, {
        percentage: data.pct_tbf,
        color: "#f95d6a",
        name: "TBF",
        title: "Très Bien avec Félicitation du jury"
      }]
    },
    dates: [{
      text: "ouverture 27 mai",
      percentage: data.pct_acc_debutpp
    }, {
      text: "17 juin",
      percentage: data.pct_acc_datebac
    }, {
      text: "16 juillet",
      percentage: data.pct_acc_finpp
    }],
    text: [{
      text: data.ville_etab,
      title: "Ville"
    }, {
      text: data.dep_lib,
      title: "Département"
    }, {
      text: data.acad_mies,
      title: "Académie"
    }, {
      text: data.contrat_etab,
      title: "Contrat établissement"
    }, {
      text: data.capa_fin,
      title: "Capacité"
    }, {
      text: data.voe_tot,
      title: "Nombres de voeux"
    }, {
      text: `${100 - data.pct_aca_orig}%`,
      title: "Admis hors académie"
    }],
    list: {
      title: "Rang du dernier admis :",
      data: [{
        title: "Tous sauf les Bac technologiques",
        text: data.ran_grp1
      }, {
        title: "Bac technologiques toutes séries",
        text: data.ran_grp2
      }]
    },
    url: data.lien_form_psup
  };
}
function filterCoordinates(data, position, radius) {
  return data.filter(element => {
    var R = 6371; // kM
    var phi1 = Math.toRadians(position[1]);
    var phi2 = Math.toRadians(element.g_olocalisation_des_formations[0]);
    var deltaPhi = Math.toRadians(element.g_olocalisation_des_formations[0] - position[1]);
    var deltaLambda = Math.toRadians(element.g_olocalisation_des_formations[1] - position[0]);
    var a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) + Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c <= radius;
  });
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds.
function debounce(fn, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), wait);
  };
}
function compare(oldProps, newProps) {
  if (oldProps.length != newProps.length) return false;
  for (i = 0; i < newProps.length; i++) {
    if (newProps[i].key != oldProps[i].key) return false;
  }
  return true;
}
function toggleLight() {
  let themes = document.querySelectorAll('link[data-theme]');
  let activeTheme = document.querySelector('link[data-theme][rel="stylesheet"]:not([disabled])');
  // Trouver l'élément qui a le thème suivant
  let nextTheme = activeTheme == themes[0] ? themes[1] : themes[0];
  document.documentElement.classList.add('theme-transition');
  nextTheme.disabled = false;
  activeTheme.disabled = true;
  localStorage.setItem("theme", nextTheme.dataset.theme);
  // Supprimer la classe pour l'animation
  setTimeout(() => {
    document.documentElement.classList.remove('theme-transition');
  }, 1000);
}

var MyTable = {
  css: null,
  exports: {
    components: {
      ProgressBar,
      MyHeader
    },
    change(event, index) {
      this.props.change(this.props.data[index].key);
    },
    colors: ["has-background-primary", "has-background-link-light ", "has-background-danger-light", "has-background-grey-dark has-text-white-bis", "has-background-success-dark has-text-white-bis"],
    color(index) {
      return this.colors[index];
    },
    checkValue(value) {
      if (Number.isInteger(value) && value < 0) return "NR";
      return value;
    },
    onUpdated() {
      let target = this.$$('.animate').slice(0, 50);
      anime({
        targets: target,
        translateY: [-50, 0],
        opacity: [0, 1],
        easing: 'easeOutElastic(2, 0.3)',
        delay: anime.stagger(50)
      });
    },
    shouldUpdate(newProps, oldProps) {
      return JSON.stringify(oldProps.tag) != JSON.stringify(newProps.tag) || !compare(oldProps.data, newProps.data);
    }
  },
  template: (template, expressionTypes, bindingTypes, getComponent) => template('<div class="field is-grouped is-grouped-multiline"><div expr46="expr46" class="control"></div></div><table class="table is-fullwidth is-hoverable"><thead><tr><th expr49="expr49" class="has-text-link"></th></tr></thead><tbody><tr expr51="expr51" class="is-clickable animate"></tr></tbody></table>', [{
    type: bindingTypes.EACH,
    getKey: null,
    condition: null,
    template: template('<div class="tags has-addons"><span expr47="expr47"> </span><span expr48="expr48" class="tag is-delete"></span></div>', [{
      redundantAttribute: 'expr47',
      selector: '[expr47]',
      expressions: [{
        type: expressionTypes.TEXT,
        childNodeIndex: 0,
        evaluate: _scope => _scope.tag
      }, {
        type: expressionTypes.ATTRIBUTE,
        name: 'class',
        evaluate: _scope => ['tag ', _scope.color(_scope.index)].join('')
      }]
    }, {
      redundantAttribute: 'expr48',
      selector: '[expr48]',
      expressions: [{
        type: expressionTypes.EVENT,
        name: 'onclick',
        evaluate: _scope => () => {
          _scope.props.delete(_scope.tag);
        }
      }]
    }]),
    redundantAttribute: 'expr46',
    selector: '[expr46]',
    itemName: 'tag',
    indexName: 'index',
    evaluate: _scope => _scope.props.tag
  }, {
    type: bindingTypes.EACH,
    getKey: null,
    condition: null,
    template: template(' <span expr50="expr50" class="is-clickable"><span class="icon"><i class="fas fa-sort"></i></span></span>', [{
      expressions: [{
        type: expressionTypes.TEXT,
        childNodeIndex: 0,
        evaluate: _scope => [_scope.element.charAt(0).toUpperCase() + _scope.element.slice(1)].join('')
      }]
    }, {
      redundantAttribute: 'expr50',
      selector: '[expr50]',
      expressions: [{
        type: expressionTypes.EVENT,
        name: 'onclick',
        evaluate: _scope => () => {
          _scope.props.click(_scope.element);
        }
      }]
    }]),
    redundantAttribute: 'expr49',
    selector: '[expr49]',
    itemName: 'element',
    indexName: null,
    evaluate: _scope => _scope.props.header
  }, {
    type: bindingTypes.EACH,
    getKey: null,
    condition: null,
    template: template('<td expr52="expr52"></td><td><progress-bar expr53="expr53"></progress-bar></td>', [{
      expressions: [{
        type: expressionTypes.EVENT,
        name: 'onclick',
        evaluate: _scope => event => {
          _scope.change(event, _scope.index);
        }
      }]
    }, {
      type: bindingTypes.EACH,
      getKey: null,
      condition: null,
      template: template(' ', [{
        expressions: [{
          type: expressionTypes.TEXT,
          childNodeIndex: 0,
          evaluate: _scope => [_scope.checkValue(_scope.data[1])].join('')
        }]
      }]),
      redundantAttribute: 'expr52',
      selector: '[expr52]',
      itemName: 'data',
      indexName: null,
      evaluate: _scope => Object.entries(_scope.etablissement.data)
    }, {
      type: bindingTypes.TAG,
      getComponent: getComponent,
      evaluate: _scope => 'progress-bar',
      slots: [],
      attributes: [{
        type: expressionTypes.ATTRIBUTE,
        name: 'select',
        evaluate: _scope => _scope.etablissement.select
      }],
      redundantAttribute: 'expr53',
      selector: '[expr53]'
    }]),
    redundantAttribute: 'expr51',
    selector: '[expr51]',
    itemName: 'etablissement',
    indexName: 'index',
    evaluate: _scope => _scope.props.data
  }]),
  name: 'my-table'
};

var Timeline = {
  css: `timeline .timeline,[is="timeline"] .timeline{ margin: 0 auto; max-width: 750px; padding: 0px; font-family: "Fira Sans", sans-serif; } timeline .timeline li,[is="timeline"] .timeline li{ padding-left: 1rem; position: relative; margin : 2rem 0; } timeline .timeline li::before,[is="timeline"] .timeline li::before{ content: ''; position: absolute; background-color: hsl(171, 100%, 41%); left: calc(-1rem/2.2); top: calc(0.2rem); width: 1rem; height: 1rem; border-radius: 50%; } timeline .timeline ul,[is="timeline"] .timeline ul{ list-style : none; position: relative; display: flex; flex-direction: column; margin: 0; } timeline .timeline ul:before,[is="timeline"] .timeline ul:before{ content: ''; position: absolute; top: 0; left: 0px; width: 0px; height: 100%; border: 1px solid #EDEDED; }`,
  exports: null,
  template: (template, expressionTypes, bindingTypes, getComponent) => template('<div class="timeline"><ul><li expr65="expr65" class="timeline_li"></li></ul></div>', [{
    type: bindingTypes.EACH,
    getKey: null,
    condition: null,
    template: template('<div><p expr66="expr66" class="timeline_date"> </p><span expr67="expr67" class="timeline_percentage"> </span></div>', [{
      redundantAttribute: 'expr66',
      selector: '[expr66]',
      expressions: [{
        type: expressionTypes.TEXT,
        childNodeIndex: 0,
        evaluate: _scope => _scope.date.text
      }]
    }, {
      redundantAttribute: 'expr67',
      selector: '[expr67]',
      expressions: [{
        type: expressionTypes.TEXT,
        childNodeIndex: 0,
        evaluate: _scope => [_scope.date.percentage, '%'].join('')
      }]
    }]),
    redundantAttribute: 'expr65',
    selector: '[expr65]',
    itemName: 'date',
    indexName: null,
    evaluate: _scope => _scope.props.dates
  }]),
  name: 'timeline'
};

var ModalText = {
  css: null,
  exports: null,
  template: (template, expressionTypes, bindingTypes, getComponent) => template('<p expr68="expr68" class="my-2"> </p>', [{
    redundantAttribute: 'expr68',
    selector: '[expr68]',
    expressions: [{
      type: expressionTypes.TEXT,
      childNodeIndex: 0,
      evaluate: _scope => [_scope.props.title, ' ', _scope.props.text ? ":" : null, ' ', _scope.props.text].join('')
    }]
  }]),
  name: 'modal-text'
};

let parisCoordinates = [48.856614, 2.3522219];
var MyMap = {
  css: `my-map #map,[is="my-map"] #map{ position: relative; height: 55vh; z-index: 5; } my-map #icon,[is="my-map"] #icon{ position: absolute; left : 1rem; bottom : 1rem; z-index: 500; background-color : hsla(248, 100%, 100%, 0.49); }`,
  exports: {
    state: {
      map: null,
      markers: [],
      circle: null
    },
    onMounted(props) {
      this.state.map = L.map('map');
      this.state.map.setView(parisCoordinates, 5); //Coordonnées par défaut
      this.resetLayer();
    },
    onBeforeUpdate(props) {
      this.getCoordinates(props.etablissements);
    },
    shouldUpdate(newProps, oldProps) {
      return newProps.gps.radius != oldProps.gps.radius || JSON.stringify(newProps.etablissements) !== JSON.stringify(oldProps.etablissements);
    },
    resetLayer() {
      this.state.map.eachLayer(layer => {
        this.state.map.removeLayer(layer);
      });
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: 1,
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(this.state.map);
    },
    getCoordinates(etablissements) {
      this.resetLayer();
      let markersCluster = new L.MarkerClusterGroup();
      this.state.markers = [];
      for (etablissement of etablissements) {
        let marker = L.marker(etablissement.coordinate);
        marker.on('mouseover', function (e) {
          this.openPopup();
        });
        marker.on('mouseout', function (e) {
          this.closePopup();
        });
        let t = etablissement.index;
        marker.on('click', () => this.props.click(t));
        marker.bindPopup(`<p> ${etablissement.nom}</p>`);
        markersCluster.addLayer(marker);
        this.state.markers.push(marker);
      }
      if (this.props.gps.radius) this.addCircle(this.props.gps.radius, [...this.props.gps.coordinates].reverse(), this.props.gps.address);
      this.state.map.addLayer(markersCluster);
      this.recenter();
    },
    addCircle(rayon, coordinates, name) {
      this.state.circle = L.circle(coordinates, {
        radius: rayon * 1000,
        color: 'red'
      }).addTo(this.state.map);
      let gpsIcon = L.icon({
        iconUrl: 'css/images/marker-icon-gps.png',
        iconSize: [25, 41],
        // size of the icon
        shadowSize: [50, 64],
        // size of the shadow
        iconAnchor: [12, 41],
        // point of the icon which will correspond to marker's location
        shadowAnchor: [12, 41],
        // the same for the shadow
        popupAnchor: [0, -40] // point from which the popup should open relative to the iconAnchor
      });

      let marker = L.marker(coordinates, {
        icon: gpsIcon
      }).bindPopup(name).addTo(this.state.map);
      marker.on('mouseover', function (e) {
        this.openPopup();
      });
      marker.on('mouseout', function (e) {
        this.closePopup();
      });
    },
    recenter() {
      if (this.props.gps.coordinates.length == 2) {
        this.state.map.flyToBounds(this.state.circle.getBounds());
      } else if (this.state.markers.length > 0) this.state.map.flyToBounds(L.featureGroup(this.state.markers).getBounds().pad(0.1));
    }
  },
  template: (template, expressionTypes, bindingTypes, getComponent) => template('<div id="map"><button expr82="expr82" id="icon" class="button is-medium"><span class="icon is-medium"><i class="fa-solid fa-location-dot"></i></span></button></div>', [{
    redundantAttribute: 'expr82',
    selector: '[expr82]',
    expressions: [{
      type: expressionTypes.EVENT,
      name: 'onclick',
      evaluate: _scope => _scope.recenter
    }]
  }]),
  name: 'my-map'
};

var FormulaireAdresse = {
  css: `formulaire-adresse .list,[is="formulaire-adresse"] .list{ background-color : white; position : absolute; top : 100%; left : 0%; right : 0%; z-index : 40; }`,
  exports: {
    components: {
      Modal
    },
    onMounted() {
      this.state.show = false;
      this.state.showList = false;
    },
    openModal() {
      this.state.show = true;
      this.update();
      this.showValue();
    },
    closeModal() {
      this.state.show = false;
      this.update();
    },
    showValue() {
      let pourcentage = this.$("#pourcentage");
      pourcentage.textContent = `${this.$("#slider").value} KM`;
    },
    showList() {
      this.state.showList = true;
      this.update();
    },
    hideList() {
      this.state.showList = false;
      this.update();
    },
    focusOut() {
      if (this.$("li:hover") != null) return;
      this.hideList();
    },
    autocomplete(adresse, postcode) {
      let option = this.$("#code");
      let inputAdresse = this.$("#input-adresse");
      inputAdresse.value = adresse;
      option.value = postcode;
      this.hideList();
    },
    getIcon(type) {
      if (type === "street") return "fa-road";else if (type === "municipality") return "fa-city";else if (type === "housenumber") return "fa-house";
    },
    submitForm(e) {
      e.preventDefault();
      // [0] : adresse, [1] : code postal, [2] : rayon
      this.props.submitForm(e.srcElement[0].value, e.srcElement[1].value, e.srcElement[2].value);
      this.closeModal();
    },
    reset(e) {
      e.preventDefault();
      //Envoie le formulaire vide (réinitialise la carte)
      this.props.submitForm();
      this.closeModal();
    }
  },
  template: (template, expressionTypes, bindingTypes, getComponent) => template('<button expr69="expr69">GPS</button><modal expr70="expr70"></modal>', [{
    redundantAttribute: 'expr69',
    selector: '[expr69]',
    expressions: [{
      type: expressionTypes.ATTRIBUTE,
      name: 'class',
      evaluate: _scope => ['button ', _scope.props.filter.address ? "is-danger" : null].join('')
    }, {
      type: expressionTypes.EVENT,
      name: 'onclick',
      evaluate: _scope => _scope.openModal
    }]
  }, {
    type: bindingTypes.IF,
    evaluate: _scope => _scope.state.show,
    redundantAttribute: 'expr70',
    selector: '[expr70]',
    template: template(null, [{
      type: bindingTypes.TAG,
      getComponent: getComponent,
      evaluate: _scope => 'modal',
      slots: [{
        id: 'content',
        html: '<form expr71="expr71"><div class="field"><label class="label">Adresse</label><div class="control has-icons-left"><input expr72="expr72" id="input-adresse" type="search" class="input" placeholder="Votre adresse" autocomplete="off"/><div expr73="expr73" class="list"></div><span class="icon is-small is-left"><i class="fas fa-search-location"></i></span></div></div><div class="field"><label class="label">Code postal</label><div class="control"><input expr79="expr79" class="input" id="code" disabled/></div></div><div class="field"><label class="label">Rayon de recherche</label><div class="control is-flex is-align-items-center"><span class="icon icon is-large"><i class="far fa-2x fa-dot-circle"></i></span><input expr80="expr80" id="slider" class="slider" type="range" min="20" max="50" step="10"/><span id="pourcentage" class="tag"></span></div></div><div class="field is-grouped is-grouped-centered"><div class="control"><button class="button is-size-6 is-primary" type="submit"><span class="icon"><i class="fas fa-search"></i></span><span>Rechercher</span></button></div><div class="control"><button expr81="expr81" class="button is-size-6 is-danger"><span class="icon"><i class="fas fa-sync"></i></span><span>Réinitialiser</span></button></div></div></form>',
        bindings: [{
          redundantAttribute: 'expr71',
          selector: '[expr71]',
          expressions: [{
            type: expressionTypes.EVENT,
            name: 'onsubmit',
            evaluate: _scope => _scope.submitForm
          }]
        }, {
          redundantAttribute: 'expr72',
          selector: '[expr72]',
          expressions: [{
            type: expressionTypes.EVENT,
            name: 'oninput',
            evaluate: _scope => _scope.props.findAddress
          }, {
            type: expressionTypes.EVENT,
            name: 'onfocus',
            evaluate: _scope => _scope.showList
          }, {
            type: expressionTypes.EVENT,
            name: 'onfocusout',
            evaluate: _scope => _scope.focusOut
          }, {
            type: expressionTypes.VALUE,
            evaluate: _scope => _scope.props.filter.address ? _scope.props.filter.address : null
          }]
        }, {
          type: bindingTypes.IF,
          evaluate: _scope => _scope.state.showList,
          redundantAttribute: 'expr73',
          selector: '[expr73]',
          template: template('<ul class="menu-list"><li expr74="expr74"></li></ul>', [{
            type: bindingTypes.EACH,
            getKey: null,
            condition: null,
            template: template('<a expr75="expr75"><span expr76="expr76" class="is-align-content-center"><i expr77="expr77"></i> </span><span expr78="expr78" class="is-pulled-right"> </span></a>', [{
              redundantAttribute: 'expr75',
              selector: '[expr75]',
              expressions: [{
                type: expressionTypes.EVENT,
                name: 'onclick',
                evaluate: _scope => () => {
                  _scope.autocomplete(_scope.element.properties.label, _scope.element.properties.postcode);
                }
              }]
            }, {
              redundantAttribute: 'expr76',
              selector: '[expr76]',
              expressions: [{
                type: expressionTypes.TEXT,
                childNodeIndex: 1,
                evaluate: _scope => [_scope.element.properties.name].join('')
              }]
            }, {
              redundantAttribute: 'expr77',
              selector: '[expr77]',
              expressions: [{
                type: expressionTypes.ATTRIBUTE,
                name: 'class',
                evaluate: _scope => ['fas ', _scope.getIcon(_scope.element.properties.type)].join('')
              }]
            }, {
              redundantAttribute: 'expr78',
              selector: '[expr78]',
              expressions: [{
                type: expressionTypes.TEXT,
                childNodeIndex: 0,
                evaluate: _scope => _scope.element.properties.postcode
              }]
            }]),
            redundantAttribute: 'expr74',
            selector: '[expr74]',
            itemName: 'element',
            indexName: 'index',
            evaluate: _scope => _scope.props.options
          }])
        }, {
          redundantAttribute: 'expr79',
          selector: '[expr79]',
          expressions: [{
            type: expressionTypes.VALUE,
            evaluate: _scope => _scope.props.filter.postcode ? _scope.props.filter.postcode : "Code postal"
          }]
        }, {
          redundantAttribute: 'expr80',
          selector: '[expr80]',
          expressions: [{
            type: expressionTypes.VALUE,
            evaluate: _scope => _scope.props.filter.radius ? _scope.props.filter.radius : 40
          }, {
            type: expressionTypes.EVENT,
            name: 'oninput',
            evaluate: _scope => _scope.showValue
          }]
        }, {
          redundantAttribute: 'expr81',
          selector: '[expr81]',
          expressions: [{
            type: expressionTypes.EVENT,
            name: 'onclick',
            evaluate: _scope => _scope.reset
          }]
        }]
      }],
      attributes: [{
        type: expressionTypes.ATTRIBUTE,
        name: 'close',
        evaluate: _scope => _scope.closeModal
      }]
    }])
  }]),
  name: 'formulaire-adresse'
};

const chars = {
  ' ': '+',
  '+': '%2B',
  ',': '%2C',
  '&': '%26'
};
function getEncodedName(name) {
  return name.replace(/[ +,&]/g, m => chars[m]);
}
async function fetchFiliere() {
  //Clé pour le cache
  const cacheKey = 'filiereCache';
  const cacheValue = localStorage.getItem(cacheKey);
  let data = null;
  if (cacheValue) {
    data = JSON.parse(cacheValue);
  } else {
    let URL = `https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?dataset=fr-esr-parcoursup&q=&rows=0&facet=fili`;
    let response = await fetch(URL);
    data = await response.json();
    //Mise en cache
    if (response.status == 200) localStorage.setItem(cacheKey, JSON.stringify(data));
  }
  return data.facet_groups[0].facets;
}
async function fetchAllFormations() {
  //Clé pour le cache
  const cacheKey = 'allFormations';
  const cacheValue = localStorage.getItem(cacheKey);
  let data = null;
  if (cacheValue) {
    data = JSON.parse(cacheValue);
  } else {
    let URL = `https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?dataset=fr-esr-parcoursup&q=&rows=0&facet=fil_lib_voe_acc`;
    let response = await fetch(URL);
    data = await response.json();
    //Mise en cache
    if (response.status == 200) localStorage.setItem(cacheKey, JSON.stringify(data));
  }
  return data.facet_groups[0].facets;
}
async function fetchFiliereDetail(filiere) {
  const cacheKey = 'filiereDetailCache';
  const cacheValue = localStorage.getItem(cacheKey);
  filiere = getEncodedName(filiere);
  let data = null;
  if (cacheValue) {
    let cache = JSON.parse(cacheValue);
    if (cache.key === filiere) data = cache.data;
  }
  if (!data) {
    let URL = `https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?dataset=fr-esr-parcoursup&q=&rows=0&facet=form_lib_voe_acc&refine.fili=${filiere}`;
    let response = await fetch(URL);
    data = await response.json();
    //Mise en cache
    if (response.status == 200) localStorage.setItem(cacheKey, JSON.stringify({
      key: filiere,
      'data': data
    }));
  }
  return data.facet_groups[0].facets;
}
async function fetchFiliereTDetail(filiere, filiere_detail) {
  const cacheKey = 'filiereTresDetailCache';
  const cacheValue = localStorage.getItem(cacheKey);
  let data = null;
  filiere = getEncodedName(filiere);
  filiere_detail = getEncodedName(filiere_detail);
  if (cacheValue) {
    let cache = JSON.parse(cacheValue);
    if (cache.key === `${filiere}_${filiere_detail}`) data = cache.data;
  }
  if (!data) {
    let URL = `https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?dataset=fr-esr-parcoursup&q=&rows=0&facet=fil_lib_voe_acc&refine.fili=${filiere}&refine.form_lib_voe_acc=${filiere_detail}`;
    let response = await fetch(URL);
    data = await response.json();
    //Mise en cache
    if (response.status == 200) localStorage.setItem(cacheKey, JSON.stringify({
      key: `${filiere}_${filiere_detail}`,
      'data': data
    }));
  }
  return data.facet_groups[0].facets;
}
async function fetchInfosFormation(filiere, filiere_detail, filiere_t_detail, count) {
  filiere = getEncodedName(filiere);
  filiere_detail = getEncodedName(filiere_detail);
  filiere_t_detail = getEncodedName(filiere_t_detail);
  const facets = "facet=pct_sansmention&facet=pct_ab&facet=pct_b&facet=pct_tb&facet=pct_tbf&facet=capa_fin&facet=taux_acces_ens&facet=pct_f&facet=pct_bg&facet=pct_bt&facet=pct_bp";
  const refine = `refine.fili=${filiere}&refine.form_lib_voe_acc=${filiere_detail}&refine.fil_lib_voe_acc=${filiere_t_detail}`;
  const URL = `https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?dataset=fr-esr-parcoursup&q=&rows=${count}&${facets}&${refine}`;
  let response = await fetch(URL);
  data = await response.json();
  return data;
}

/**
 * (voir https://adresse.data.gouv.fr/api-doc/adresse)
 * Cherche des adresses proches de celle donnée en argument
 * @param {String} address l'adresse approximative
 * @returns un tableau d'adresse ordonné par pertinence du résultat
 */
async function fetchAddress(address) {
  let response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${address}&limit=3`);
  let data = await response.json();
  return data;
}

/**
 * (voir https://adresse.data.gouv.fr/api-doc/adresse)
 * Cherche une seule adresse 
 * @param {String} address l'adresse
 * @param {Integer} postcode le code postal
 * @returns les informations sur l'adresse
 */
async function findAddress(address, postcode) {
  if (!address) return -1;
  let response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${address}&postcode=${postcode}&autocomplete=0&limit=1`);
  let data = await response.json();
  return data;
}

var BoxTable = {
  css: null,
  exports: {
    components: {
      MyTable,
      Modal,
      Timeline,
      ProgressBar,
      ModalText,
      BarChart,
      FormulaireAdresse,
      MyMap
    },
    state: {
      sortedBy: {
        "nom": 0,
        "ville": 0,
        "dpt": 0,
        "moyenne": 0,
        "selectivité": 0
      },
      tag: [],
      modal: [],
      dataForTable: [],
      clicked: false,
      filter: "",
      filterPosition: {
        address: null,
        postcode: null,
        coordinates: [],
        radius: null
      },
      dataForMap: []
    },
    onBeforeUpdate(props, state) {
      state.dataForTable = this.filterForTable(props.data);
    },
    onMounted() {
      this.debounceFunction = debounce(this.filter, 500);
      this.findAddress = debounce(async e => {
        let input = this.$("#input-adresse");
        if (input.value.length < 3) {
          if (this.options?.length != 0) this.showAddressOptions([]);
          return;
        }
        this.showAddressOptions(await fetchAddress(input.value));
      }, 300);
      this.state.dataForTable = this.filterForTable(this.props.data);
    },
    shouldUpdate(nextProps, prevProps) {
      if (nextProps.titre != prevProps.titre) {
        this.state.filter = "";
        this.$('#myInput').value = "";
      }
      return true;
    },
    filterForTable(data) {
      if (Object.keys(data).length == 0) return;
      let dataFields = data.map((obj, index) => ({
        ...obj.fields,
        "index": index
      }));
      dataFields = dataFields.filter(data => data.g_ea_lib_vx.toUpperCase().includes(this.state.filter.toUpperCase()));
      if (this.state.filterPosition.coordinates.length == 2) {
        dataFields = filterCoordinates(dataFields, this.state.filterPosition.coordinates, this.state.filterPosition.radius);
      }
      let coordinateData = dataFields.map(obj => ({
        "coordinate": obj.g_olocalisation_des_formations,
        "nom": obj.g_ea_lib_vx,
        "index": obj.index
      }));
      this.state.dataForMap = coordinateData;
      let filtered = dataFields.map(obj => ({
        data: {
          nom: obj.g_ea_lib_vx,
          ville: obj.ville_etab,
          dpt: parseInt(obj.dep),
          moyenne: moyenne(obj) || -1
        },
        select: obj.taux_acces_ens || -1,
        key: obj.index
      }));
      for (key in this.state.sortedBy) {
        if (this.state.sortedBy[key] == 0) continue;
        filtered.sort((a, b) => this.sortByKey(a, b, key));
      }
      return filtered;
    },
    sortByKey(a, b, key) {
      console.log(a);
      if (key == "selectivité") {
        return (a.select - b.select) * this.state.sortedBy[key];
      }
      if (typeof a.data[key] === "string") {
        if (a.data[key].toUpperCase() < b.data[key].toUpperCase()) return -1 * this.state.sortedBy[key];else if (a.data[key].toUpperCase() > b.data[key].toUpperCase()) return 1 * this.state.sortedBy[key];else return 0;
      }
      return (a.data[key] - b.data[key]) * this.state.sortedBy[key];
    },
    resetAddressFilter() {
      this.state.filterPosition.address = null;
      this.state.filterPosition.postcode = null;
      this.state.filterPosition.radius = null;
      this.state.filterPosition.coordinates = [];
      this.update();
    },
    async confirmAddress(address = "", postcode = 0, radius = 0) {
      this.state.addressOptions = [];
      if (!address || address.length < 2) {
        this.resetAddressFilter(); //Reset
        return;
      }
      let data = await findAddress(address, postcode);
      if (data == -1 || data.features.length < 1) {
        this.resetAddressFilter(); //Reset
        return;
      }
      this.state.filterPosition.address = data.features[0].properties.name;
      this.state.filterPosition.postcode = data.features[0].properties.postcode;
      this.state.filterPosition.coordinates = data.features[0].geometry.coordinates;
      this.state.filterPosition.radius = radius;
      this.update();
    },
    filter(e) {
      this.state.filter = this.$('#myInput').value;
      this.update();
    },
    showAddressOptions(options) {
      this.state.addressOptions = options.features;
      this.update();
    },
    addTag(key) {
      if (this.state.sortedBy[key] == 0) {
        this.state.sortedBy[key] = 1;
        this.state.tag = [...this.state.tag, key];
      } else this.state.sortedBy[key] *= -1;
      this.update();
    },
    deleteTag(key) {
      let index = this.state.tag.indexOf(key);
      this.state.tag = [...this.state.tag];
      this.state.tag.splice(index, 1);
      this.state.sortedBy[key] = 0;
      this.update();
    },
    clicked(index) {
      this.update({
        clicked: true,
        modal: filterForModal(this.props.data[index].fields)
      });
    },
    close() {
      this.update({
        clicked: false
      });
    }
  },
  template: (template, expressionTypes, bindingTypes, getComponent) => template('<div class="box"><my-map expr14="expr14"></my-map><div class="field is-flex is-justify-content-space-between mt-5"><formulaire-adresse expr15="expr15"></formulaire-adresse><div class="control has-icons-left"><input expr16="expr16" class="input" type="search" placeholder="établissement" id="myInput"/><span class="icon is-small is-left"><i class="fas fa-search"></i></span></div></div><div expr17="expr17" class="scrollable"><my-table expr18="expr18"></my-table></div><modal expr19="expr19"></modal></div>', [{
    type: bindingTypes.TAG,
    getComponent: getComponent,
    evaluate: _scope => 'my-map',
    slots: [],
    attributes: [{
      type: expressionTypes.ATTRIBUTE,
      name: 'etablissements',
      evaluate: _scope => _scope.state.dataForMap
    }, {
      type: expressionTypes.ATTRIBUTE,
      name: 'gps',
      evaluate: _scope => ({
        ..._scope.state.filterPosition
      })
    }, {
      type: expressionTypes.ATTRIBUTE,
      name: 'click',
      evaluate: _scope => _scope.clicked
    }],
    redundantAttribute: 'expr14',
    selector: '[expr14]'
  }, {
    type: bindingTypes.TAG,
    getComponent: getComponent,
    evaluate: _scope => 'formulaire-adresse',
    slots: [],
    attributes: [{
      type: expressionTypes.ATTRIBUTE,
      name: 'filter',
      evaluate: _scope => _scope.state.filterPosition
    }, {
      type: expressionTypes.ATTRIBUTE,
      name: 'findAddress',
      evaluate: _scope => _scope.findAddress
    }, {
      type: expressionTypes.ATTRIBUTE,
      name: 'options',
      evaluate: _scope => _scope.state.addressOptions
    }, {
      type: expressionTypes.ATTRIBUTE,
      name: 'submitForm',
      evaluate: _scope => _scope.confirmAddress
    }],
    redundantAttribute: 'expr15',
    selector: '[expr15]'
  }, {
    redundantAttribute: 'expr16',
    selector: '[expr16]',
    expressions: [{
      type: expressionTypes.EVENT,
      name: 'oninput',
      evaluate: _scope => _scope.debounceFunction
    }]
  }, {
    redundantAttribute: 'expr17',
    selector: '[expr17]',
    expressions: [{
      type: expressionTypes.ATTRIBUTE,
      name: 'style',
      evaluate: _scope => "overflow-x: auto"
    }]
  }, {
    type: bindingTypes.TAG,
    getComponent: getComponent,
    evaluate: _scope => 'my-table',
    slots: [],
    attributes: [{
      type: expressionTypes.ATTRIBUTE,
      name: 'header',
      evaluate: _scope => Object.keys(_scope.state.sortedBy)
    }, {
      type: expressionTypes.ATTRIBUTE,
      name: 'data',
      evaluate: _scope => _scope.state.dataForTable
    }, {
      type: expressionTypes.ATTRIBUTE,
      name: 'change',
      evaluate: _scope => _scope.clicked
    }, {
      type: expressionTypes.ATTRIBUTE,
      name: 'click',
      evaluate: _scope => _scope.addTag
    }, {
      type: expressionTypes.ATTRIBUTE,
      name: 'tag',
      evaluate: _scope => _scope.state.tag
    }, {
      type: expressionTypes.ATTRIBUTE,
      name: 'delete',
      evaluate: _scope => _scope.deleteTag
    }],
    redundantAttribute: 'expr18',
    selector: '[expr18]'
  }, {
    type: bindingTypes.IF,
    evaluate: _scope => _scope.state.clicked,
    redundantAttribute: 'expr19',
    selector: '[expr19]',
    template: template(null, [{
      type: bindingTypes.TAG,
      getComponent: getComponent,
      evaluate: _scope => 'modal',
      slots: [{
        id: 'content',
        html: '<div class="columns is-mobile"><div class="column is-two-thirds content mb-0"><p expr20="expr20" class="has-text-weight-bold"> <span expr21="expr21"> </span></p><div expr22="expr22"></div><modal-text expr24="expr24"></modal-text><ul><li expr25="expr25"></li></ul><p>Lien de la formation sur <a expr26="expr26" target="_blank">parcoursup</a></p></div><div class="column"><p class="has-text-weight-bold"> Vitesse de remplissage</p><timeline expr27="expr27"></timeline></div></div>',
        bindings: [{
          redundantAttribute: 'expr20',
          selector: '[expr20]',
          expressions: [{
            type: expressionTypes.TEXT,
            childNodeIndex: 0,
            evaluate: _scope => [_scope.state.modal.title].join('')
          }]
        }, {
          redundantAttribute: 'expr21',
          selector: '[expr21]',
          expressions: [{
            type: expressionTypes.TEXT,
            childNodeIndex: 0,
            evaluate: _scope => _scope.state.modal.selectivite
          }, {
            type: expressionTypes.ATTRIBUTE,
            name: 'class',
            evaluate: _scope => ['tag ', _scope.state.modal.selectivite.includes("non") ? "is-primary" : "is-danger"].join('')
          }]
        }, {
          type: bindingTypes.EACH,
          getKey: null,
          condition: null,
          template: template('<modal-text expr23="expr23"></modal-text>', [{
            type: bindingTypes.TAG,
            getComponent: getComponent,
            evaluate: _scope => 'modal-text',
            slots: [],
            attributes: [{
              type: expressionTypes.ATTRIBUTE,
              name: 'title',
              evaluate: _scope => _scope.element.title
            }, {
              type: expressionTypes.ATTRIBUTE,
              name: 'text',
              evaluate: _scope => _scope.element.text
            }],
            redundantAttribute: 'expr23',
            selector: '[expr23]'
          }]),
          redundantAttribute: 'expr22',
          selector: '[expr22]',
          itemName: 'element',
          indexName: null,
          evaluate: _scope => _scope.state.modal.text
        }, {
          type: bindingTypes.TAG,
          getComponent: getComponent,
          evaluate: _scope => 'modal-text',
          slots: [],
          attributes: [{
            type: expressionTypes.ATTRIBUTE,
            name: 'title',
            evaluate: _scope => _scope.state.modal.list.title
          }],
          redundantAttribute: 'expr24',
          selector: '[expr24]'
        }, {
          type: bindingTypes.EACH,
          getKey: null,
          condition: null,
          template: template(' ', [{
            expressions: [{
              type: expressionTypes.TEXT,
              childNodeIndex: 0,
              evaluate: _scope => [_scope.element.title, ' : ', _scope.element.text].join('')
            }]
          }]),
          redundantAttribute: 'expr25',
          selector: '[expr25]',
          itemName: 'element',
          indexName: null,
          evaluate: _scope => _scope.state.modal.list.data
        }, {
          redundantAttribute: 'expr26',
          selector: '[expr26]',
          expressions: [{
            type: expressionTypes.ATTRIBUTE,
            name: 'href',
            evaluate: _scope => _scope.state.modal.url
          }]
        }, {
          type: bindingTypes.TAG,
          getComponent: getComponent,
          evaluate: _scope => 'timeline',
          slots: [],
          attributes: [{
            type: expressionTypes.ATTRIBUTE,
            name: 'dates',
            evaluate: _scope => _scope.state.modal.dates
          }],
          redundantAttribute: 'expr27',
          selector: '[expr27]'
        }]
      }, {
        id: 'footer',
        html: '<bar-chart expr28="expr28"></bar-chart><bar-chart expr29="expr29"></bar-chart><bar-chart expr30="expr30"></bar-chart>',
        bindings: [{
          type: bindingTypes.TAG,
          getComponent: getComponent,
          evaluate: _scope => 'bar-chart',
          slots: [],
          attributes: [{
            type: expressionTypes.ATTRIBUTE,
            name: 'elements',
            evaluate: _scope => _scope.state.modal.genre.elements
          }, {
            type: expressionTypes.ATTRIBUTE,
            name: 'label',
            evaluate: _scope => _scope.state.modal.genre.label
          }],
          redundantAttribute: 'expr28',
          selector: '[expr28]'
        }, {
          type: bindingTypes.TAG,
          getComponent: getComponent,
          evaluate: _scope => 'bar-chart',
          slots: [],
          attributes: [{
            type: expressionTypes.ATTRIBUTE,
            name: 'elements',
            evaluate: _scope => _scope.state.modal.bac.elements
          }, {
            type: expressionTypes.ATTRIBUTE,
            name: 'label',
            evaluate: _scope => _scope.state.modal.bac.label
          }],
          redundantAttribute: 'expr29',
          selector: '[expr29]'
        }, {
          type: bindingTypes.TAG,
          getComponent: getComponent,
          evaluate: _scope => 'bar-chart',
          slots: [],
          attributes: [{
            type: expressionTypes.ATTRIBUTE,
            name: 'elements',
            evaluate: _scope => _scope.state.modal.mention.elements
          }, {
            type: expressionTypes.ATTRIBUTE,
            name: 'label',
            evaluate: _scope => _scope.state.modal.mention.label
          }],
          redundantAttribute: 'expr30',
          selector: '[expr30]'
        }]
      }],
      attributes: [{
        type: expressionTypes.ATTRIBUTE,
        name: 'close',
        evaluate: _scope => _scope.close
      }]
    }])
  }]),
  name: 'box-table'
};

var MyList = {
  css: null,
  exports: {
    onBeforeMount(props, state) {
      // initial state
      this.state = {
        index: null
      };
      this.onClick = props.onChange;
    },
    onUpdated(props) {
      if (!props.end) {
        anime({
          targets: this.$$('a'),
          translateX: [-200, 0],
          opacity: [0, 1],
          delay: anime.stagger(50),
          duration: 1000
        });
      }
    },
    change(event, index) {
      this.state.index = index;
      this.onClick(index); // onClick va update (async)
    }
  },

  template: (template, expressionTypes, bindingTypes, getComponent) => template('<div class="box m-3 scrollable"><div class="columns is-mobile is-vcentered"><div class="column p-1"><p expr41="expr41" class="menu-label is-unselectable"> </p></div><div class="column p-1"><span expr42="expr42" class="button mr-2 is-pulled-right is-unselectable"></span></div></div><ul class="menu-list"><li expr43="expr43" class="columns is-vcentered"></li></ul></div>', [{
    redundantAttribute: 'expr41',
    selector: '[expr41]',
    expressions: [{
      type: expressionTypes.TEXT,
      childNodeIndex: 0,
      evaluate: _scope => _scope.props.label
    }]
  }, {
    type: bindingTypes.IF,
    evaluate: _scope => !_scope.props.start,
    redundantAttribute: 'expr42',
    selector: '[expr42]',
    template: template('<i class="fas fa-angle-left is-size-4"></i>', [{
      expressions: [{
        type: expressionTypes.EVENT,
        name: 'onclick',
        evaluate: _scope => _scope.props.onBack
      }]
    }])
  }, {
    type: bindingTypes.EACH,
    getKey: null,
    condition: null,
    template: template('<a expr44="expr44"> <span expr45="expr45" class="tag has-background-primary is-pulled-right has-text-white"> <span></span></span></a>', [{
      redundantAttribute: 'expr44',
      selector: '[expr44]',
      expressions: [{
        type: expressionTypes.TEXT,
        childNodeIndex: 0,
        evaluate: _scope => [_scope.formation.name].join('')
      }, {
        type: expressionTypes.EVENT,
        name: 'onclick',
        evaluate: _scope => event => {
          _scope.change(event, _scope.formation.index);
        }
      }, {
        type: expressionTypes.ATTRIBUTE,
        name: 'class',
        evaluate: _scope => ['column is-unselectable ', _scope.props.end && _scope.formation.index === _scope.state.index ? "is-active" : null].join('')
      }]
    }, {
      redundantAttribute: 'expr45',
      selector: '[expr45]',
      expressions: [{
        type: expressionTypes.TEXT,
        childNodeIndex: 0,
        evaluate: _scope => _scope.formation.count
      }]
    }]),
    redundantAttribute: 'expr43',
    selector: '[expr43]',
    itemName: 'formation',
    indexName: 'index',
    evaluate: _scope => _scope.props.formations
  }]),
  name: 'my-list'
};

var SearchList = {
  css: null,
  exports: {
    components: {
      MyList
    },
    state: {
      filter: '',
      formations: []
    },
    onMounted(props, state) {
      this.debounceFunction = debounce(this.filter, 200);
    },
    onBeforeUpdate(props, state) {
      state.formations = this.filterList(props.formations);
    },
    filter(e) {
      this.state.filter = this.$('#input').value;
      this.state.change = true;
      this.update();
    },
    filterList(data) {
      if (Object.keys(data).length == 0) return [];
      return data.filter(data => data.name.toUpperCase().includes(this.state.filter.toUpperCase()));
    },
    shouldUpdate(newProps, oldProps) {
      if (newProps.end || this.state.change) {
        this.state.change = false;
        return true;
      }
      //Marche uniquement pour notre utilisation, il faut changer pour une liste dont le titre ne change pas
      return newProps.label !== oldProps.label && (oldProps.formations.length !== newProps.formations.length || JSON.stringify(newProps.formations) !== JSON.stringify(oldProps.formations));
    },
    onChange(index) {
      this.props.onChange(index);
      if (!this.props.end) this.clear();
    },
    onBack() {
      this.clear();
      this.props.onBack();
    },
    clear() {
      this.state.filter = '';
      this.$('#input').value = '';
    }
  },
  template: (template, expressionTypes, bindingTypes, getComponent) => template('<div class="control has-icons-left"><input expr9="expr9" class="input" type="search" placeholder="Formation" id="input"/><span class="icon is-small is-left"><i class="fas fa-search"></i></span></div><my-list expr10="expr10"></my-list>', [{
    redundantAttribute: 'expr9',
    selector: '[expr9]',
    expressions: [{
      type: expressionTypes.EVENT,
      name: 'oninput',
      evaluate: _scope => _scope.debounceFunction
    }]
  }, {
    type: bindingTypes.TAG,
    getComponent: getComponent,
    evaluate: _scope => 'my-list',
    slots: [],
    attributes: [{
      type: expressionTypes.ATTRIBUTE,
      name: 'label',
      evaluate: _scope => _scope.props.label
    }, {
      type: expressionTypes.ATTRIBUTE,
      name: 'formations',
      evaluate: _scope => _scope.state.formations
    }, {
      type: expressionTypes.EVENT,
      name: 'onChange',
      evaluate: _scope => _scope.onChange
    }, {
      type: expressionTypes.EVENT,
      name: 'onBack',
      evaluate: _scope => _scope.onBack
    }, {
      type: expressionTypes.ATTRIBUTE,
      name: 'end',
      evaluate: _scope => _scope.props.end
    }, {
      type: expressionTypes.ATTRIBUTE,
      name: 'start',
      evaluate: _scope => _scope.props.start
    }],
    redundantAttribute: 'expr10',
    selector: '[expr10]'
  }]),
  name: 'search-list'
};

var Breadcrumb = {
  css: null,
  exports: null,
  template: (template, expressionTypes, bindingTypes, getComponent) => template('<nav expr31="expr31" aria-label="breadcrumbs"><ul><li expr32="expr32"></li></ul></nav>', [{
    redundantAttribute: 'expr31',
    selector: '[expr31]',
    expressions: [{
      type: expressionTypes.ATTRIBUTE,
      name: 'class',
      evaluate: _scope => [_scope.props.classes, ' breadcrumb has-arrow-separator is-centered'].join('')
    }]
  }, {
    type: bindingTypes.EACH,
    getKey: null,
    condition: _scope => _scope.name,
    template: template('<a expr33="expr33"> </a>', [{
      expressions: [{
        type: expressionTypes.ATTRIBUTE,
        name: 'class',
        evaluate: _scope => _scope.index === _scope.props.list.length - 1 ? "is-active" : null
      }]
    }, {
      redundantAttribute: 'expr33',
      selector: '[expr33]',
      expressions: [{
        type: expressionTypes.TEXT,
        childNodeIndex: 0,
        evaluate: _scope => _scope.name
      }]
    }]),
    redundantAttribute: 'expr32',
    selector: '[expr32]',
    itemName: 'name',
    indexName: 'index',
    evaluate: _scope => _scope.props.list
  }]),
  name: 'breadcrumb'
};

var Loader = {
  css: `loader div.is-loading,[is="loader"] div.is-loading{ position: fixed; z-index: 999; overflow: show; margin: auto; top: 0; left: 0; bottom: 0; right: 0; } loader div.is-loading:after,[is="loader"] div.is-loading:after{ animation: spinAround 500ms infinite linear; border: 2px solid hsl(0, 0%, 0%); border-radius: 9999px; border-right-color: transparent; border-top-color: transparent; content: ""; display: block; position: relative; top: calc(50% - 5em); left: calc(50% - 5em); width: 10em; height: 10em; border-width: 0.25em; }`,
  exports: null,
  template: (template, expressionTypes, bindingTypes, getComponent) => template('<div class="is-loading p-0 m-0"></div>', []),
  name: 'loader'
};

var MySwitch = {
  css: `my-switch input[type=checkbox],[is="my-switch"] input[type=checkbox]{ height: 0; width: 0; visibility: hidden; } my-switch label,[is="my-switch"] label{ cursor: pointer; width: 4.5rem; height: 2.25rem; background: black; display: block; border-radius: 34px; position: relative; padding: 5%; outline-style: solid; outline-color: grey; } my-switch label:after,[is="my-switch"] label:after{ content: ''; position: absolute; left: 5%; width: 2rem; height: 2rem; background: #fff; border-radius: 50%; transition: 0.5s; } my-switch label:has(input:checked),[is="my-switch"] label:has(input:checked){ background: white; } my-switch label:has(input:checked):first-of-type:after,[is="my-switch"] label:has(input:checked):first-of-type:after{ background : black; left: calc(100% - 5%); transform: translateX(-100%); } my-switch label:active:after,[is="my-switch"] label:active:after{ width: 50%; }`,
  exports: null,
  template: (template, expressionTypes, bindingTypes, getComponent) => template('<label><input expr8="expr8" type="checkbox" id="switch"/></label>', [{
    redundantAttribute: 'expr8',
    selector: '[expr8]',
    expressions: [{
      type: expressionTypes.EVENT,
      name: 'onclick',
      evaluate: _scope => _scope.props.onClick
    }]
  }]),
  name: 'my-switch'
};

var App = {
  css: `my-app .fixed,[is="my-app"] .fixed{ height: 2rem; width: 2rem; position: fixed; bottom: 2.5rem; right: 4rem; z-index: 900; }`,
  exports: {
    components: {
      FormationRecap,
      Modal,
      BoxTable,
      SearchList,
      Loader,
      Breadcrumb,
      MyHeader,
      MySwitch
    },
    state: {
      loading: false,
      list: {
        label: "",
        formations: [],
        // allFormations:[],
        stack: [],
        forma_detail: ""
      },
      table_data: {},
      table_title: "",
      recap_data: {},
      recap: ""
    },
    onChange(index) {
      let name = this.state.list.formations[index].path;
      let count = this.state.list.formations[index].count;
      if (this.state.list.stack.length === 0) {
        this.state.list.stack.push(name);
        this.getFiliereDetail(name);
      } else if (this.state.list.stack.length === 1) {
        this.state.list.stack.push(name);
        this.getFiliereTDetail(this.state.list.stack[0], name);
      } else {
        if (this.state.recap == name) return;
        this.getInfosForma(this.state.list.stack[0], this.state.list.stack[1], name, count);
      }
      this.changeLabel();
    },
    onBack() {
      if (this.state.list.stack.length === 0) return;
      let name = this.state.list.stack.pop();
      if (this.state.list.stack.length === 0) this.getFiliere();else if (this.state.list.stack.length === 1) {
        this.state.recap = ""; // Sera mis à jour après l'update label
        this.getFiliereDetail(this.state.list.stack[0], name);
      }
      this.changeLabel();
    },
    onMounted(props, state) {
      this.getFiliere();
      this.getAllFormations();
      this.changeLabel();
    },
    changeLabel() {
      switch (this.state.list.stack.length) {
        case 0:
          this.state.list.label = "Formation";
          break;
        case 1:
          this.state.list.label = "Formation détaillée";
          break;
        default:
          this.state.list.label = "Formation très détaillée";
          break;
      }
      this.update();
    },
    async getFiliere() {
      this.update({
        loading: true
      });
      let data = await fetchFiliere();
      this.state.list.formations = data;
      this.update({
        loading: false
      });
    },
    async getAllFormations() {
      this.update({
        loading: true
      });
      let data = await fetchAllFormations();
      this.state.list.allFormations = data;
      this.update({
        loading: false
      });
    },
    async getFiliereDetail(filiere) {
      this.update({
        loading: true
      });
      let data = await fetchFiliereDetail(filiere);
      this.state.list.formations = data;
      this.update({
        loading: false
      });
    },
    async getFiliereTDetail(filiere, filiere_detail) {
      this.update({
        loading: true
      });
      let data = await fetchFiliereTDetail(filiere, filiere_detail);
      this.state.list.formations = data;
      this.update({
        loading: false
      });
    },
    async getInfosForma(filiere, filiere_detail, filiere_t_detail, count) {
      this.update({
        loading: true
      });
      this.state.recap = filiere_t_detail;
      let data = await fetchInfosFormation(filiere, filiere_detail, filiere_t_detail, count);
      let count_etablissement = data.nhits;
      let facet_group = data.facet_groups;
      let newRecap = formationSummary(facet_group, count_etablissement);
      this.update({
        recap_data: newRecap,
        table_data: data.records
      });
      this.update({
        loading: false
      });
    },
    filterIndex(data) {
      return data.map((obj, index) => ({
        ...obj,
        "index": index
      }));
    },
    toggleMode() {
      toggleLight();
    }
  },
  template: (template, expressionTypes, bindingTypes, getComponent) => template('<my-header expr0="expr0"></my-header><loader expr1="expr1"></loader><breadcrumb expr2="expr2"></breadcrumb><div class="columns"><div class="column is-4 m-5 "><search-list expr3="expr3"></search-list></div><div expr4="expr4" class="column m-5"></div></div><div class="fixed"><my-switch expr7="expr7"></my-switch></div>', [{
    type: bindingTypes.TAG,
    getComponent: getComponent,
    evaluate: _scope => 'my-header',
    slots: [],
    attributes: [],
    redundantAttribute: 'expr0',
    selector: '[expr0]'
  }, {
    type: bindingTypes.IF,
    evaluate: _scope => _scope.state.loading,
    redundantAttribute: 'expr1',
    selector: '[expr1]',
    template: template(null, [{
      type: bindingTypes.TAG,
      getComponent: getComponent,
      evaluate: _scope => 'loader',
      slots: [],
      attributes: []
    }])
  }, {
    type: bindingTypes.TAG,
    getComponent: getComponent,
    evaluate: _scope => 'breadcrumb',
    slots: [],
    attributes: [{
      type: expressionTypes.ATTRIBUTE,
      name: 'classes',
      evaluate: _scope => "my-5"
    }, {
      type: expressionTypes.ATTRIBUTE,
      name: 'list',
      evaluate: _scope => [..._scope.state.list.stack, _scope.state.recap]
    }],
    redundantAttribute: 'expr2',
    selector: '[expr2]'
  }, {
    type: bindingTypes.TAG,
    getComponent: getComponent,
    evaluate: _scope => 'search-list',
    slots: [],
    attributes: [{
      type: expressionTypes.ATTRIBUTE,
      name: 'label',
      evaluate: _scope => _scope.state.list.label
    }, {
      type: expressionTypes.ATTRIBUTE,
      name: 'formations',
      evaluate: _scope => _scope.filterIndex(_scope.state.list.formations)
    }, {
      type: expressionTypes.EVENT,
      name: 'onChange',
      evaluate: _scope => _scope.onChange
    }, {
      type: expressionTypes.EVENT,
      name: 'onBack',
      evaluate: _scope => _scope.onBack
    }, {
      type: expressionTypes.ATTRIBUTE,
      name: 'end',
      evaluate: _scope => _scope.state.recap != ""
    }, {
      type: expressionTypes.ATTRIBUTE,
      name: 'start',
      evaluate: _scope => _scope.state.list.stack.length === 0
    }],
    redundantAttribute: 'expr3',
    selector: '[expr3]'
  }, {
    type: bindingTypes.IF,
    evaluate: _scope => _scope.state.recap,
    redundantAttribute: 'expr4',
    selector: '[expr4]',
    template: template('<formation-recap expr5="expr5"></formation-recap><box-table expr6="expr6"></box-table>', [{
      type: bindingTypes.TAG,
      getComponent: getComponent,
      evaluate: _scope => 'formation-recap',
      slots: [],
      attributes: [{
        type: expressionTypes.ATTRIBUTE,
        name: 'data',
        evaluate: _scope => _scope.state.recap_data
      }],
      redundantAttribute: 'expr5',
      selector: '[expr5]'
    }, {
      type: bindingTypes.TAG,
      getComponent: getComponent,
      evaluate: _scope => 'box-table',
      slots: [],
      attributes: [{
        type: expressionTypes.ATTRIBUTE,
        name: 'data',
        evaluate: _scope => _scope.state.table_data
      }, {
        type: expressionTypes.ATTRIBUTE,
        name: 'titre',
        evaluate: _scope => _scope.state.recap
      }],
      redundantAttribute: 'expr6',
      selector: '[expr6]'
    }])
  }, {
    type: bindingTypes.TAG,
    getComponent: getComponent,
    evaluate: _scope => 'my-switch',
    slots: [],
    attributes: [{
      type: expressionTypes.EVENT,
      name: 'onClick',
      evaluate: _scope => _scope.toggleMode
    }],
    redundantAttribute: 'expr7',
    selector: '[expr7]'
  }]),
  name: 'my-app'
};

riot_min.exports.register("my-app", App);
riot_min.exports.mount("my-app");
