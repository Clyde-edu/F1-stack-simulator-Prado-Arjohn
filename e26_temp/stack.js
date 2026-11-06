class Stack {

    constructor() {
        this.items = [];
        this.count = 0;
    }

    // Add element to top of stack
    push(element) {
        this.items[this.count] = element;
        this.count++;

        return element;
    }

    // Remove top element
    pop() {

        if (this.count === 0) {
            return undefined;
        }

        let deleteItem = this.items[this.count - 1];

        this.items.pop();
        this.count--;

        return deleteItem;
    }

    // Check top element without removing it
    peek() {

        if (this.count === 0) {
            return undefined;
        }

        return this.items[this.count - 1];
    }

    // Check if stack is empty
    isEmpty() {
        return this.count === 0;
    }

    // Get stack size
    size() {
        return this.count;
    }

    // Print elements
    print() {
        return this.items.join(" ");
    }

    // Clear stack
    clear() {
        this.items = [];
        this.count = 0;

        return this.items;
    }
}


// Create stack object
const stack = new Stack();


// Display stack elements
function renderStack() {

    $("#stack").empty();

    // Display newest element at the top
    for (let i = stack.count - 1; i >= 0; i--) {

        $("#stack").append(`
            <div class="stack-item">
                ${$("<div>").text(stack.items[i]).html()}
            </div>
        `);

    }

}


// Display deleted elements
function renderDeleted(element) {

    $("#deleted").prepend(`
        <div class="deleted-item">
            ${$("<div>").text(element).html()}
        </div>
    `);

}


// Wait until document is ready
$(document).ready(function() {


    // PUSH OPERATION
    $("#push").click(function() {

        let value = $("#element").val().trim();

        if (value === "") {
            alert("Please enter a value!");
            return;
        }

        stack.push(value);

        renderStack();

        $("#element").val("");

    });


    // POP OPERATION
    $("#pop").click(function() {

        let deletedItem = stack.pop();

        if (deletedItem === undefined) {
            alert("Stack is empty!");
            return;
        }

        renderDeleted(deletedItem);

        renderStack();

    });


    // PEEK OPERATION
    $("#peek").click(function() {

        $(".stack-item").removeClass("highlight");

        let topItem = stack.peek();

        if (topItem === undefined) {
            alert("Stack is empty!");
            return;
        }

        $("#stack .stack-item:first").addClass("highlight");

    });


    // CLEAR OPERATION
    $("#clear").click(function() {

        stack.clear();

        // Clear stack display
        $("#stack").empty();

        // Clear deleted display
        $("#deleted").empty();

        // Clear input
        $("#element").val("");

    });


});