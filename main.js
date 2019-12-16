/**
  * @license
  * Copyright (c) 2017 Masaki Hamano. All rights reserved.
  *
  * Copyrights licensed under the terms of the MIT license.
  * Original source <https://github.com/mhamano/Qlik-Sense-Tabs>
  */
 define(["jquery", "qlik", "./properties", "css!./css/styles.css"], function(S, g, t, e) {
    var E = g.currApp(this),
        _ = {
            TAB: '<li class="lui-tab"></li>',
            TABTEXT: '<span class="lui-tab__text"></span>',
            TABROW: '<ul class="lui-tabset lui-tabset--fill"></ul>',
            TABCONTENT: '<article class="tab-contents"></article>',
            QVOBJECT: '<div class="qvobject viz-without-export"></div>',
            EXTENSION: '<div qv-extension class="tab-row"></div>',
            BLOCK: '<div class="tab-block"></div>'
        };

    function O(t, e) {
        return t + "-" + e
    }

    function A(t, e, n) {
        return t + "_" + e + "-" + n
    }

    function B(t, e, n, i, a, r, o) {
        e.append(function(a, t, e, n, i) {
            for (var r = S(_.TABROW), o = t.num_of_tabs, s = null, c = null, u = 1; u <= o; u++) {
                var l, p = t["tab" + u].label;
                l = S(_.TAB).append(S(_.TABTEXT).text(p)).attr("title", p).attr("tabNr", u).attr("panelid", O(a, u)), i && l.on("click", function(t) {
                    var e = S(t.currentTarget),
                        n = e.attr("panelid"),
                        i = S("#" + a);
                    e.siblings().removeClass("lui-active"), e.addClass("lui-active"), i.children("div").removeClass("activated").hide(), i.children("#" + n).addClass("activated").show(), g.resize("#" + n)
                }), r.append(l), null == s && (s = l)
            }
            return 0 < (c = r.find(":nth-child(" + e + ")")).length ? c[0].click() : s && s.click(), r
        }(n, i, a, 0, o)), t.replaceWith(e)
    }

    function q(t, e) {
        t.find(".tab-instructions").remove(), t.find(".tab-contents").remove(), e.currentVisualization && (e.currentVisualization.close(), e.currentVisualization = null)
    }
    return {
        initialProperties: {
            version: 1,
            activeTab: 1
        },
        definition: t,
        support: {
            export: !1,
            exportData: !1,
            snapshot: !1
        },
        paint: function(t, n) {
            var i, a = n.qInfo.qId,
                e = n.props,
                r = null,
                o = t.find('[id^="export-data"]'),
                s = t.find(".tab-instructions"),
                c = t.parent(),
                u = S(_.EXTENSION),
                l = 0 < c.find(".tab-row").length,
                p = 1 === this._interactionState,
                d = this.options && !0 === this.options.noSelections,
                b = this.options && !0 === this.options.zoomEnabled,
                h = t.find("ul.lui-tabset li.lui-tab.lui-active").attr("tabnr");
            i = e["tab" + (r = null != h ? h : "1")].export;
            var f = this.previousState && (this.previousState.canInteract !== p || this.previousState.noSelections !== d || this.previousState.shouldExport !== i);
            addExportButton = i && (f || !this.previousState || this.previousState.currActiveTab !== r), this.previousState = {
                canInteract: p,
                noSelections: d,
                currActiveTab: r,
                shouldExport: i
            };
            var v = {
                    noInteraction: !p,
                    noSelections: d
                },
                m = e["tab" + r].chart,
                T = A(a, m, r),
                x = function(t) {
                    return t.find(".tab-contents").attr("chart-id")
                }(t);
            l ? e.num_of_tabs !== c.data("currTabLimit") || f ? (c.data("currTabLimit", e.num_of_tabs), t.remove(".lui-tabset"), B(t, u, a, e, r, this.backendApi, p)) : (u = c.find(".tab-row"), function(t, r) {
                t.find(".lui-tab__text").each(function(t, e) {
                    var n = S(e),
                        i = n.text(),
                        a = r["tab" + (t + 1)].label;
                    i !== a && n.text(a)
                })
            }(c, e)) : (c.data("currTabLimit", e.num_of_tabs), B(t, u, a, e, r, this.backendApi, p)), "" !== m && x !== T || f ? (q(t, n), u.append(function(t, e, n, i) {
                var a = S(_.TABCONTENT),
                    r = S(_.QVOBJECT);
                return a.attr("id", t), a.attr("chart-id", A(t, n, e)), r.attr("id", O(t, e)), a.append(r), a
            }(a, r, m)), E.getObjectProperties(m).then(function(e) {
                return E.getObjectProperties(T).then(function(t) {
                    return t
                }).catch(function() {
                    return E.createGenericObject({
                        qInfo: {
                            qId: T
                        }
                    }).then(function(t) {
                        return t.copyFrom(m).then(function() {
                            return t.getProperties().then(function() {
                                return t
                            })
                        })
                    })
                }).then(function(t) {
                    return e.properties.qStateName || (t.properties.qStateName = n.qStateName || ""), t.setProperties(t.properties).then(function() {
                        return E.visualization.get(T).then(function(t) {
                            return (n.currentVisualization = t).show(O(a, r), v).then(function() {
                                u.find(".qv-object-wrapper").scope().options.zoomEnabled = b, o.remove(), i && t.model.layout.permissions.exportData && function(e, n, i, t) {
                                    var a, r = t.find(".tab-contents");
                                    a = S("<span/>", {
                                        class: "lui-button__icon  lui-icon  lui-icon--export"
                                    });
                                    var o = S("<button/>", {
                                        id: "export-data-" + A(e, i, n),
                                        class: "lui-button lui-button lui-button",
                                        title: "Export data"
                                    }).append(a).on("click touchstart", function(t) {
                                        t.preventDefault(), E.getObject(null, A(e, i, n), null).then(function(t) {
                                            new g.table(t).exportData({
                                                download: !0
                                            })
                                        })
                                    });
                                    r.append(o)
                                }(a, r, m, u)
                            })
                        })
                    })
                })
            })) : !p && "" === m && s.length < 1 && (q(t, n), u.append(S("<div/>", {
                class: "tab-instructions"
            }).append(S("<div/>", {
                class: "title",
                text: "Follow the instructions below to get started:"
            })).append(S("<ul/>").append(S("<li/>", {
                text: "Create charts and add them as master items. (You can remove the charts from the sheet after you have added them to master items if you please)"
            })).append(S("<li/>", {
                text: 'Drag and drop the "Container with tabs" extension onto the sheet.'
            })).append(S("<li/>", {
                text: "On the extension property panel, navigate to [Appearance] > [Tabs] Here you can change the number of tabs and assign master items to each tab."
            }))))), !p && t.find(".tab-block").length < 1 ? u.append(S(_.BLOCK).on("click touchstart", function(t) {
                return t.preventDefault(), !1
            })) : p && (t.find(".tab-block").remove(), t.find(".tab-instructions").remove())
        }
    }
});