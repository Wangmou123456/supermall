export function debounce(func, delay = 500) {
  let timer = null;
  return function(...arg) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, arg);
    }, delay);
  };
}

// 正则表达式是 字符串匹配 利器(规则太多)
// 时间戳字符串格式化
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }

  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };

  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";

      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      );
    }
  }

  return fmt;
}

function padLeftZero(str) {
  // 思想巧妙
  return ("00" + str).substr(str.length);
}
