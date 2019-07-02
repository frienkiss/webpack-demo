"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var someValue = 'this is a string value';
var somelength = someValue.length;
var slength = someValue.length;
function createSquare(config) {
    var newSquare = { color: 'yellow', area: 100 };
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
console.log(createSquare({ width: 12 }));
var p1 = { x: 2, y: 3 };
// p1.x = 3;
p1.y = 4;
console.log(p1);
var Animal = /** @class */ (function () {
    function Animal() {
    }
    Animal.prototype.move = function (distance) {
        if (distance === void 0) { distance = 0; }
        console.log("animals moved " + distance + " m."); // 反引号 字符串模板？
    };
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    // move(distance: number = 0) {
    //     console.log(`animals moved ${distance} m.`);
    // } //数字索引类型“Animal”不能赋给字符串索引类型“Dog”
    function Dog(name) {
        var _this = _super.call(this) || this;
        _this.name = name;
        return _this;
    }
    Dog.prototype.bark = function () {
        console.log('Woof! ');
        //  console.log(`${this.name} 's age is ${this.age}`) //属性“age”为私有属性，只能在类“Animal”中访问
    };
    return Dog;
}(Animal));
var dog = new Dog('mimi');
dog.move(10);
dog.bark();
// 重写 重载
var myAdd = function (x, y) { return x + y; };
console.log(myAdd(1, 2));
var voidAdd = function (x, y) { var z = x + y; };


function hello(things) {
    console.log(this + 'says hello' + things)
}
console.log(hello('world'))
console.log(hello.call('bobo', 'world'))
console.log(hello.call(undefined, 'world'))
// console.log(hello.call(window, 'world'))
function hello2(things) {
    console.log('hello' + things)
}
hello2('world')
hello2.call('bobo', 'world')
hello2.call(undefined, 'world')
hello2.call(this, 'world')