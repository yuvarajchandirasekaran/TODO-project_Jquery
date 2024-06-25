$(document).ready(function () {
    let count = 1;

    // Error msg hide function
    function hideErr() {
        setTimeout(() => {
            $('.alert-msg').text('')
        }, 1000);
    }
    // Event listener for button click to add todo item
    $('#submit-btn').click(function (e) {
        $(this).text('Submit')
        const todoInput = $('#todo-input');
        const todoValue = todoInput.val().trim();

        if (todoValue === '') {
            $('.alert-msg').text('Please provide any value').css('color', 'red');
            hideErr()
        }
        else if ($('#update-id').val() !== '') {
            var updateId = $('#update-id').val();
            $(`.todotxt[data-target="${updateId}"]`).text(todoValue)
            $('#update-id').val('')
            todoInput.val('');
            $('.alert-msg').text('Successfully updated').css('color', 'green');
            hideErr()

        }
        else {
            const newTodoItem = createTodoItem(todoValue);
            $('.todo-items').append(newTodoItem);
            count++;
            $('.del-btn').off('click').on('click', deleteItem); // Binding click event for deletion
            $('.edit-btn').off('click').on('click', editItem); // Binding click event for edit item
            todoInput.val(''); // Clear input after adding todo item
            $('.alert-msg').text('Your Todo Item Added').css('color', 'green');
            hideErr()
        }
    });


    // Function to create todo item UI
    function createTodoItem(todoText) {
        const output = $(`<li class='relative rounded list-decimal border rounded border-green-500 mt-5 item'></li>`).attr('data-target', count);
        const todoTxt = $('<p class="w-96 truncate p-2 text-green-900 font-semibold todotxt"></p>').text(todoText).attr('data-target', count);
        const otherActions = $('<div class="absolute top-3 right-3 flex gap-4 float-right"></div>');
        const delBtn = $('<i class="fa-solid fa-trash text-red-500 cursor-pointer del-btn"></i>').attr('data-target', count);
        const editBtn = $('<i class="fa-solid fa-pencil text-yellow-400 cursor-pointer edit-btn"></i>').attr('data-target', count);

        otherActions.append(editBtn, delBtn);
        output.append(todoTxt, otherActions);

        return output;
    }

    // Event listener for input focus using keypress
    $('#todo-input').on('keypress', function () {
        if ($(this).is(':focus')) {
            hideErr()
            // Perform actions when the input is focused
        }
    });

    // Function to handle deletion of a todo item
    function deleteItem() {
        const itemId = $(this).data('target');
        // console.log(itemId);
        if (itemId % 2 == 0) {
            $(`.item[data-target="${itemId}"]`).animate({ right: '50px', opacity: '0.8' }).fadeOut();
        }
        else {
            $(`.item[data-target="${itemId}"]`).animate({ left: '50px', opacity: '0.8' }).fadeOut();
        }
        $('.alert-msg').text('Successfully deleted').css('color', 'red');
        hideErr()
    }

    //function to handle editing of a todo item
    function editItem() {
        const itemId = $(this).data('target');
        const editItemText = $(`.item[data-target="${itemId}"]`).text().trim();
        $('#submit-btn').text('Update')
        $('#todo-input').val(editItemText);
        $('#update-id').val(itemId);
    }


});
