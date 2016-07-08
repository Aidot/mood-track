! function(t, e) {
    var r = t.angular;
    if (r !== e) {
        var n = r.module("parse-angular", []);
        n.run(["$q", "$window", function(t, e) {
            if (!r.isUndefined(e.Parse) && r.isObject(e.Parse)) {
                var n = e.Parse,
                    o = {
                        Object: {
                            prototype: ["save", "fetch", "destroy"],
                            "static": ["saveAll", "destroyAll"]
                        },
                        // Collection: {
                        //     prototype: ["fetch"],
                        //     "static": []
                        // },
                        Query: {
                            prototype: ["find", "first", "count", "get"],
                            "static": []
                        },
                        Cloud: {
                            prototype: [],
                            "static": ["run"]
                        },
                        User: {
                            prototype: ["signUp"],
                            "static": ["requestPasswordReset", "logIn"]
                        },
                        FacebookUtils: {
                            prototype: [],
                            "static": ["logIn", "link", "unlink"]
                        }
                    };
                for (var i in o) {
                    var s = i,
                        a = o[i],
                        c = a.prototype,
                        u = a.static;
                        c.forEach(function(e) {
                        var r = n[s].prototype[e];
                        n[s].prototype[e] = function() {
                            return r.apply(this, arguments).then(function(e) {
                                var r = t.defer();
                                return r.resolve(e), r.promise
                            }, function(e) {
                                var r = t.defer();
                                return r.reject(e), r.promise
                            })
                        }
                    }), u.forEach(function(e) {
                        var r = n[s][e];
                        n[s][e] = function() {
                            return r.apply(this, arguments).then(function(e) {
                                var r = t.defer();
                                return r.resolve(e), r.promise
                            }, function(e) {
                                var r = t.defer();
                                return r.reject(e), r.promise
                            })
                        }
                    })
                }
            }
        }]), r.module("parse-angular.enhance", ["parse-angular"]).run(["$q", "$window", function(t, e) {
            function n(t) {
                return t.charAt(0).toUpperCase() + t.slice(1)
            }
            if (!r.isUndefined(e.Parse) && r.isObject(e.Parse)) {
                var o = e.Parse;
                o.Object.getClass = function(t) {
                    return o.Object._classMap[t]
                };
                var i = o.Object.extend;
                o.Object.extend = function(t) {
                    var e = i.apply(this, arguments);
                    if (o._.isObject(t) && o._.isArray(t.attrs)) {
                        var r = t.attrs;
                        o._.each(r, function(t) {
                            var r = n(t);
                            e.prototype["get" + r] || (e.prototype["get" + r] = function() {
                                return this.get(t)
                            }), e.prototype["set" + r] || (e.prototype["set" + r] = function(e) {
                                return this.set(t, e), this
                            })
                        })
                    }
                    return e
                }
                o.Collection._classMap = {};
                var s = o.Collection.extend;
                o.Collection.extend = function(t) {
                    var e = s.apply(this, arguments);
                    return t && t.className && (o.Collection._classMap[t.className] = e), e
                }, o.Collection.getClass = function(t) {
                    return o.Collection._classMap[t]
                }, o.Collection.prototype = r.extend(o.Collection.prototype, {
                    loadMore: function(t) {
                        if (!r.isUndefined(this.query)) {
                            var e = -1 == this.query._limit ? 100 : this.query._limit,
                                n = this.query._skip;
                            n += e, this.query.skip(n);
                            var o = this;
                            return this.query.find().then(function(r) {
                                return t && t.add === !1 || o.add(r), r.length < e && (o.hasMoreToLoad = !1), r
                            })
                        }
                    }
                })
            }
        }])
    }
}(this);
