import { string, number, func } from "prop-types";

let someValue: string = 'this is a string value'
let somelength: number = (<string>someValue).length


let slength: number = (someValue as string).length

interface SquareConfig  {
    color?: string;
    width?: number;
}
function createSquare(config: SquareConfig): {color: string; area: number} {
    let newSquare = {color: 'yellow', area: 100}
    if(config.color) {
        newSquare.color = config.color
    }
    if(config.width) {
        newSquare.area = config.width * config.width
    }
    return newSquare
}
console.log(createSquare({width: 12}))

// 只读属性
interface Point {  
    readonly x: number;
    y: number
}
let p1: Point = {x: 2, y: 3}
// p1.x = 3;
p1.y = 4
console.log(p1)

class Animal {
    name: string;
    private age: number;
    move(distance: number = 0) {
        console.log(`animals moved ${distance} m.`); // 反引号 字符串模板？
    }
}

class Dog extends Animal {
    name: string;
    // move(distance: number = 0) {
    //     console.log(`animals moved ${distance} m.`);
    // } //数字索引类型“Animal”不能赋给字符串索引类型“Dog”
    constructor(name: string) {
        super()
        this.name = name
    }
    bark() {
        console.log('Woof! ')
      //  console.log(`${this.name} 's age is ${this.age}`) //属性“age”为私有属性，只能在类“Animal”中访问
    }
}

interface NotOkay {
    [x: number]: Animal;
    // [x: string]: Dog
    // [y: string]: Animal;
    // [z: number]: Animal
}
let dog = new Dog('mimi')
dog.move(10)
dog.bark()

// 重写 重载

let myAdd: (x: number, y: number) => number = function (x: number, y: number): number {return x+y}


let voidAdd: (x:number, y: number) => void = function (x: number, y: number) {let z = x+y} 



// readonly
interface MyHeart {
    readonly  you: String
}
let heart: MyHeart = {you: 'bendan'}
//heart.you = 'pig'

// 额外属性
interface SquareConfig2 {
    color?: string;
    width?: number;
    [propName: string]: any   //字符串索引签名，类型必须是string or number
}

// 接口表示函数类型
interface MyFunctionType {
    (source: string, substring: string): boolean
}
let myfunc: MyFunctionType
myfunc = function(source: string, substring: string) {
    let result = source.search(substring)
    return result > -1
}
// search() ok=> 起始索引  not => -1

myfunc = (src: string, sub: string) => {
    let result = src.search(sub)
    return result > -1
}
myfunc = (src, sub) => {
    let res = src.search(sub)
    return res > -1
}

// extends / implements 接口

interface ClockConstructor {
    new (hour: number, minute: number): ClockConstructor;
}
class Clock implements ClockConstructor {
    currentTime: Date;
    constructor(h: number, m: number) { }
}

// 抽象类
abstract class Animal {
    abstract makeSound(): void;
    move(): void {
        console.log('mark')
    }
}

abstract class DepartMent {
    constructor(public name: string) {  // => 相当于this.name = name 利用了参数属性  参数属性通过给构造函数参数前面添加一个访问限定符来声明

    }
    printName(): void{
        console.log('this department name is' + this.name)
    }
    abstract printMeeting(): void;
}
class AccountDepartMent extends DepartMent {
    constructor() {
        super('Acounnting...')
    }
    printMeeting(): void {
        console.log('account meeting')
    }
    printAccount(): void {
        console.log('account print')
    }
}
let department: DepartMent // 允许创建抽象类型的引用
//department = new DepartMent() //不允许创建抽象类的实例
department = new AccountDepartMent(); //抽象子类
department.printName()
department.printMeeting()
//department.printAccount()

console.log(typeof Clock)
let DepartMentMark: typeof DepartMent = DepartMent

// 泛型 => 创建可重用组件
function indentify<T>(arg: T): T {
    return arg
}
let myindentify: <T>(arg: T) => T = indentify
let myindentify2: {<T>(arg: T): T} = indentify // 等价
//  泛型接口
interface myfirstIndentify {
    <T>(arg: T): T
}
let myindentify3: myfirstIndentify = indentify
let output = indentify<string>('mystring')
// or
let output2 = indentify('mystring') // 类型推断


function indentifyOrLenght<T>(arg: T): T {
    console.log(arg.length)
    return arg
}
function indentifyArray<T>(arg: T[]): T[] {
    console.log(arg.length);
    return arg;
}

// => 约束T有length才行
// 泛型约束
interface lengthNum {
    length: number
}
function indentifyLength<T extends lengthNum>(arg: T): T {
    console.log(arg.length)
    return arg;
}

interface Bird {
    fly();
    layEggs();
}

interface Fish {
    swim();
    layEggs();
}
function getSmallPat(): Bird | Fish {
    //...
}
let pet = getSmallPat() // pet是联合类型, 只能访问联合类型里所有类型共有的成员  layEggs()
pet.swim()
pet.layEggs()
//类型保护与类型区分
// => 使用类型断言
let pet2 = getSmallPat()
if((<Fish>pet2).swim) {
    (<Fish>pet2).swim()
} else {
    (<Bird>pet2).fly()
}