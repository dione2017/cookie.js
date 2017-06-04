+ function (document, undefined) {
  if (!document) {
    console.error('document is not defined and cookie is unenable')
    return
  }
  var utils = {
    isArray: function (arr) {
      return ({}).toString.call(arr) === '[object Array]'
    },    
    isObject: function (obj) {
      return ({}).toString.call(obj) === '[object Object]'
    },
    isString: function (str) {
      return ({}).toString.call(str) === '[object String]'
    }
  }
  
  function Cookie () {}

  Cookie.prototype.get = function (skey) {
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(skey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null
  }    

  Cookie.prototype.set = function (skey, val, opts) {
    if (!skey && typeof skey !== 'string') {
      return false
    }
    var optStr = []
    if (utils.isObject(opts)) {
      if (opts.path && utils.isString(opts.path)) {
        optStr.push('path=' + opts.path)
      }
      if (opts.domain && utils.isString(opts.path)) {
        optStr.push('domain=' + opts.domain)
      }
      if (opts.secure && typeof opts.secure === 'boolean') {
        optStr.push('secure')
      }
      if (opts.expires && typeof opts.expires === 'number') {
        optStr.push('max-age=' + opts.expires)
      } else if (opts.expires) {
        optStr.push("expires=" + new Date(opts.expires).toUTCString())
      }
    }
    document.cookie = encodeURIComponent(skey) + '=' + encodeURIComponent(val) + ';' + optStr.join(';')
  }

  Cookie.prototype.getAll = function () {
    var cookie = document.cookie ? document.cookie.split(';') : []
    var cookies = {}
    var i = 0, len = cookie.length
    for (; i<len; i++) {
      var part = cookie[i].split('=')
      cookies[decodeURIComponent(part[0].trim())] = decodeURIComponent(part[1].trim())
    }
    return cookies
  }   

  Cookie.prototype.remove = function (skey) {
    if (!skey) {
      return false
    }
    skey = utils.isArray(skey) ? skey : [skey]
    for (var i = 0, len = skey.length; i<len; i++) {
      this.set(skey, '', {
        expires: -1
      })
    }
  } 

  Cookie.prototype.removeAll = function () {
    document.cookie = ''
  }

  if (typeof define === 'function' && define.amd) {
    define(function () {
      return {Cookie: new Cookie()}
    })
  } else if (typeof exports !== 'undefined') {
    exports.Cookie = new Cookie()
  } else {
    window.Cookie = new Cookie()
  }

}(document || undefined)
