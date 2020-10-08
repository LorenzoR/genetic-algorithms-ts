import Node from '../common/Node';

export class LinkedList<T> {
    private head: Node<T>;

    private tail: Node<T>;

    private size: number;

    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    public add(element: T): T {
        if (!this.head) {
            // First element
            this.head = new Node(element);
            this.tail = this.head;
        } else {
            // Not first element
            let currentNode = this.head;

            while (currentNode.getNext()) {
                currentNode = currentNode.getNext();
            }

            const newElement = new Node(element);
            currentNode.setNext(newElement);
            this.tail = newElement;
        }

        this.size += 1;

        return element;
    }

    public addAtIndex(element: T, index: number): T {
        if (index > this.size || index < 0) {
            throw new Error(`IndexOutOfBoundsException: ${index}`);
        }

        if (index === 0) {
            return this.addFirst(element);
        }

        let currentNode = this.head;

        for (let i = 0; i < index - 1; i += 1) {
            currentNode = currentNode.getNext();
        }

        const nextNodeCopy = currentNode.getNext();

        const newNode = new Node(element);
        newNode.setNext(nextNodeCopy);

        currentNode.setNext(newNode);

        return element;
    }

    public addFirst(element: T): T {
        if (!this.head) {
            return this.add(element);
        } else {
            const headCopy = this.head;
            this.head = new Node(element);
            this.head.setNext(headCopy);

            this.size += 1;

            return element;
        }
    }

    public get(index: number): T {
        if (index > this.size || index < 0) {
            throw new Error(`IndexOutOfBoundsException: ${index}`);
        }

        let currentNode = this.head;

        for (let i = 0; i < index; i += 1) {
            currentNode = currentNode.getNext();
        }

        return currentNode.getValue();
    }

    public getFirst(): T {
        if (this.head) {
            return this.head.getValue();
        }

        // No elements
        return undefined;
    }

    public getLast(): T {
        if (this.tail) {
            return this.tail.getValue();
        }

        return undefined;
    }
}
