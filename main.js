document.querySelector(".control-buttons span").onclick = () => {
    let yourName = prompt("Whats Your Name?");

    if (yourName == null || yourName == "") {
        document.querySelector(".name span").textContent = "Unknown";
    } else {
        document.querySelector(".name span").textContent = yourName;
    }

    document.querySelector(".control-buttons").remove();
}


// setTimeout(() => {
//     let pop = document.createElement("div")
//     pop.className = "pop";
//     pop.appendChild(document.createTextNode("STOOOOOP"))
//     document.body.appendChild(pop)
// }, 5000)


let duration = 1000;
let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children);
let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange)

blocks.forEach((block, index) => {
    block.style.order = orderRange[index]
    block.addEventListener("click", () => {
        flipBlock(block)
    })
})

function shuffle(array) {
    let current = array.length,
        temp,
        random;
    
    while (current > 0) {
        random = Math.floor(Math.random() * current);
        current--

        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
    }

    return array
}

function flipBlock(selectedBlock) {
    selectedBlock.classList.add("is-flipped");

    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains("is-flipped"));

    if (allFlippedBlocks.length === 2) {
        stopClicking()

        checkMatchedBlock(allFlippedBlocks[0], allFlippedBlocks[1])
    }
}

function checkMatchedBlock(firstBlock, secondBlock) {
    let triseElement = document.querySelector(".tries span");

    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");

        firstBlock.classList.add("has-match");
        secondBlock.classList.add("has-match");
    } else {
        triseElement.innerHTML = parseInt(triseElement.innerHTML) + 1;

        setTimeout(() => {
            firstBlock.classList.remove("is-flipped");
            secondBlock.classList.remove("is-flipped");
        }, duration)
    }
}

function stopClicking() {
    blocksContainer.classList.add("no-clicking");

    setTimeout(() => {
        blocksContainer.classList.remove("no-clicking");
    }, duration)
}