$(document).ready(function() {

    var listo = []; //first declare the arrat to push everything

    $('#newTaskForm').hide();

    function keep() {
        localStorage['listo'] = JSON.stringify(listo); //create a functon to save the array each stringify inthe localStorage
    }

    if (localStorage.getItem('listo')) {
        listo = JSON.parse(localStorage['listo']); // reset listo to be the array that was saved in the localStorage--- so when it refrea
        populateTodo();
    }


    function Task(task) {
        this.task = task;
        this.id = 'new'; //taking paramerter and creating and object
    }

    function addTask(task) {
        if (task) {
            task = new Task(task);
            listo.push(task);
            $('#newItemInput').val("");

            $('#newList').append(
              '<a href="#finish" class="" id="item">' +
              '<li class="list-group-item">' +
              '<p>' + task.task + '<p>' +
              '<span class="arrow pull-right">' +
              '<i class="glyphicon glyphicon-arrow-right">' +
              '</span>' +
              '</li>' +
              '</a>'
            );
          }
          keep(); //saving to entire array to local storage
          console.log(localStorage.getItem('listo'));
          // loval storage test
          $('#newTaskForm').slideToggle('fast', 'linear');

    }

    function advanceTask(task) {

        var modified = task.innerText.trim().toUpperCase();//setting everything to uppercase inorder to do condition

        for (var i = 0; i < listo.length; i++) {
            if (listo[i].task.toUpperCase() === modified) { //had to change to uppercase because the append had h3
                if (listo[i].id === 'new') {
                    listo[i].id = 'inProgress';
                    console.log(listo[i]['id']);
                } else if (listo[i].id === 'inProgress') {
                    listo[i].id = 'archived';

                } else {
                    listo.splice(i, 1);

                }
                keep();
                break;
            }
        }
        task.remove();
    }


    $('#add-todo').click(function() {
        $('#newTaskForm').fadeToggle('fast', 'linear'); //equivalent to show and hide
    })

    $('#cancel').on('click', function(e) {
        e.preventDefault();// cancel button to remove inpust
        $('#newTaskForm').fadeToggle('fast', 'linear');
    })

    $('#saveNewItem').on('click', function(e) {// onpun click initialize add tastk
        e.preventDefault();
        var task = $('#newItemInput').val().trim();
        addTask(task);

    })




    $(document).on('click', '#item', function(e) { //upon click advance task and change id
        e.preventDefault();

        var task = this;
        advanceTask(task); //this function advance id
        this.id = 'inProgress';
        $('#currentList').append(this.outerHTML);

    })

    $(document).on('click', '#inProgress', function(e) {
        e.preventDefault();
        var task = this;
        task.id = "archived";
        var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
        advanceTask(task);
        $('#archivedList').append(changeIcon);
    })

    $(document).on('click', '#archived', function(e) {
        e.preventDefault();
        var task = this;

        advanceTask(task);

    })

    function populateTodo() { //this to repopulate todo upon refreash or restart

        for (var i = 0; i < listo.length; i++) {

            if (listo[i].id === 'new') {
                $('#newList').append(
                    '<a href="#finish" class="" id="item">' +
                    '<li class="list-group-item">' +
                    '<p>' + listo[i].task + '</p  >' + //changed p so everything is not uppercase
                    '<span class="arrow pull-right">' +
                    '<i class="glyphicon glyphicon-arrow-right">' + '</span>' +
                    '</li>' + '</a>'
                )
            } else if (listo[i].id === 'inProgress') {
                $('#currentList').append(
                    '<a href="#finish" class="" id="inProgress">' +
                    '<li class="list-group-item">' +
                    '<p>' + listo[i].task + '</p  >' + //changed p so everything is not uppercase
                    '<span class="arrow pull-right">' +
                    '<i class="glyphicon glyphicon-arrow-right">' + '</span>' +
                    '</li>' + '</a>'
                )
            } else {
                $('#archivedList').append(
                    '<a href="#finish" class="" id="archived">' +
                    '<li class="list-group-item">' +
                    '<p>' + listo[i].task + '</p  >' + //changed p so everything is not uppercase
                    '<span class="arrow pull-right">' +
                    '<i class="glyphicon glyphicon-arrow-right">' + '</span>' +
                    '</li>' + '</a>'
                )
            }
        }
    }



});
