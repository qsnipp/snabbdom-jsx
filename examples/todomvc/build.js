(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var _curry2 = require('./internal/_curry2');


/**
 * Wraps a function of any arity (including nullary) in a function that accepts exactly `n`
 * parameters. Unlike `nAry`, which passes only `n` arguments to the wrapped function,
 * functions produced by `arity` will pass all provided arguments to the wrapped function.
 *
 * @func
 * @memberOf R
 * @sig (Number, (* -> *)) -> (* -> *)
 * @category Function
 * @param {Number} n The desired arity of the returned function.
 * @param {Function} fn The function to wrap.
 * @return {Function} A new function wrapping `fn`. The new function is
 *         guaranteed to be of arity `n`.
 * @deprecated since v0.15.0
 * @example
 *
 *      var takesTwoArgs = function(a, b) {
 *        return [a, b];
 *      };
 *      takesTwoArgs.length; //=> 2
 *      takesTwoArgs(1, 2); //=> [1, 2]
 *
 *      var takesOneArg = R.arity(1, takesTwoArgs);
 *      takesOneArg.length; //=> 1
 *      // All arguments are passed through to the wrapped function
 *      takesOneArg(1, 2); //=> [1, 2]
 */
module.exports = _curry2(function(n, fn) {
  // jshint unused:vars
  switch (n) {
    case 0: return function() {return fn.apply(this, arguments);};
    case 1: return function(a0) {return fn.apply(this, arguments);};
    case 2: return function(a0, a1) {return fn.apply(this, arguments);};
    case 3: return function(a0, a1, a2) {return fn.apply(this, arguments);};
    case 4: return function(a0, a1, a2, a3) {return fn.apply(this, arguments);};
    case 5: return function(a0, a1, a2, a3, a4) {return fn.apply(this, arguments);};
    case 6: return function(a0, a1, a2, a3, a4, a5) {return fn.apply(this, arguments);};
    case 7: return function(a0, a1, a2, a3, a4, a5, a6) {return fn.apply(this, arguments);};
    case 8: return function(a0, a1, a2, a3, a4, a5, a6, a7) {return fn.apply(this, arguments);};
    case 9: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) {return fn.apply(this, arguments);};
    case 10: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {return fn.apply(this, arguments);};
    default: throw new Error('First argument to arity must be a non-negative integer no greater than ten');
  }
});

},{"./internal/_curry2":4}],2:[function(require,module,exports){
var _curry2 = require('./internal/_curry2');
var _curryN = require('./internal/_curryN');
var arity = require('./arity');


/**
 * Returns a curried equivalent of the provided function, with the
 * specified arity. The curried function has two unusual capabilities.
 * First, its arguments needn't be provided one at a time. If `g` is
 * `R.curryN(3, f)`, the following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value `R.__` may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is `R.__`,
 * the following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} length The arity for the returned function.
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curry
 * @example
 *
 *      var addFourNumbers = function() {
 *        return R.sum([].slice.call(arguments, 0, 4));
 *      };
 *
 *      var curriedAddFourNumbers = R.curryN(4, addFourNumbers);
 *      var f = curriedAddFourNumbers(1, 2);
 *      var g = f(3);
 *      g(4); //=> 10
 */
module.exports = _curry2(function curryN(length, fn) {
  return arity(length, _curryN(length, [], fn));
});

},{"./arity":1,"./internal/_curry2":4,"./internal/_curryN":5}],3:[function(require,module,exports){
/**
 * Optimized internal two-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
module.exports = function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0) {
      return f1;
    } else if (a != null && a['@@functional/placeholder'] === true) {
      return f1;
    } else {
      return fn(a);
    }
  };
};

},{}],4:[function(require,module,exports){
var _curry1 = require('./_curry1');


/**
 * Optimized internal two-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
module.exports = function _curry2(fn) {
  return function f2(a, b) {
    var n = arguments.length;
    if (n === 0) {
      return f2;
    } else if (n === 1 && a != null && a['@@functional/placeholder'] === true) {
      return f2;
    } else if (n === 1) {
      return _curry1(function(b) { return fn(a, b); });
    } else if (n === 2 && a != null && a['@@functional/placeholder'] === true &&
                          b != null && b['@@functional/placeholder'] === true) {
      return f2;
    } else if (n === 2 && a != null && a['@@functional/placeholder'] === true) {
      return _curry1(function(a) { return fn(a, b); });
    } else if (n === 2 && b != null && b['@@functional/placeholder'] === true) {
      return _curry1(function(b) { return fn(a, b); });
    } else {
      return fn(a, b);
    }
  };
};

},{"./_curry1":3}],5:[function(require,module,exports){
var arity = require('../arity');


/**
 * Internal curryN function.
 *
 * @private
 * @category Function
 * @param {Number} length The arity of the curried function.
 * @return {array} An array of arguments received thus far.
 * @param {Function} fn The function to curry.
 */
module.exports = function _curryN(length, received, fn) {
  return function() {
    var combined = [];
    var argsIdx = 0;
    var left = length;
    var combinedIdx = 0;
    while (combinedIdx < received.length || argsIdx < arguments.length) {
      var result;
      if (combinedIdx < received.length &&
          (received[combinedIdx] == null ||
           received[combinedIdx]['@@functional/placeholder'] !== true ||
           argsIdx >= arguments.length)) {
        result = received[combinedIdx];
      } else {
        result = arguments[argsIdx];
        argsIdx += 1;
      }
      combined[combinedIdx] = result;
      if (result == null || result['@@functional/placeholder'] !== true) {
        left -= 1;
      }
      combinedIdx += 1;
    }
    return left <= 0 ? fn.apply(this, combined) : arity(left, _curryN(length, combined, fn));
  };
};

},{"../arity":1}],6:[function(require,module,exports){
module.exports = {
  array: Array.isArray,
  primitive: function(s) { return typeof s === 'string' || typeof s === 'number'; },
};

},{}],7:[function(require,module,exports){
function updateClass(oldVnode, vnode) {
  var cur, name, elm = vnode.elm,
      oldClass = oldVnode.data.class || {},
      klass = vnode.data.class || {};
  for (name in klass) {
    cur = klass[name];
    if (cur !== oldClass[name]) {
      elm.classList[cur ? 'add' : 'remove'](name);
    }
  }
}

module.exports = {create: updateClass, update: updateClass};

},{}],8:[function(require,module,exports){
var is = require('../is');

function arrInvoker(arr) {
  return function() {
    // Special case when length is two, for performance
    arr.length === 2 ? arr[0](arr[1]) : arr[0].apply(undefined, arr.slice(1));
  };
}

function fnInvoker(o) {
  return function(ev) { o.fn(ev); };
}

function updateEventListeners(oldVnode, vnode) {
  var name, cur, old, elm = vnode.elm,
      oldOn = oldVnode.data.on || {}, on = vnode.data.on;
  if (!on) return;
  for (name in on) {
    cur = on[name];
    old = oldOn[name];
    if (old === undefined) {
      if (is.array(cur)) {
        elm.addEventListener(name, arrInvoker(cur));
      } else {
        cur = {fn: cur};
        on[name] = cur;
        elm.addEventListener(name, fnInvoker(cur));
      }
    } else if (is.array(old)) {
      // Deliberately modify old array since it's captured in closure created with `arrInvoker`
      old.length = cur.length;
      for (var i = 0; i < old.length; ++i) old[i] = cur[i];
      on[name]  = old;
    } else {
      old.fn = cur;
      on[name] = old;
    }
  }
}

module.exports = {create: updateEventListeners, update: updateEventListeners};

},{"../is":6}],9:[function(require,module,exports){
function updateProps(oldVnode, vnode) {
  var key, cur, old, elm = vnode.elm,
      oldProps = oldVnode.data.props || {}, props = vnode.data.props || {};
  for (key in props) {
    cur = props[key];
    old = oldProps[key];
    if (old !== cur) {
      elm[key] = cur;
    }
  }
}

module.exports = {create: updateProps, update: updateProps};

},{}],10:[function(require,module,exports){
var raf = requestAnimationFrame || setTimeout;
var nextFrame = function(fn) { raf(function() { raf(fn); }); };

function setNextFrame(obj, prop, val) {
  nextFrame(function() { obj[prop] = val; });
}

function updateStyle(oldVnode, vnode) {
  var cur, name, elm = vnode.elm,
      oldStyle = oldVnode.data.style || {},
      style = vnode.data.style || {},
      oldHasDel = 'delayed' in oldStyle;
  for (name in style) {
    cur = style[name];
    if (name === 'delayed') {
      for (name in style.delayed) {
        cur = style.delayed[name];
        if (!oldHasDel || cur !== oldStyle.delayed[name]) {
          setNextFrame(elm.style, name, cur);
        }
      }
    } else if (name !== 'remove' && cur !== oldStyle[name]) {
      elm.style[name] = cur;
    }
  }
}

function applyDestroyStyle(vnode) {
  var style, name, elm = vnode.elm, s = vnode.data.style;
  if (!s || !(style = s.destroy)) return;
  for (name in style) {
    elm.style[name] = style[name];
  }
}

function applyRemoveStyle(vnode, rm) {
  var s = vnode.data.style;
  if (!s || !s.remove) {
    rm();
    return;
  }
  var name, elm = vnode.elm, idx, i = 0, maxDur = 0,
      compStyle, style = s.remove, amount = 0, applied = [];
  for (name in style) {
    applied.push(name);
    elm.style[name] = style[name];
  }
  compStyle = getComputedStyle(elm);
  var props = compStyle['transition-property'].split(', ');
  for (; i < props.length; ++i) {
    if(applied.indexOf(props[i]) !== -1) amount++;
  }
  elm.addEventListener('transitionend', function(ev) {
    if (ev.target === elm) --amount;
    if (amount === 0) rm();
  });
}

module.exports = {create: updateStyle, update: updateStyle, destroy: applyDestroyStyle, remove: applyRemoveStyle};

},{}],11:[function(require,module,exports){
// jshint newcap: false
/* global require, module, document, Element */
'use strict';

var VNode = require('./vnode');
var is = require('./is');

function isUndef(s) { return s === undefined; }
function isDef(s) { return s !== undefined; }

function emptyNodeAt(elm) {
  return VNode(elm.tagName, {}, [], undefined, elm);
}

var emptyNode = VNode('', {}, [], undefined, undefined);

function sameVnode(vnode1, vnode2) {
  return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i, map = {}, key;
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) map[key] = i;
  }
  return map;
}

