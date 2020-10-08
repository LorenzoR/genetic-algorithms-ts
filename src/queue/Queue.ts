export class Queue<T> {
    private elements: Array<T>;

    private size: number;

    public constructor() {
        this.elements = new Array<T>();
        this.size = 0;
    }

    public enqueue(element: T): T {
        this.elements.push(element);
        this.size += 1;
        return element;
    }

    public dequeue(): T {
        const element = this.elements.pop();
        this.size -= 1;
        return element;
    }

    public peek(): T {
        if (this.size) {
            return this.elements[this.size - 1];
        }

        return undefined;
    }

    public getSize(): number {
        return this.size;
    }
}
