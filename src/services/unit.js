const unit = {
  // 百分比
  percent: (val, options = {rate: '%', fixed: 2, mult: true}) => {
    val = val * 1;
    if (isNaN(val)) {
      return '';
    }
    let value = val;
    if (options.mult) {
      value = val * 100;
    }
    return `${value.toFixed(options.fixed || 2)}${options.rate || '%'}`;
  },
  // 格式化货币
  currency: (val, options = {prefix: '¥', fixed: 2}) => {
    let money = val * 1;
    if (isNaN(money)) {
      if (typeof val === 'string') {
        return val;
      }
      // money = 0
      return '';
    }
    return `${options.prefix}${money.toFixed(options.fixed || 2)}`;
  },
  // 对象数组去重--对对象中某个属性的值进行去重
  objectArrayReduce(arr, key) {
    // arr 当前数组  key-要去重的对象属性
    let hash = {};
    const newArr = arr.reduce((item, next) => {
      !hash[next[key]] && (hash[next[key]] = true && item.push(next));
      return item;
    }, []);
    return newArr;
  },
};

module.exports = unit;
