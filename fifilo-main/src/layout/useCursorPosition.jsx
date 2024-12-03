import { useEffect } from 'react';

const useCursorPosition = (className) => {
    useEffect(() => {
        const elements = document.querySelectorAll(`.${className}`);

        const cursorOffset = function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            this.style.setProperty("--cursor-x", x + "px");
            this.style.setProperty("--cursor-y", y + "px");
        };

        elements.forEach(element => {
            element.addEventListener("mousemove", cursorOffset);
        });

        // Cleanup
        return () => {
            elements.forEach(element => {
                element.removeEventListener("mousemove", cursorOffset);
            });
        };
    }, [className]);
};

export default useCursorPosition;
