import Population from '../../src/models/Population';
import IndividualBitMatrix from '../../src/models/IndividualBitMatrix';
import { Matrix } from '../../src/models/Matrix';

describe('population', () => {
    it('can create a population', async () => {
        expect.hasAssertions();
        
        const individuals = [
          new IndividualBitMatrix(2, 2),
          new IndividualBitMatrix(2, 2),
          new IndividualBitMatrix(2, 2),
        ];
        const population = new Population(individuals);

        expect(population !== null).toBe(true);
    });

    it('can create a random population', async () => {
      expect.hasAssertions();
      
      const size = 10;
      const population = new Population(null);

      population.createRandomPopulation(new IndividualBitMatrix(2, 2), size);

      expect(population.getSize()).toBe(size);
    });

    it('can get fittest', async () => {
      expect.hasAssertions();

      const individual = new IndividualBitMatrix(2, 2);
      const fitnessFunction = (individualP: IndividualBitMatrix) => {
        // const matrixSize = individual.getGenes().getSize();
        const matrixSize = individualP.getGenes().getSize();
        let fitness = 0;
  
        for (let i = 0; i < matrixSize.rows; i++) {
          for (let j = 0; j < matrixSize.cols; j++) {
            // if (individual.getGenes().get(i, j)) {
              if (individualP.getGenes().get(i, j)) {
              fitness += 1;
            }
          }
        }
  
        return fitness;
      };
  
      individual.setFitnessFunction(fitnessFunction);
      
      const individuals = [
        individual.createRandom(),
        individual.createRandom(),
        individual.createRandom(),
        individual.createRandom(),
        individual.createRandom(),
      ];

      const population = new Population(individuals);
      const fittest = population.getFittest(5);

      expect(fittest[0].getFitness()).toBeGreaterThanOrEqual(fittest[4].getFitness());
    });

    it('can mutate population', async () => {
      expect.hasAssertions();
      
      const individuals = [
        (new IndividualBitMatrix(2, 2)).createRandom(),
        (new IndividualBitMatrix(2, 2)).createRandom(),
        (new IndividualBitMatrix(2, 2)).createRandom(),
        (new IndividualBitMatrix(2, 2)).createRandom(),
        (new IndividualBitMatrix(2, 2)).createRandom(),
      ];

      const population = new Population(individuals);
      population.mutate(0.9);

      expect(population.getSize()).toBe(individuals.length);
    });

    it('can crossover', async () => {
      expect.hasAssertions();
      
      const individuals = [
        (new IndividualBitMatrix(2, 2)).createRandom(),
        (new IndividualBitMatrix(2, 2)).createRandom(),
        (new IndividualBitMatrix(2, 2)).createRandom(),
        (new IndividualBitMatrix(2, 2)).createRandom(),
        (new IndividualBitMatrix(2, 2)).createRandom(),
        (new IndividualBitMatrix(2, 2)).createRandom(),
      ];

      const population = new Population(individuals);
      const afterCrossover = population.crossOver();

      expect(afterCrossover.length).toBe(individuals.length * 1.5);
    });
});
