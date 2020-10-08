import { LinkedList } from '../src';

describe('linked list', () => {
    it('can create linked list', async () => {
        expect.hasAssertions();

        const linkedList = new LinkedList();

        expect(linkedList !== null).toBe(true);
    });

    it('can add element', async () => {
        expect.hasAssertions();

        const newElement = 1;

        const linkedList = new LinkedList();
        const response = linkedList.add(newElement);

        expect(response).toBe(newElement);
    });

    it('can get first element', async () => {
        expect.hasAssertions();

        const newElement = 1;

        const linkedList = new LinkedList();
        linkedList.add(newElement);

        const response = linkedList.getFirst();

        expect(response).toBe(newElement);
    });

    it('can get undefined when getting first element if there are no elements', async () => {
        expect.hasAssertions();

        const linkedList = new LinkedList();

        const response = linkedList.getFirst();

        expect(response).toBe(undefined);
    });

    it('can get undefined when getting last element if there are no elements', async () => {
        expect.hasAssertions();

        const linkedList = new LinkedList();

        const response = linkedList.getLast();

        expect(response).toBe(undefined);
    });

    it('can get last element', async () => {
        expect.hasAssertions();

        const lastElement = 1;

        const linkedList = new LinkedList();
        linkedList.add(1);
        linkedList.add(lastElement);

        const response = linkedList.getLast();

        expect(response).toBe(lastElement);
    });

    it('can add two elements', async () => {
        expect.hasAssertions();

        const firstElement = 1;
        const lastElement = 2;

        const linkedList = new LinkedList();
        linkedList.add(firstElement);
        linkedList.add(lastElement);

        expect(linkedList.getFirst()).toBe(firstElement);
        expect(linkedList.getLast()).toBe(lastElement);
    });

    it('can add three elements', async () => {
        expect.hasAssertions();

        const elements = [1, 2, 3];

        const linkedList = new LinkedList();
        linkedList.add(elements[0]);
        linkedList.add(elements[1]);
        linkedList.add(elements[2]);

        expect(linkedList.getFirst()).toBe(elements[0]);
        expect(linkedList.getLast()).toBe(elements[2]);
    });

    it('can add first element', async () => {
        expect.hasAssertions();

        const elements = [1, 2, 3];
        const firstElement = 10;

        const linkedList = new LinkedList();
        linkedList.addFirst(elements[0]);

        expect(linkedList.getFirst()).toBe(elements[0]);

        linkedList.add(elements[1]);
        linkedList.add(elements[2]);
        linkedList.addFirst(firstElement);

        expect(linkedList.getFirst()).toBe(firstElement);
        expect(linkedList.getLast()).toBe(elements[2]);
    });

    it('can add element at index 0', async () => {
        expect.hasAssertions();

        const elements = [1, 2, 3];
        const elementAtIndex = 10;
        const index = 0;

        const linkedList = new LinkedList();
        linkedList.add(elements[0]);
        linkedList.add(elements[1]);
        linkedList.add(elements[2]);

        linkedList.addAtIndex(elementAtIndex, index);

        expect(linkedList.getFirst()).toBe(elementAtIndex);
        expect(linkedList.getLast()).toBe(elements[2]);
    });

    it('can add element at index 1', async () => {
        expect.hasAssertions();

        const elements = [1, 2, 3];
        const elementAtIndex = 10;
        const index = 1;

        const linkedList = new LinkedList();
        linkedList.addFirst(elements[0]);
        linkedList.add(elements[1]);
        linkedList.add(elements[2]);

        linkedList.addAtIndex(elementAtIndex, index);

        expect(linkedList.getFirst()).toBe(elements[0]);
        expect(linkedList.getLast()).toBe(elements[2]);
        expect(linkedList.get(index)).toBe(elementAtIndex);
    });

    it('can add element at index 2', async () => {
        expect.hasAssertions();

        const elements = [1, 2, 3];
        const elementAtIndex = 10;
        const index = 2;

        const linkedList = new LinkedList();
        linkedList.add(elements[0]);
        linkedList.add(elements[1]);
        linkedList.add(elements[2]);

        linkedList.addAtIndex(elementAtIndex, index);

        expect(linkedList.getFirst()).toBe(elements[0]);
        expect(linkedList.getLast()).toBe(elements[2]);
        expect(linkedList.get(index)).toBe(elementAtIndex);
    });

    it('throws exception when adding with wrong index', async () => {
        expect.hasAssertions();

        const elementAtIndex = 10;
        const index = 20;

        const linkedList = new LinkedList();

        expect(() => linkedList.addAtIndex(elementAtIndex, index)).toThrow('IndexOutOfBoundsException: 20');
    });

    it('throws exception when getting with wrong index', async () => {
        expect.hasAssertions();

        const index = 20;

        const linkedList = new LinkedList();

        expect(() => linkedList.get(index)).toThrow('IndexOutOfBoundsException: 20');
    });
});