function createRmCb(childElm, listeners) {
  return function() {
    if (--listeners === 0) childElm.parentElement.removeChild(childElm);
  };
}

var hooks = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];

function init(modules) {
  var i, j, cbs = {};
  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (modules[j][hooks[i]] !== undefined) cbs[hooks[i]].push(modules[j][hooks[i]]);
    }
  }

  function createElm(vnode, insertedVnodeQueue) {
    var i, data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) i(vnode);
      if (isDef(i = data.vnode)) vnode = i;
    }
    var elm, children = vnode.children, sel = vnode.sel;
    if (isDef(sel)) {
      // Parse selector
      var hashIdx = sel.indexOf('#');
      var dotIdx = sel.indexOf('.', hashIdx);
      var hash = hashIdx > 0 ? hashIdx : sel.length;
      var dot = dotIdx > 0 ? dotIdx : sel.length;
      var tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
      elm = vnode.elm = isDef(data) && isDef(i = data.ns) ? document.createElementNS(i, tag)
                                                          : document.createElement(tag);
      if (hash < dot) elm.id = sel.slice(hash + 1, dot);
      if (dotIdx > 0) elm.className = sel.slice(dot+1).replace(/\./g, ' ');
      if (is.array(children)) {
        for (i = 0; i < children.length; ++i) {
          elm.appendChild(createElm(children[i], insertedVnodeQueue));
        }
      } else if (is.primitive(vnode.text)) {
        elm.appendChild(document.createTextNode(vnode.text));
      }
      for (i = 0; i < cbs.create.length; ++i) cbs.create[i](emptyNode, vnode);
      i = vnode.data.hook; // Reuse variable
      if (isDef(i)) {
        if (i.create) i.create(emptyNode, vnode);
        if (i.insert) insertedVnodeQueue.push(vnode);
      }
    } else {
      elm = vnode.elm = document.createTextNode(vnode.text);
    }
    return vnode.elm;
  }

  function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      parentElm.insertBefore(createElm(vnodes[startIdx], insertedVnodeQueue), before);
    }
  }

  function invokeDestroyHook(vnode) {
    var i = vnode.data, j;
    if (isDef(i)) {
      if (isDef(i = i.hook) && isDef(i = i.destroy)) i(vnode);
      for (i = 0; i < cbs.destroy.length; ++i) cbs.destroy[i](vnode);
      if (isDef(i = vnode.children)) {
        for (j = 0; j < vnode.children.length; ++j) {
          invokeDestroyHook(vnode.children[j]);
        }
      }
    }
  }

  function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var i, listeners, rm, ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.sel)) {
          invokeDestroyHook(ch);
          listeners = cbs.remove.length + 1;
          rm = createRmCb(ch.elm, listeners);
          for (i = 0; i < cbs.remove.length; ++i) cbs.remove[i](ch, rm);
          if (isDef(i = ch.data) && isDef(i = i.hook) && isDef(i = i.remove)) {
            i(ch, rm);
          } else {
            rm();
          }
        } else { // Text node
          parentElm.removeChild(ch.elm);
        }
      }
    }
  }

  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
    var oldStartIdx = 0, newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, elmToMove, before;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        idxInOld = oldKeyToIdx[newStartVnode.key];
        if (isUndef(idxInOld)) { // New element
          parentElm.insertBefore(createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          elmToMove = oldCh[idxInOld];
          patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
          oldCh[idxInOld] = undefined;
          parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        }
      }
    }
    if (oldStartIdx > oldEndIdx) {
      before = isUndef(newCh[newEndIdx+1]) ? null : newCh[newEndIdx+1].elm;
      addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function patchVnode(oldVnode, vnode, insertedVnodeQueue) {
    var i, hook;
    if (isDef(i = vnode.data) && isDef(hook = i.hook) && isDef(i = hook.prepatch)) {
      i(oldVnode, vnode);
    }
    if (isDef(i = oldVnode.data) && isDef(i = i.vnode)) oldVnode = i;
    if (isDef(i = vnode.data) && isDef(i = i.vnode)) vnode = i;
    var elm = vnode.elm = oldVnode.elm, oldCh = oldVnode.children, ch = vnode.children;
    if (oldVnode === vnode) return;
    if (isDef(vnode.data)) {
      for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode);
      i = vnode.data.hook;
      if (isDef(i) && isDef(i = i.update)) i(oldVnode, vnode);
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue);
      } else if (isDef(ch)) {
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      }
    } else if (oldVnode.text !== vnode.text) {
      elm.textContent = vnode.text;
    }
    if (isDef(hook) && isDef(i = hook.postpatch)) {
      i(oldVnode, vnode);
    }
  }

  return function(oldVnode, vnode) {
    var i;
    var insertedVnodeQueue = [];
    for (i = 0; i < cbs.pre.length; ++i) cbs.pre[i]();
    if (oldVnode instanceof Element) {
      if (oldVnode.parentElement !== null) {
        createElm(vnode, insertedVnodeQueue);
        oldVnode.parentElement.replaceChild(vnode.elm, oldVnode);
      } else {
        oldVnode = emptyNodeAt(oldVnode);
        patchVnode(oldVnode, vnode, insertedVnodeQueue);
      }
    } else {
      patchVnode(oldVnode, vnode, insertedVnodeQueue);
    }
    for (i = 0; i < insertedVnodeQueue.length; ++i) {
      insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
    }
    for (i = 0; i < cbs.post.length; ++i) cbs.post[i]();
    return vnode;
  };
}

