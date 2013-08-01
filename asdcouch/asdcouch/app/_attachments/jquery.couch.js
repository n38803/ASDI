// Licensed under the Apache License, Version 2.0 (the "License"); you may not
2	// use this file except in compliance with the License.  You may obtain a copy
3	// of the License at
4	//
5	//   http://www.apache.org/licenses/LICENSE-2.0
6	//
7	// Unless required by applicable law or agreed to in writing, software
8	// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
9	// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the
10	// License for the specific language governing permissions and limitations under
11	// the License.
12	
13	// Usage: The passed in function is called when the page is ready.
14	// CouchApp passes in the app object, which takes care of linking to
15	// the proper database, and provides access to the CouchApp helpers.
16	// $.couch.app(function(app) {
17	//    app.db.view(...)
18	//    ...
19	// });
20	
21	(function($) {
22	
23	  function Design(db, name, code) {
24	    this.doc_id = "_design/"+name;
25	    if (code) {
26	      this.code_path = this.doc_id + "/" + code;
27	    } else {
28	      this.code_path = this.doc_id;
29	    }
30	    this.view = function(view, opts) {
31	      db.view(name+'/'+view, opts);
32	    };
33	    this.list = function(list, view, opts) {
34	      db.list(name+'/'+list, view, opts);
35	    };
36	  }
37	
38	  function docForm() { alert("docForm has been moved to vendor/couchapp/lib/docForm.js, use app.require to load") };
39	
40	  function resolveModule(path, names, parents, current) {
41	    parents = parents || [];
42	    if (names.length === 0) {
43	      if (typeof current != "string") {
44	        throw ["error","invalid_require_path",
45	          'Must require a JavaScript string, not: '+(typeof current)];
46	      }
47	      return [current, parents];
48	    }
49	    var n = names.shift();
50	    if (n == '..') {
51	      parents.pop();
52	      var pp = parents.pop();
53	      if (!pp) {
54	        throw ["error", "invalid_require_path", path];
55	      }
56	      return resolveModule(path, names, parents, pp);
57	    } else if (n == '.') {
58	      var p = parents.pop();
59	      if (!p) {
60	        throw ["error", "invalid_require_path", path];
61	      }
62	      return resolveModule(path, names, parents, p);
63	    } else {
64	      parents = [];
65	    }
66	    if (!current[n]) {
67	      throw ["error", "invalid_require_path", path];
68	    }
69	    parents.push(current);
70	    return resolveModule(path, names, parents, current[n]);
71	  }
72	
73	  function makeRequire(ddoc) {
74	    var moduleCache = [];
75	    function getCachedModule(name, parents) {
76	      var key, i, len = moduleCache.length;
77	      for (i=0;i<len;++i) {
78	        key = moduleCache[i].key;
79	        if (key[0] === name && key[1] === parents) {
80	          return moduleCache[i].module;
81	        }
82	      }
83	      return null;
84	    }
85	    function setCachedModule(name, parents, module) {
86	      moduleCache.push({ key: [name, parents], module: module });
87	    }
88	    var require = function (name, parents) {
89	      var cachedModule = getCachedModule(name, parents);
90	      if (cachedModule !== null) {
91	        return cachedModule;
92	      }
93	      var exports = {};
94	      var resolved = resolveModule(name, name.split('/'), parents, ddoc);
95	      var source = resolved[0]; 
96	      parents = resolved[1];
97	      var s = "var func = function (exports, require) { " + source + " };";
98	      try {
99	        eval(s);
100	        func.apply(ddoc, [exports, function(name) {return require(name, parents)}]);
101	      } catch(e) { 
102	        throw ["error","compilation_error","Module require('"+name+"') raised error "+e.toSource()]; 
103	      }
104	      setCachedModule(name, parents, exports);
105	      return exports;
106	    }
107	    return require;
108	  };
109	
110	  function mockReq() {
111	    var p = document.location.pathname.split('/'),
112	      qs = document.location.search.replace(/^\?/,'').split('&'),
113	      q = {};
114	    qs.forEach(function(param) {
115	      var ps = param.split('='),
116	        k = decodeURIComponent(ps[0]),
117	        v = decodeURIComponent(ps[1]);
118	      if (["startkey", "endkey", "key"].indexOf(k) != -1) {
119	        q[k] = JSON.parse(v);
120	      } else {
121	        q[k] = v;
122	      }
123	    });
124	    p.shift();
125	    return {
126	      path : p,
127	      query : q
128	    };
129	  };
130	
131	  $.couch.app = $.couch.app || function(appFun, opts) {
132	    opts = opts || {};
133	    var urlPrefix = (opts.urlPrefix || ""),
134	      index = urlPrefix.split('/').length,
135	      fragments = unescape(document.location.href).split('/'),
136	      dbname = opts.db || fragments[index + 2],
137	      dname = opts.design || fragments[index + 4];
138	    $.couch.urlPrefix = urlPrefix;
139	    var db = $.couch.db(dbname),
140	      design = new Design(db, dname, opts.load_path);
141	    var appExports = $.extend({
142	      db : db,
143	      design : design,
144	      view : design.view,
145	      list : design.list,
146	      docForm : docForm, // deprecated
147	      req : mockReq()
148	    }, $.couch.app.app);
149	    function handleDDoc(ddoc) {       
150	      if (ddoc) {
151	        appExports.ddoc = ddoc;
152	        appExports.require = makeRequire(ddoc);
153	      }
154	      appFun.apply(appExports, [appExports]);
155	    }
156	    if (opts.ddoc) {
157	      // allow the ddoc to be embedded in the html
158	      // to avoid a second http request
159	      $.couch.app.ddocs[design.doc_id] = opts.ddoc;
160	    }
161	    if ($.couch.app.ddocs[design.doc_id]) {
162	      $(function() {handleDDoc($.couch.app.ddocs[design.doc_id])});
163	    } else {
164	      // only open 1 connection for this ddoc
165	      if ($.couch.app.ddoc_handlers[design.doc_id]) {
166	        // we are already fetching, just wait
167	        $.couch.app.ddoc_handlers[design.doc_id].push(handleDDoc);
168	      } else {
169	        $.couch.app.ddoc_handlers[design.doc_id] = [handleDDoc];
170	        // use getDbProperty to bypass %2F encoding on _show/app
171	        db.getDbProperty(design.code_path, {
172	          success : function(doc) {
173	            $.couch.app.ddocs[design.doc_id] = doc;
174	            $.couch.app.ddoc_handlers[design.doc_id].forEach(function(h) {
175	              $(function() {h(doc)});
176	            });
177	            $.couch.app.ddoc_handlers[design.doc_id] = null;
178	          },
179	          error : function() {
180	            $.couch.app.ddoc_handlers[design.doc_id].forEach(function(h) {
181	              $(function() {h()});
182	            });
183	            $.couch.app.ddoc_handlers[design.doc_id] = null;
184	          }
185	        });
186	      }
187	    }
188	  };
189	  $.couch.app.ddocs = {};
190	  $.couch.app.ddoc_handlers = {};
191	  // legacy support. $.CouchApp is deprecated, please use $.couch.app
192	  $.CouchApp = $.couch.app;
193	})(jQuery);
194	
195	// JavaScript 1.6 compatibility functions that are missing from IE7/IE8
196	
197	if (!Array.prototype.forEach)
198	{
199	    Array.prototype.forEach = function(fun /*, thisp*/)
200	    {
201	        var len = this.length >>> 0;
202	        if (typeof fun != "function")
203	            throw new TypeError();
204	
205	        var thisp = arguments[1];
206	        for (var i = 0; i < len; i++)
207	        {
208	            if (i in this)
209	                fun.call(thisp, this[i], i, this);
210	        }
211	    };
212	}
213	
214	if (!Array.prototype.indexOf)
215	{
216	    Array.prototype.indexOf = function(elt)
217	    {
218	        var len = this.length >>> 0;
219	
220	        var from = Number(arguments[1]) || 0;
221	        from = (from < 0)
222	                ? Math.ceil(from)
223	                : Math.floor(from);
224	        if (from < 0)
225	            from += len;
226	
227	        for (; from < len; from++)
228	        {
229	            if (from in this &&
230	                this[from] === elt)
231	                return from;
232	        }
233	        return -1;
234	    };
235	}