let highestZ = 1;

class DraggablePaper {
    holdingPaper = false;

    prevMouseX = 0;
    prevMouseY = 0;

    MouseX = 0;
    MouseY = 0;

    currentPaperX = 0;
    currentPaperY = 0;

    Init(paper) {
        // Ensure the paper is positioned absolutely
        paper.style.position = 'absolute';

        // Initial position of the paper
        this.currentPaperX = paper.offsetLeft;
        this.currentPaperY = paper.offsetTop;

        // Mouse Down - start dragging
        paper.addEventListener('mousedown', (e) => {
            // Only left mouse button
            if (e.button === 0) {
                this.holdingPaper = true;
                paper.style.zIndex = highestZ;
                highestZ += 1;

                // Capture the initial mouse position when dragging starts
                this.prevMouseX = e.pageX;
                this.prevMouseY = e.pageY;

                console.log('Started dragging at', this.prevMouseX, this.prevMouseY);

                // Prevent text selection or any other default behaviors
                e.preventDefault();
            }
        });

        // Mouse Move - dragging in progress
        document.addEventListener('mousemove', (e) => {
            if (this.holdingPaper) {
                // Get the current mouse position
                this.MouseX = e.pageX;
                this.MouseY = e.pageY;

                // Calculate the change in mouse position
                const deltaX = this.MouseX - this.prevMouseX;
                const deltaY = this.MouseY - this.prevMouseY;

                // Update the paper's position
                this.currentPaperX += deltaX;
                this.currentPaperY += deltaY;

                paper.style.left = `${this.currentPaperX}px`;
                paper.style.top = `${this.currentPaperY}px`;

                // Update the previous mouse position for the next move
                this.prevMouseX = this.MouseX;
                this.prevMouseY = this.MouseY;
            }
        });

        // Mouse Up - stop dragging
        window.addEventListener('mouseup', () => {
            if (this.holdingPaper) {
                console.log('Mouse button released');
                this.holdingPaper = false;
            }
        });
    }
}

// Initialize the papers
const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paperElement => {
    const draggablePaper = new DraggablePaper();
    draggablePaper.Init(paperElement);
});