module.exports = {init: init};

},{"./is":6,"./vnode":12}],12:[function(require,module,exports){
module.exports = function(sel, data, children, text, elm) {
  var key = data === undefined ? undefined : data.key;
  return {sel: sel, data: data, children: children,
          text: text, elm: elm, key: key};
};

},{}],13:[function(require,module,exports){
var curryN = require('ramda/src/curryN');

function isString(s) { return typeof s === 'string'; }
function isNumber(n) { return typeof n === 'number'; }
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}
function isFunction(f) { return typeof f === 'function'; }
var isArray = Array.isArray || function(a) { return 'length' in a; };

var mapConstrToFn = curryN(2, function(group, constr) {
  return constr === String    ? isString
       : constr === Number    ? isNumber
       : constr === Object    ? isObject
       : constr === Array     ? isArray
       : constr === Function  ? isFunction
       : constr === undefined ? group
                              : constr;
});

function Constructor(group, name, validators) {
  validators = validators.map(mapConstrToFn(group));
  var constructor = curryN(validators.length, function() {
    var val = [], v, validator;
    for (var i = 0; i < arguments.length; ++i) {
      v = arguments[i];
      validator = validators[i];
      if ((typeof validator === 'function' && validator(v)) ||
          (v !== undefined && v !== null && v.of === validator)) {
        val[i] = arguments[i];
      } else {
        throw new TypeError('wrong value ' + v + ' passed to location ' + i + ' in ' + name);
      }
    }
    val.of = group;
    val.name = name;
    return val;
  });
  return constructor;
}

function rawCase(type, cases, action, arg) {
  if (type !== action.of) throw new TypeError('wrong type passed to case');
  var name = action.name in cases ? action.name
           : '_' in cases         ? '_'
                                  : undefined;
  if (name === undefined) {
    throw new Error('unhandled value passed to case');
  } else {
    return cases[name].apply(undefined, arg !== undefined ? action.concat([arg]) : action);
  }
}

var typeCase = curryN(3, rawCase);
var caseOn = curryN(4, rawCase);

function Type(desc) {
  var obj = {};
  for (var key in desc) {
    obj[key] = Constructor(obj, key, desc[key]);
  }
  obj.case = typeCase(obj);
  obj.caseOn = caseOn(obj);
  return obj;
}

module.exports = Type;

},{"ramda/src/curryN":2}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var KEY_ENTER = exports.KEY_ENTER = 13;

},{}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isBoolean = isBoolean;
exports.bind = bind;
exports.pipe = pipe;
function isBoolean(arg) {
  return typeof arg === 'boolean';
}

