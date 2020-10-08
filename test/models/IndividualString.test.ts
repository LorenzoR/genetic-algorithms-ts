import IndividualString from '../../src/models/IndividualString';

describe('individual string', () => {
    it('can create an individual', async () => {
        expect.hasAssertions();

        const individualString = new IndividualString(2);

        expect(individualString !== null).toBe(true);
    });

    it('can create a random individual', async () => {
      expect.hasAssertions();

      const individualString = new IndividualString(2);
      const randomIndividual = individualString.createRandom();

      expect(randomIndividual !== null).toBe(true);
    });

    it('can get genes from a random individual', async () => {
      expect.hasAssertions();

      const individualString = new IndividualString(2);
      const randomIndividual = individualString.createRandom();
      const genes: string[] = randomIndividual.getGenes();

      expect(genes.length).toBe(2);
    });

    it('can return same genes if mutate probabiliy is 0', async () => {
      expect.hasAssertions();

      const individualBitMatrix = new IndividualString(2);
      const randomIndividual = individualBitMatrix.createRandom();
      const mutant = randomIndividual.mutate(0);
      const genes: string[] = randomIndividual.getGenes();
      const mutatedGenes: string[] = mutant.getGenes();

      expect(mutatedGenes).toStrictEqual(genes);
    });

    it('can flips all genes if mutate probabiliy is 1', async () => {
      expect.hasAssertions();

      const size = 2;
      const individualBitMatrix = new IndividualString(size);
      const randomIndividual = individualBitMatrix.createRandom();
      const mutant = randomIndividual.mutate(1);
      const genes: string[] = randomIndividual.getGenes();
      const mutatedGenes: string[] = mutant.getGenes();

      for (let i = 0; i < size; i++) {
        expect(mutatedGenes[i] === genes[i]).toBe(false);
      }
    });

    it('can do a crossover with crossover point at (0)', async () => {
      expect.hasAssertions();

      const size = 2;
      const individualBitMatrix = new IndividualString(size);
      const parents = [
        individualBitMatrix.createRandom(),
        individualBitMatrix.createRandom(),
      ];

      const children = parents[0].crossOver(parents[1], 0);

      expect(children[0].getGenes()).toStrictEqual(parents[1].getGenes());
      expect(children[1].getGenes()).toStrictEqual(parents[0].getGenes());
    });

    it('can do a crossover with crossover point at (size)', async () => {
      expect.hasAssertions();

      const size = 2;
      const individualBitMatrix = new IndividualString(size);
      const parents = [
        individualBitMatrix.createRandom(),
        individualBitMatrix.createRandom(),
      ];

      const children = parents[0].crossOver(parents[1], size);

      expect(children[0].getGenes()).toStrictEqual(parents[0].getGenes());
      expect(children[1].getGenes()).toStrictEqual(parents[1].getGenes());
    });

    it('can do a crossover with crossover point at some middle point', async () => {
      expect.hasAssertions();

      const size = 2;
      const individualBitMatrix = new IndividualString(size);
      const parents = [
        individualBitMatrix.createRandom() as IndividualString,
        individualBitMatrix.createRandom() as IndividualString,
      ];

      const children = parents[0].crossOver(parents[1], 1) as IndividualString[];

      const childrenGenes = [
        children[0].getGenes(),
        children[1].getGenes(),
      ];

      expect(childrenGenes[0][0]).toBe(parents[0].getGenes()[0]);
      expect(childrenGenes[1][0]).toBe(parents[1].getGenes()[0]);
      expect(childrenGenes[0][1]).toBe(parents[1].getGenes()[1]);
      expect(childrenGenes[1][1]).toBe(parents[0].getGenes()[1]);
    });
});
