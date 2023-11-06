declare function setTimeout<A extends any[]>(callback: (...args: A) => void, timeout: number, ...args: A): number;
