$(document).ready(function() {

  var listo = [];

  $('#newTaskForm').hide();
  $('#add-todo').click(function () {
    $('#newTaskForm').fadeToggle('fast', 'linear');//equivalent to show and hide
  })

  $('#cancel').on('click', function(e) {
    e.preventDefault();
    $('#newTaskForm').fadeToggle('fast', 'linear');
  })

  function Task(task) {
    this.task = task;
    this.id = 'new';
  }

  function addTask(task) {
    if(task) {
      var newTask = new Task(task);
      listo.push(newTask);

      $('#newItemInput').val("");

      $('#newList').append(
                        '<a href="#finish" class="" id="item">' +
                        '<li class="list-group-item">' +
                        '<h3>' + newTask.task + '</h3>'+
                        '<span class="arrow pull-right">' +
                        '<i class="glyphicon glyphicon-arrow-right">' +
                        '</span>' +
                        '</li>' +
                        '</a>'
                      );
    }
    console.log(newTask);
    $('#newTaskForm').slideToggle('fast', 'linear')
  }



  $('#saveNewItem').on('click', function(e) {
    e.preventDefault();
    var task = $('#newItemInput').val().trim();
    addTask(task);
  })



});
