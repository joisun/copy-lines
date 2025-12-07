/**
 * A simple debounce function to prevent excessive firing of events.
 */
export function debounce(func: Function, wait: number) {
    let timeout: NodeJS.Timeout | undefined;
    return function (this: any, ...args: any[]) {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            timeout = undefined;
            func.apply(this, args);
        }, wait);
    };
}
