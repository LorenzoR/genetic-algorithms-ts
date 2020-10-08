import Population from '../models/Population';
import IndividualInterface from '../models/Individual';
import Individual from '../models/IndividualBitMatrix';

interface RunResponse {
  epochs: number;
  fittest: IndividualInterface[],
  fitness: number;
}

interface RunOptions {
  epochs?: number;
  initialPopulation?: number;
  mutationProbability?: number;
}

class GAEngine {
  private static NUMBER_OF_EPOCHS = 300;
  private static INITIAL_POPULATION = 40;
  private static MUTATION_PROBABILITY = 0.1;

  public static run(optionsP: RunOptions = {}): RunResponse {
    let epochs = 0;
    const individuals = [];
    const response: RunResponse = {
      epochs: 0,
      fittest: [] as IndividualInterface[],
      fitness: 0
    };
    const options: RunOptions = {
      epochs: optionsP.epochs || GAEngine.NUMBER_OF_EPOCHS,
      initialPopulation: optionsP.initialPopulation || GAEngine.INITIAL_POPULATION,
      mutationProbability: optionsP.mutationProbability || GAEngine.MUTATION_PROBABILITY,
    };

    const individual = new Individual(4, 4);
    const fitnessFunction = (anIndividual: Individual) => {
      // const matrixSize = individual.getGenes().getSize();
      const matrixSize = anIndividual.getGenes().getSize();
      let fitness = 0;

      for (let i = 0; i < matrixSize.rows; i++) {
        for (let j = 0; j < matrixSize.cols; j++) {
          if (anIndividual.getGenes().get(i, j)) {
            fitness += 1;
          }
        }
      }

      return fitness;
    };

    individual.setFitnessFunction(fitnessFunction);

    for (let i = 0; i < options.initialPopulation; i++) {
      const newRandom = individual.createRandom();
      individuals.push(newRandom);
    }

    // Create initial population
    const population = new Population(individuals);

    while (epochs < options.epochs) {
      epochs += 1;
      // console.log(`Epoch: ${epochs}`);

      // Apply fitness function to each individual and select fitest
      population.setFittest(options.initialPopulation / 2);

      // Crossover
      population.crossOver();

      // Mutation
      population.mutate(options.mutationProbability);

      // Get fittest for that epoch
      const fittestPerEpoch = population.getFittest(options.initialPopulation);

      response.epochs += 1;
      response.fittest.push(fittestPerEpoch[0]);
      response.fitness = fittestPerEpoch[0].getFitness();
    }

    const fittest = population.getFittest(options.initialPopulation);

    console.log(fittest);

    population.setIndividuals(fittest);

    // return population;
    return response;
  }
}

export default GAEngine;