function bind(fn) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, args2 = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args2[_key2] = arguments[_key2];
    }

    return fn.apply(undefined, [].concat(args, args2));
  };
};

function pipe() {
  for (var _len3 = arguments.length, fns = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    fns[_key3] = arguments[_key3];
  }

  return function () {
    var res = fns[0].apply(fns, arguments);
    for (var i = 1; i < fns.length; i++) {
      res = fns[i](res);
    }
    return res;
  };
};

var targetChecked = exports.targetChecked = function targetChecked(e) {
  return e.target.checked;
};
var targetValue = exports.targetValue = function targetValue(e) {
  return e.target.value;
};

},{}],16:[function(require,module,exports){
'use strict';

var _snabbdomJsx = require('../../../snabbdom-jsx');

var _snabbdom = require('snabbdom');

var _snabbdom2 = _interopRequireDefault(_snabbdom);

var _todos = require('./todos');

var _todos2 = _interopRequireDefault(_todos);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var patch = _snabbdom2.default.init([require('snabbdom/modules/class'), // makes it easy to toggle classes
require('snabbdom/modules/props'), // for setting properties on DOM elements
require('snabbdom/modules/style'), // handles styling on elements with support for animations
require('snabbdom/modules/eventlisteners')]); /** @jsx html */

// attaches event listeners
var model = _todos2.default.init(handler),
    vnode = document.getElementById('todoapp');

function updateUI() {
  var newVnode = (0, _snabbdomJsx.html)(_todos2.default, { model: model, handler: handler });
  vnode = patch(vnode, newVnode);
}

function handler(action) {
  model = _todos2.default.update(model, action);
  updateUI();
}

updateUI();

},{"../../../snabbdom-jsx":19,"./todos":18,"snabbdom":11,"snabbdom/modules/class":7,"snabbdom/modules/eventlisteners":8,"snabbdom/modules/props":9,"snabbdom/modules/style":10}],17:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /** @jsx html */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _snabbdomJsx = require('../../../snabbdom-jsx');

