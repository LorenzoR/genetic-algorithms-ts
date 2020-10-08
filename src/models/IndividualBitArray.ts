import Individual from './Individual';

class IndividualBitArray extends Individual {
  createRandom(): Individual {
    throw new Error("Method not implemented.");
  }
  getGenes() {
    throw new Error("Method not implemented.");
  }
  getIndividual(): Individual {
    throw new Error("Method not implemented.");
  }
  getFitness(): number {
    throw new Error("Method not implemented.");
  }
  mutate(): Individual {
    throw new Error("Method not implemented.");
  }
  crossOver(individual: Individual): Individual[] {
    throw new Error("Method not implemented.");
  }

}

export default IndividualBitArray;
