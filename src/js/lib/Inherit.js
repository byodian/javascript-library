// function SuperType() {
//   this.colors = ['red', 'blue', 'green'];
// }

// function SubType() {}
// SubType.prototype = new SuperType();

// let instance1 = new SubType();
// instance1.colors.push('black');
// console.log(instance1.colors);

// let instance2 = new SubType();
// console.log(instance2.colors);

// 盗用构造函数
// 对象伪装 经典继承

/**
 *  优点 
 *  可以在子类构造函数中向父类构造函数传参
 * 
 * 缺点（使用构造函数模式自定义类型的问题）
 * 必须在构造函数中定义方法，因此函数不能重用,
 * 子类也不能访问父类原型上定义的方法
 */
// function SuperType() {
//   this.colors = ['red', 'blue', 'green'];
// }

// function SubType() {
//   SuperType.call(this);
// }

// let instance1 = new SubType();
// instance1.colors.push('black');
// console.log(instance1.colors);

// let instance2 = new SubType();
// console.log(instance2.colors);

// function SuperType(name) {
//   this.name = name;
// }

// function SubType() {
//   SuperType.call(this, 'Nicholas');
//   this.age = 29;
// }

// let instance = new SubType();
// console.log(instance.name);
// console.log(instance.age);

// 组合继承,伪经典继承 - 综合原型链和盗用构造函数
// 使用原型链继承原型上的属性和方法，而通过盗用
// 构造函数继承实例属性
// 这样既可以把方法定义在原型上以实现重用，又可以
// 让每个实例都有自己的属性

// 组合继承弥补了原型链和盗用构造函数的不足，是 JavaScript 中
// 使用最多的继承模式。
// 组合继承也保留了 instanceof 操作符和 isPrototypeOf()
// 方法识别合成对象的能力

// 缺点：
// 效率问题。父类构造函数会被调用两次，一次是在创建子类原型时调用
// 一次是在子类构造函数中调用。
// function SuperType(name) {
//   this.name = name;
//   this.colors = ['red', 'blue', 'green'];
// }

// SuperType.prototype.sayName = function () {
//   console.log(this.name);
// }

// function SubType(name, age) {
//   SuperType.call(this, name);

//   this.age = age;
// }

// SubType.prototype = new SuperType();
// SubType.prototype.sayAge = function () {
//   console.log(this.age);
// }

// let instance1 = new SubType('Nicholas', 29);
// instance1.colors.push('black');
// console.log(instance1.colors);
// instance1.sayName();
// instance1.sayAge();

// let instance2 = new SubType('Greg', 27);
// console.log(instance2.colors);
// instance2.sayName();
// instance2.sayAge();

// 原型式继承
// 不涉及严格意义上构造函数的继承方式
// 即使不定义类型也可以通过原型实现对象之间的信息共享

// 适用情况：
// 你有一个对象，想在它的基础上在创建一个新对象。
// 你需要把这个对象先传给 object()，然后再对返回的对象进行适当的修改。
// 这种方法实际上是克隆对象，本质上是对传入对象执行一次浅复制。

// ES5 新增方法 Object.create() 方法将原型式继承的概念规范化。
// 接受两个参数：作为新对象原型的对象，以及新对象定义额外属性的对象

// 原型式继承费非常适合不需要单独创建构造函数，但仍然需要在对象间共享信息的场合。
// 但属性中包含的引用值始终会在相关对象间共享，跟使用原型模式是一样的。
// function object (o) {
//   function F() {}
//   F.prototype = o;
//   return new F();
// }

// let person = {
//   name: 'Nicholas',
//   friends: ['shelby', 'court', 'van']
// }

// let anotherPerson = object(person);
// console.log(anotherPerson.name);
// anotherPerson.name = 'Griea'
// anotherPerson.friends.push('rob');

// let yetAnotherPerson = object(person);
// yetAnotherPerson.name = "Linda";
// yetAnotherPerson.friends.push("Barbie");

// console.log(person.friends);
// console.log(anotherPerson)

// 寄生式继承 寄生构造函数和工厂模式
// 创建一个实现继承的函数，以某种方式增强对象，然后返回这个对象。
// 适合主要关注对象，而不关注类型和构造函数的创景
// Object() 函数不是必须的，任何返回新对象的函数都可以在这里使用
// 通过寄生式继承给对象添加函数会导致函数难以重用，与构造函数模式蕾西
// function createAnother(original) {
//   let clone = Object(original); // 调用函数创建一个新对象
//   clone.sayHi = function () {   // 以某种方式增强这个对象
//     console.log('hi');
//   }

//   return clone;
// }

// let person = {
//   name: 'Nicholas',
//   friends: ['shelby', 'court', 'van']
// }

// let anotherPerson = createAnother(person);
// anotherPerson.sayHi();

// 寄生式组合继承
function inheritPrototype(subType, superType) {
  let prototype = Object(superType.prototype);
  prototype.constructor = SubType;
  subType.prototype = prototype;
}

function SuperType(name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}

SuperType.prototype.sayName = function () {
  console.log(this.name);
}

function SubType (name, age) {
  SuperType.call(this, name);
  this.age = age;
}

inheritPrototype(SubType, SuperType);

SubType.prototype.sayAge = function () {
  console.log(this.age);
}