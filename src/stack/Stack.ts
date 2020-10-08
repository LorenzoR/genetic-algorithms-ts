export class Stack<T> {
    private elements: Array<T>;

    private size: number;

    public constructor() {
        this.elements = new Array<T>();
        this.size = 0;
    }

    public push(element: T): T {
        this.size += 1;
        this.elements.push(element);

        return element;
    }

    public pop(): T {
        if (this.size) {
            const element = this.elements.pop();
            this.size -= 1;

            return element;
        }

        return undefined;
    }

    public getSize(): number {
        return this.size;
    }
}