var _unionType = require('union-type');

var _unionType2 = _interopRequireDefault(_unionType);

var _helpers = require('./helpers');

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// model : {id: Number, title: String, done: Boolean, editing: Boolean, editingValue: String }
var Action = (0, _unionType2.default)({
  SetTitle: [String],
  Toggle: [_helpers.isBoolean],
  StartEdit: [],
  CommitEdit: [String],
  CancelEdit: []
});

function onInput(handler, e) {
  if (e.keyCode === _constants.KEY_ENTER) handler(Action.CommitEdit(e.target.value));
}

var view = function view(_ref) {
  var model = _ref.model;
  var handler = _ref.handler;
  var onRemove = _ref.onRemove;
  return (0, _snabbdomJsx.html)(
    'li',
    {
      key: model.id,
      'class-completed': !!model.done && !model.editing,
      'class-editing': model.editing },
    (0, _snabbdomJsx.html)(
      'div',
      { selector: '.view' },
      (0, _snabbdomJsx.html)('input', {
        selector: '.toggle',
        type: 'checkbox',
        checked: !!model.done,
        'on-click': (0, _helpers.pipe)(_helpers.targetChecked, Action.Toggle, handler) }),
      (0, _snabbdomJsx.html)(
        'label',
        {
          'on-dblclick': (0, _helpers.bind)(handler, Action.StartEdit()) },
        model.title
      ),
      (0, _snabbdomJsx.html)('button', {
        selector: '.destroy',
        'on-click': onRemove })
    ),
    (0, _snabbdomJsx.html)('input', {
      selector: '.edit',
      value: model.title,
      'on-blur': (0, _helpers.bind)(handler, Action.CancelEdit()),
      'on-keydown': (0, _helpers.bind)(onInput, handler) })
  );
};

