const App = function(name) {
  this.name = name
}

App.prototype.sayHi = function (){
  console.log(this.name)
}

const app = new App('byodian')
app.sayHi()

App.prototype.sayBye = function () {
  console.log('good bye', this.name)
}

app.sayBye()