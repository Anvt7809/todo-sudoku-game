export function clearSameNumberHighlight() {
    document.querySelectorAll(".same-number").forEach(el => {
        el.classList.remove("same-number");
    });
}
export function highlightSameNumbers(value) {
    if (!value)
        return;
    document.querySelectorAll("input").forEach(el => {
        const input = el;
        if (input.value === value) {
            input.classList.add("same-number");
        }
    });
}
