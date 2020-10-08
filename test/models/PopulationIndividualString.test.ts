import Population from '../../src/models/Population';
import Invividual from '../../src/models/IndividualString';

describe('population with individual string', () => {
    it('can create a population', async () => {
        expect.hasAssertions();

        const size = 5;
        
        const individuals = [
          new Invividual(size),
          new Invividual(size),
          new Invividual(size),
        ];
        const population = new Population(individuals);

        expect(population !== null).toBe(true);
    });

    it('can create a random population', async () => {
      expect.hasAssertions();
      
      const size = 10;
      const population = new Population(null);

      population.createRandomPopulation(new Invividual(2), size);

      expect(population.getSize()).toBe(size);
    });

    it('can get fittest', async () => {
      expect.hasAssertions();

      const TARGET = 'hello';
      const individual = new Invividual(TARGET.length);
      const fitnessFunction = (individualP: Invividual) => {
        const size = individualP.getGenes().length;
        let fitness = 0;
  
        for (let i = 0; i < size; i++) {
          if (individualP.getGenes()[i] === TARGET[i]) {
            fitness += 1;
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
        (new Invividual(2)).createRandom(),
        (new Invividual(2)).createRandom(),
        (new Invividual(2)).createRandom(),
        (new Invividual(2)).createRandom(),
        (new Invividual(2)).createRandom(),
      ];

      const population = new Population(individuals);
      population.mutate(0.9);

      expect(population.getSize()).toBe(individuals.length);
    });

    it('can crossover', async () => {
      expect.hasAssertions();
      
      const individuals = [
        (new Invividual(2)).createRandom(),
        (new Invividual(2)).createRandom(),
        (new Invividual(2)).createRandom(),
        (new Invividual(2)).createRandom(),
        (new Invividual(2)).createRandom(),
        (new Invividual(2)).createRandom(),
      ];

      const population = new Population(individuals);
      const afterCrossover = population.crossOver();

      expect(afterCrossover.length).toBe(individuals.length * 1.5);
    });
});
