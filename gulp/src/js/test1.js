(function () {
  function foo(num1, num2) {
    return num1 + num2
  }

  // console.log(foo(123, 24))  //未执行的函数在压缩的时候会被清除
})();