function init(id, title) {
  return { id: id, title: title, done: false, editing: false, editingValue: '' };
}

function update(task, action) {
  return Action.case({
    Toggle: function Toggle(done) {
      return _extends({}, task, { done: done });
    },
    StartEdit: function StartEdit() {
      return _extends({}, task, { editing: true, editingValue: task.title });
    },
    CommitEdit: function CommitEdit(title) {
      return _extends({}, task, { title: title, editing: false, editingValue: '' });
    },
    CancelEdit: function CancelEdit(title) {
      return _extends({}, task, { editing: false, editingValue: '' });
    }
  }, action);
}

exports.default = { view: view, init: init, update: update, Action: Action };

},{"../../../snabbdom-jsx":19,"./constants":14,"./helpers":15,"union-type":13}],18:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /** @jsx html */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _snabbdomJsx = require('../../../snabbdom-jsx');

var _unionType = require('union-type');

var _unionType2 = _interopRequireDefault(_unionType);

var _helpers = require('./helpers');

var _constants = require('./constants');

var _task = require('./task');

var _task2 = _interopRequireDefault(_task);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// model : { nextID: Number, editingTitle: String, tasks: [task.model], filter: String }
var Action = (0, _unionType2.default)({
  Input: [String],
  Add: [String],
  Remove: [Number],
  Archive: [],
  ToggleAll: [_helpers.isBoolean],
  Filter: [String],
  Modify: [Number, _task2.default.Action]
});

function onInput(handler, e) {
  if (e.keyCode === _constants.KEY_ENTER) {
    handler(Action.Add(e.target.value));
  }
}

