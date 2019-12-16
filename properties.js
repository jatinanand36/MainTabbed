define(["qlik"], function(t) {
    var n=["qlik-show-hide-container", "qlik-tabbed-container", "qlik-trellis-container"], o=t.currApp(this), a=null;
    function e(e) {
        return {
            tab: {
                component: "header", label: "Tab "+e
            }
            , label: {
                ref: "props.tab"+e+".label", type: "string", label: "Label", defaultValue: "Tab "+e, expression: "optional"
            }
            , chart: {
                ref:"props.tab"+e+".chart", type:"string", component:"dropdown", label:"Master Object", options:function() {
                    return getMasterObjectList()
                }
            }
            , export: {
                ref:"props.tab"+e+".export", type:"boolean", label:"Enable export", defaultValue:!1, show:function(t) {
                    return""!==t.props["tab"+e].chart&&(a?(setTimeout(function() {
                        a=null
                    }
                    , 1e3), a):o.getAppLayout().then(function(t) {
                        return a=t.layout.permissions.exportData
                    }
                    ))
                }
            }
        }
    }
    return {
        type:"items", component:"accordion", items: {
            settings: {
                uses:"settings", items: {
                    general: {
                        items: {
                            showTitles: {
                                defaultValue:!(getMasterObjectList=function() {
                                    var a=t.Promise.defer();
                                    return o.getAppObjectList("masterobject", function(t) {
                                        var e=t.qAppObjectList.qItems.filter(function(t) {
                                            return n.indexOf(t.qData.visualization)<0
                                        }
                                        ).sort(function(t, e) {
                                            return t.qData.rank<e.qData.rank?-1: t.qData.rank>e.qData.rank?1: t.qMeta.title.localeCompare(e.qMeta.title)
                                        }
                                        ).map(function(t) {
                                            return {
                                                value: t.qInfo.qId, label: 50<t.qMeta.title.length?t.qMeta.title.slice(0, 50)+"...": t.qMeta.title
                                            }
                                        }
                                        );
                                        return a.resolve(e)
                                    }
                                    ), a.promise
                                }
                                )
                            }
                            , details: {
                                show: !1
                            }
                        }
                    }
                    , tabs: {
                        grouped:!1, type:"items", label:"Tabs", items: {
                            dropdown: {
                                ref:"props.num_of_tabs", type:"string", label:"Number of Tabs", defaultValue:"2", component:"dropdown", options:[ {
                                    value: "1", label: "1"
                                }
                                , {
                                    value: "2", label: "2"
                                }
                                , {
                                    value: "3", label: "3"
                                }
                                , {
                                    value: "4", label: "4"
                                }
                                , {
                                    value: "5", label: "5"
                                }
                                ]
                            }
                            , tab1: {
                                type:"items", label:function(t) {
                                    return t.props.tab1.label
                                }
                                , items:e(1)
                            }
                            , tab2: {
                                type:"items", label:function(t) {
                                    return t.props.tab2.label
                                }
                                , show:function(t) {
                                    return 2<=t.props.num_of_tabs
                                }
                                , items:e(2)
                            }
                            , tab3: {
                                type:"items", label:function(t) {
                                    return t.props.tab3.label
                                }
                                , show:function(t) {
                                    return 3<=t.props.num_of_tabs
                                }
                                , items:e(3)
                            }
                            , tab4: {
                                type:"items", label:function(t) {
                                    return t.props.tab4.label
                                }
                                , show:function(t) {
                                    return 4<=t.props.num_of_tabs
                                }
                                , items:e(4)
                            }
                            , tab5: {
                                type:"items", label:function(t) {
                                    return t.props.tab5.label
                                }
                                , show:function(t) {
                                    return 5<=t.props.num_of_tabs
                                }
                                , items:e(5)
                            }
                        }
                    }
                }
            }
            , about: {
                label:"About", component:"items", items: {
                    header: {
                        label: "Tabbed container", style: "header", component: "text"
                    }
                    , paragraph1: {
                        label: "A container object that can contain several master visualizations. The user chooses which object to show by clicking on a tab.", component: "text"
                    }
                    , paragraph2: {
                        label: "Tabbed container is based upon an extension created by Masaki Hamano at QlikTech International AB.", component: "text"
                    }
                }
            }
        }
    }
}

);