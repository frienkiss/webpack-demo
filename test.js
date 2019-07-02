var num = 12
function foo() {
  console.log(this.num)
  console.log(num)  //全局变量 不在global里
}

// console.log(this.foo) //error foo不在global
(function () {
   
  this.num = 17 
 // console.log(this) // global
 foo()
})(); // ()相当于将function()声明当做函数表达式
(function(arg) {
  var num = 18
  arg()
})(foo)

foo()

var arr = ['1', '2', '3']
arr.forEach(item => {
    if(item == '2') {
    //    return  //跳过2
 
    }
    console.log(item)
})