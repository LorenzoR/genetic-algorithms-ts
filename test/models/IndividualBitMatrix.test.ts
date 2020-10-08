import IndividualBitMatrix from '../../src/models/IndividualBitMatrix';
import { Matrix } from '../../src/models/Matrix';

describe('individual bit matrix', () => {
    it('can create an individual', async () => {
        expect.hasAssertions();

        const individualBitMatrix = new IndividualBitMatrix(2, 2);

        expect(individualBitMatrix !== null).toBe(true);
    });

    it('can create a random individual', async () => {
      expect.hasAssertions();

      const individualBitMatrix = new IndividualBitMatrix(2, 2);
      const randomIndividual = individualBitMatrix.createRandom();

      expect(randomIndividual !== null).toBe(true);
    });

    it('can get genes from a random individual', async () => {
      expect.hasAssertions();

      const individualBitMatrix = new IndividualBitMatrix(2, 2);
      const randomIndividual = individualBitMatrix.createRandom();
      const genes: Matrix<boolean> = randomIndividual.getGenes();

      expect(genes.getSize()).toStrictEqual({ rows: 2, cols: 2 });
    });

    it('can return same genes if mutate probabiliy is 0', async () => {
      expect.hasAssertions();

      const individualBitMatrix = new IndividualBitMatrix(2, 2);
      const randomIndividual = individualBitMatrix.createRandom();
      const mutant = randomIndividual.mutate(0);
      const genes: Matrix<boolean> = randomIndividual.getGenes();
      const mutatedGenes: Matrix<boolean> = mutant.getGenes();

      expect(mutatedGenes).toStrictEqual(genes);
    });

    it('can flips all genes if mutate probabiliy is 1', async () => {
      expect.hasAssertions();

      const matrixSize = { rows: 2, cols: 2 };
      const individualBitMatrix = new IndividualBitMatrix(2, 2);
      const randomIndividual = individualBitMatrix.createRandom();
      const mutant = randomIndividual.mutate(1);
      const genes: Matrix<boolean> = randomIndividual.getGenes();
      const mutatedGenes: Matrix<boolean> = mutant.getGenes();

      for (let i = 0; i < matrixSize.rows; i++) {
        for (let j = 0; j < matrixSize.cols; j++) {
          expect(mutatedGenes.get(i, j)).toBe(!genes.get(i, j));
        }
      }
    });

    it('can do a crossover with crossover point at (0,0)', async () => {
      expect.hasAssertions();

      const matrixSize = { rows: 2, cols: 2 };
      const individualBitMatrix = new IndividualBitMatrix(matrixSize.rows, matrixSize.cols);
      const parents = [
        individualBitMatrix.createRandom(),
        individualBitMatrix.createRandom(),
      ];

      const children = parents[0].crossOver(parents[1], { row: 0, col: 0 });

      expect(children[0].getGenes()).toStrictEqual(parents[1].getGenes());
      expect(children[1].getGenes()).toStrictEqual(parents[0].getGenes());
    });

    it('can do a crossover with crossover point at (rows,cols)', async () => {
      expect.hasAssertions();

      const matrixSize = { rows: 2, cols: 2 };
      const individualBitMatrix = new IndividualBitMatrix(matrixSize.rows, matrixSize.cols);
      const parents = [
        individualBitMatrix.createRandom(),
        individualBitMatrix.createRandom(),
      ];

      const children = parents[0].crossOver(parents[1], { row: matrixSize.rows, col: matrixSize.cols });

      expect(children[0].getGenes()).toStrictEqual(parents[0].getGenes());
      expect(children[1].getGenes()).toStrictEqual(parents[1].getGenes());
    });

    it('can do a crossover with crossover point at some middle point', async () => {
      expect.hasAssertions();

      const matrixSize = { rows: 2, cols: 2 };
      const individualBitMatrix = new IndividualBitMatrix(matrixSize.rows, matrixSize.cols);
      const parents = [
        individualBitMatrix.createRandom() as IndividualBitMatrix,
        individualBitMatrix.createRandom() as IndividualBitMatrix,
      ];

      const children = parents[0].crossOver(parents[1], { row: 1, col: 1 }) as IndividualBitMatrix[];

      const childrenGenes = [
        children[0].getGenes(),
        children[1].getGenes(),
      ];

      expect(childrenGenes[0].get(0, 0)).toBe(parents[0].getGenes().get(0, 0));
      expect(childrenGenes[1].get(0, 0)).toBe(parents[1].getGenes().get(0, 0));
      expect(childrenGenes[0].get(1, 1)).toBe(parents[1].getGenes().get(1, 1));
      expect(childrenGenes[1].get(1, 1)).toBe(parents[0].getGenes().get(1, 1));
    });
});
