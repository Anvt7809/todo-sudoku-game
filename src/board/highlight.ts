export function clearSameNumberHighlight(): void {
    document.querySelectorAll(".same-number").forEach(el => {
        el.classList.remove("same-number");
    });
}

export function highlightSameNumbers(value: string): void {
    if (!value) return;

    document.querySelectorAll("input").forEach(el => {
        const input = el as HTMLInputElement;
        if (input.value === value) {
            input.classList.add("same-number");
        }
    });
}