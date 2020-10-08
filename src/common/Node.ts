class Node<T> {
    private value: T;

    private next: Node<T>;

    public constructor(value: T) {
        this.value = value;
        this.next = null;
    }

    public getValue(): T {
        return this.value;
    }

    public getNext(): Node<T> {
        return this.next;
    }

    public setNext(node: Node<T>): void {
        this.next = node;
    }
}

export default Node;
