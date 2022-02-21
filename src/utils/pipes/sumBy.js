const sumBy = (arr, func) => arr.reduce((acc, item) => acc + func(item), 0);
  
  export default sumBy;