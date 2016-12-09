$(document).ready(function() {

  var listo = [];

  function Tasks(task) {
    this.task = task;
    this.id = 'new';
  }

  function addTask(task) {
    if(task) {
      var newTask = new Tasks(task);
      return listo.push(newTask);
    }
  }

});
