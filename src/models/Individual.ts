abstract class Individual {
  abstract createRandom(): Individual;
  abstract getGenes(): any;
  abstract getIndividual(): Individual;
  // abstract getFitness(individual: Individual): number;
  abstract getFitness(): number;
  abstract mutate(mutationProbability: number): Individual;
  abstract crossOver(individual: Individual, crossOverPoint: any): Individual[];
}

export default Individual;