function view(_ref) {
  var model = _ref.model;
  var handler = _ref.handler;

  var remaining = remainingTodos(model.tasks);
  var filtered = filteredTodos(model.tasks, model.filter);

  return (0, _snabbdomJsx.html)(
    'section',
    { selector: '.todoapp' },
    (0, _snabbdomJsx.html)(
      'header',
      { selector: '.header' },
      (0, _snabbdomJsx.html)(
        'h1',
        null,
        'todos'
      ),
      (0, _snabbdomJsx.html)('input', {
        selector: '.new-todo',
        placeholder: 'What needs to be done?',
        value: model.editingTitle,
        'on-input': (0, _helpers.pipe)(_helpers.targetValue, Action.Input, handler),
        'on-keydown': (0, _helpers.bind)(onInput, handler) })
    ),
    (0, _snabbdomJsx.html)(
      'section',
      {
        selector: '.main',
        'style-display': model.tasks.length ? 'block' : 'none' },
      (0, _snabbdomJsx.html)('input', {
        selector: '.toggle-all',
        type: 'checkbox',
        checked: remaining === 0,
        'on-click': (0, _helpers.pipe)(_helpers.targetChecked, Action.ToggleAll, handler) }),
      (0, _snabbdomJsx.html)(
        'ul',
        { selector: '.todo-list' },
        filtered.map(function (task) {
          return (0, _snabbdomJsx.html)(TodoItem, { item: task, handler: handler });
        })
      )
    ),
    (0, _snabbdomJsx.html)(
      'footer',
      {
        selector: '.footer',
        'style-display': model.tasks.length ? 'block' : 'none' },
      (0, _snabbdomJsx.html)(
        'span',
        { classNames: 'todo-count' },
        (0, _snabbdomJsx.html)(
          'strong',
          null,
          remaining
        ),
        ' item',
        remaining === 1 ? '' : 's',
        ' left'
      ),
      (0, _snabbdomJsx.html)(
        'ul',
        { selector: '.filters' },
        (0, _snabbdomJsx.html)(
          'li',
          null,
          (0, _snabbdomJsx.html)(
            'a',
            { href: '#/', 'class-selected': model.filter === 'all' },
            'All'
          )
        ),
        (0, _snabbdomJsx.html)(
          'li',
          null,
          (0, _snabbdomJsx.html)(
            'a',
            { href: '#/active', 'class-selected': model.filter === 'active' },
            'Active'
          )
        ),
        (0, _snabbdomJsx.html)(
          'li',
          null,
          (0, _snabbdomJsx.html)(
            'a',
            { href: '#/completed', 'class-selected': model.filter === 'completed' },
            'Completed'
          )
        )
      ),
      (0, _snabbdomJsx.html)(
        'button',
        {
          classNames: 'clear-completed',
          'on-click': (0, _helpers.bind)(handler, Action.Archive()) },
        'Clear completed'
      )
    )
  );
}

var TodoItem = function TodoItem(_ref2) {
  var item = _ref2.item;
  var _handler = _ref2.handler;
  return (0, _snabbdomJsx.html)(_task2.default, {
    model: item,
    handler: function handler(action) {
      return _handler(Action.Modify(item.id, action));
    },
    onRemove: (0, _helpers.bind)(_handler, Action.Remove(item.id)) });
};

function init(handler) {
  window.addEventListener('hashchange', function (_) {
    return handler(Action.Filter(window.location.hash.substr(2) || 'all'));
  });

  return {
    nextID: 1,
    tasks: [],
    editingTitle: '',
    filter: 'all'
  };
}

function remainingTodos(tasks) {
  return tasks.reduce(function (acc, task) {
    return !task.done ? acc + 1 : acc;
  }, 0);
}

function filteredTodos(tasks, filter) {
  return filter === 'completed' ? tasks.filter(function (todo) {
    return todo.done;
  }) : filter === 'active' ? tasks.filter(function (todo) {
    return !todo.done;
  }) : tasks;
}

function addTodo(model, title) {
  return _extends({}, model, {
    tasks: [].concat(_toConsumableArray(model.tasks), [_task2.default.init(model.nextID, title)]),
    editingTitle: '',
    nextID: model.nextID + 1
  });
}

function removeTodo(model, id) {
  return _extends({}, model, {
    tasks: model.tasks.filter(function (taskModel) {
      return taskModel.id !== id;
    })
  });
}

function archiveTodos(model, id) {
  return _extends({}, model, {
    tasks: model.tasks.filter(function (taskModel) {
      return !taskModel.done;
    })
  });
}

function toggleAll(model, done) {
  return _extends({}, model, {
    tasks: model.tasks.map(function (taskModel) {
      return _task2.default.update(taskModel, _task2.default.Action.Toggle(done));
    })
  });
}

