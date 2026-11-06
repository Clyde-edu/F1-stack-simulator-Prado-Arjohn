class Queue {
    constructor() {
        this.items = [];
    }

    // Add element to rear of queue
    enqueue(element) {
        this.items.push(element);
        return [element, this.items.length - 1];
    }

    // Remove and return front element
    dequeue() {
        if (this.isEmpty()) return undefined;
        let deleteItem = this.items.shift();
        console.log(`${deleteItem} removed from queue`);
        return deleteItem;
    }

    // Check front element without removing
    peek() {
        if (this.isEmpty()) return undefined;
        console.log(`Front element is ${this.items[0]}`);
        return this.items[0];
    }

    // Check if empty
    isEmpty() {
        return this.items.length === 0;
    }

    // Get queue size
    size() {
        return this.items.length;
    }

    // Clear queue
    clear() {
        this.items = [];
        console.log('Queue cleared..');
        return this.items;
    }
}

const queue = new Queue();

$(document).ready(function () {
    // Render an item visually into the queue container (Rear at bottom)
    function renderEnqueueVisual(value, index) {
        let bgClass = index % 2 === 0 ? 'bg-primary' : 'bg-success';
        $("#queue").append(`<div class="row ${bgClass} queue-item fs-5 m-0">${value}</div>`);
    }

    // Initial load simulation (100, 200, 300, 400)
    [100, 200, 300, 400].forEach((val) => {
        let res = queue.enqueue(val);
        renderEnqueueVisual(res[0], res[1]);
    });

    // Enqueue operation with input validation
    $("#enqueue-btn").click(function () {
        let val = $("#queue-input").val().trim();
        if (val === "") {
            alert("Please enter a value before calling Enqueue.");
            return;
        }
        let res = queue.enqueue(val);
        renderEnqueueVisual(res[0], res[1]);
        $("#queue-input").val("");
    });

    // Dequeue operation (FIFO: Removes from Front / Top visual)
    $("#dequeue-btn").click(function () {
        if (queue.isEmpty()) {
            alert("Cannot Dequeue: Queue is empty.");
            return;
        }
        let removedItem = queue.dequeue();
        
        // Remove the top item (front of the queue)
        $("#queue .queue-item").first().remove();

        // Display in deleted column
        $("#deleted-area").prepend(
            `<div class="row deleted-item text-bg-danger border border-light m-0">${removedItem}</div>`
        );
    });

    // Peek operation (Highlights front element)
    $("#peek-btn").click(function () {
        if (queue.isEmpty()) {
            alert("Cannot Peek: Queue is empty.");
            return;
        }
        let $frontItem = $("#queue .queue-item").first();
        let originalBg = $frontItem.hasClass("bg-primary") ? "bg-primary" : "bg-success";
        
        $frontItem.removeClass(`${originalBg}`).addClass("bg-warning text-dark");
        setTimeout(() => {
            $frontItem.removeClass("bg-warning text-dark").addClass(`${originalBg}`);
        }, 1200);
    });

    // Clear operation
    $("#clear-btn").click(function () {
        queue.clear();
        $("#queue").empty();
        $("#deleted-area").empty();
    });
});