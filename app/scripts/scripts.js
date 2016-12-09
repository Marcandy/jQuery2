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

  var advanceTask = function(task) {
  var modified = task.innerText.trim()
  for (var i = 0; i < listo.length; i++) {
    if (listo[i].task === modified) {
      if (listo[i].id === 'new') {
        listo[i].id = 'inProgress';
      } else if (listo[i].id === 'inProgress') {
        listo[i].id = 'archived';
      } else {
        listo.splice(i, 1);
      }
      break;
    }
  }
  task.remove();
};

  function addTask(task) {
    if(task) {
      task = new Task(task);
      listo.push(task);

      $('#newItemInput').val("");

      $('#newList').append(
                        '<a href="#finish" class="" id="item">' +
                        '<li class="list-group-item">' +
                        '<h3>' + task.task + '</h3>'+
                        '<span class="arrow pull-right">' +
                        '<i class="glyphicon glyphicon-arrow-right">' +
                        '</span>' +
                        '</li>' +
                        '</a>'
                      );
    }
    console.log(task);
    $('#newTaskForm').slideToggle('fast', 'linear')
  }



  $('#saveNewItem').on('click', function(e) {
    e.preventDefault();
    var task = $('#newItemInput').val().trim();
    addTask(task);
  })




$(document).on('click', '#item', function (e) {
  console.log(this);
  e.preventDefault();

  var task = this;

  advanceTask(task);
  this.id = 'inProgress';
  $('#currentList').append(this.outerHTML);
})

});