function modifyTodo(model, id, action) {
  return _extends({}, model, {
    tasks: model.tasks.map(function (taskModel) {
      return taskModel.id !== id ? taskModel : _task2.default.update(taskModel, action);
    })
  });
}

function update(model, action) {
  return Action.case({
    Input: function Input(editingTitle) {
      return _extends({}, model, { editingTitle: editingTitle });
    },
    Add: function Add(title) {
      return addTodo(model, title);
    },
    Remove: function Remove(id) {
      return removeTodo(model, id);
    },
    Archive: function Archive() {
      return archiveTodos(model);
    },
    ToggleAll: function ToggleAll(done) {
      return toggleAll(model, done);
    },
    Filter: function Filter(filter) {
      return _extends({}, model, { filter: filter });
    },
    Modify: function Modify(id, action) {
      return modifyTodo(model, id, action);
    }
  }, action);
}

exports.default = { view: view, init: init, update: update, Action: Action };

},{"../../../snabbdom-jsx":19,"./constants":14,"./helpers":15,"./task":17,"union-type":13}],19:[function(require,module,exports){
"use strict";

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

var SVGNS = 'http://www.w3.org/2000/svg';
var modulesNS = ['hook', 'on', 'style', 'class', 'props', 'attrs'];
var slice = Array.prototype.slice;

function isPrimitive(val) {
  return typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean' || (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'symbol' || val === null || val === undefined;
}

function normalizeAttrs(attrs, nsURI, defNS, modules) {
  var map = { ns: nsURI };
  for (var i = 0, len = modules.length; i < len; i++) {
    var mod = modules[i];
    if (attrs[mod]) map[mod] = attrs[mod];
  }
  for (var key in attrs) {
    if (key !== 'key' && key !== 'classNames' && key !== 'selector') {
      var idx = key.indexOf('-');
      if (idx > 0) addAttr(key.slice(0, idx), key.slice(idx + 1), attrs[key]);else if (!map[key]) addAttr(defNS, key, attrs[key]);
    }
  }
  return map;

  function addAttr(namespace, key, val) {
    var ns = map[namespace] || (map[namespace] = {});
    ns[key] = val;
  }
}

function buildFromStringTag(nsURI, defNS, modules, tag, attrs, children) {

  if (attrs.selector) {
    tag = tag + attrs.selector;
  }
  if (attrs.classNames) {
    var cns = attrs.classNames;
    tag = tag + '.' + (Array.isArray(cns) ? cns.join('.') : cns.replace(/\s+/g, '.'));
  }

  return {
    sel: tag,
    data: normalizeAttrs(attrs, nsURI, defNS, modules),
    children: children.map(function (c) {
      return isPrimitive(c) ? { text: c } : c;
    }),
    key: attrs.key
  };
}

function buildFromComponent(nsURI, defNS, modules, tag, attrs, children) {
  var res;
  if (typeof tag === 'function') res = tag(attrs, children);else if (tag && typeof tag.view === 'function') res = tag.view(attrs, children);else if (tag && typeof tag.render === 'function') res = tag.render(attrs, children);else throw "JSX tag must be either a string, a function or an object with 'view' or 'render' methods";
  res.key = attrs.key;
  return res;
}

function buildVnode(nsURI, defNS, modules, tag, attrs, children) {
  attrs = attrs || {};
  if (typeof tag === 'string') {
    return buildFromStringTag(nsURI, defNS, modules, tag, attrs, children);
  } else {
    return buildFromComponent(nsURI, defNS, modules, tag, attrs, children);
  }
}

function JSX(nsURI, defNS, modules) {
  return function jsxWithCustomNS(tag, attrs, children) {
    if (arguments.length > 3 || !Array.isArray(children)) children = slice.call(arguments, 2);
    return buildVnode(nsURI, defNS || 'props', modules || modulesNS, tag, attrs, children);
  };
}

module.exports = {
  html: JSX(undefined),
  svg: JSX(SVGNS, 'attrs'),
  JSX: JSX
};

},{}]},{},[16]);
