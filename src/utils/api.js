import Vue from 'vue'
const class2type = {};
// function (e, i)
'Boolean Number String Function Array Date RegExp Object Error'.split(' ').forEach(function (e) {
  class2type['[object ' + e + ']'] = e.toLowerCase();
});

function _typeof(obj) {
  if (obj == null)
    return String(obj);

  return typeof obj === 'object' || typeof obj === 'function' ?
    class2type[class2type.toString.call(obj)] || 'object' :
    typeof obj;
}

function asset(dat) {
  const _type = _typeof(dat);
  if (_type !== 'object') {
    return dat;
  }
  if (dat.err === 1) {
    Vue.$log.error(dat.msg, dat.trace || '');
    throw new Error(dat.msg);
  }
  return dat;
}


function define() {
  return {
    asset,
  }
}

export default {
  install: function (Vue) {
    Vue.prototype.$api = define();
  }
}
