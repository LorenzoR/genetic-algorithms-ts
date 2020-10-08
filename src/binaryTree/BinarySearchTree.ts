export class BinarySearchTree<T> {
    private value: T;

    private left: BinarySearchTree<T>;

    private right: BinarySearchTree<T>;

    public insert(element: T): void {
        if (!this.value) {
            this.value = element;
            this.left = new BinarySearchTree<T>();
            this.right = new BinarySearchTree<T>();
        } else {
            if (this.value > element) {
                return this.left.insert(element);
            } else if (this.value < element) {
                return this.right.insert(element);
            } else {
                throw new Error(`There is already an element with value ${element}`);
            }
        }
    }

    public find(key: T): boolean {
        if (this.value === key) {
            return true;
        } else if (this.value < key) {
            return this.right.find(key);
        } else {
            return this.left.find(key);
        }
    }
}
