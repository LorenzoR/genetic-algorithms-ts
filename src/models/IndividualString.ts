import Individual from './Individual';

class IndividualString extends Individual {
  private genes: string[];

  private fitnessFunction: (individual: IndividualString) => number;

  private fitness: number;

  public constructor(size: number) {
    super();
    this.genes = new Array<string>(size);
  }

  public setGenes(genes: string[]): void {
    this.genes = genes;
  }

  public static createFromGenes(genes: string[]): IndividualString {
    const newIndividual = new IndividualString(genes.length);
    newIndividual.setGenes(genes);

    return newIndividual;
  }

  public createRandom(): Individual {
    const newIndividual = new IndividualString(this.genes.length);
    newIndividual.setGenes(this.createRandomString(this.genes.length));
    newIndividual.setFitnessFunction(this.fitnessFunction);

    return newIndividual;
  }

  private createRandomString(length: number): string[] {
    const result = new Array<string>(length);
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    
    for (let i = 0; i < length; i++ ) {
      result[i] = characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  public getGenes() {
    return this.genes;
  }

  public getIndividual(): Individual {
    return this;
  }

  public setFitnessFunction(fitnessFunction: (individual: IndividualString) => number) {
    this.fitnessFunction = fitnessFunction;
  }

  public getFitness(): number {
    this.fitness = this.fitnessFunction(this);
    return this.fitness;
  }

  public mutate(mutationProbability: number): Individual {
    // Swap Mutation
    const mutatedIndividual = [ ...this.genes ];
    const individualStr = '';

    for (let i = 0; i < mutatedIndividual.length; i += 1) {
        if (mutationProbability > Math.random()) {
          mutatedIndividual[i] = this.createRandomString(1)[0];
        }
    }

    const mutant = IndividualString.createFromGenes(mutatedIndividual);
    mutant.setFitnessFunction(this.fitnessFunction);

    return mutant;
  }

  public crossOver(individual: Individual, crossOverPointParam: number): Individual[] {
    // Uniform crossover
    const parentGenes = individual.getGenes();
    const offspring = new Array<string[]>(2);
    const crossOverPoint = crossOverPointParam || crossOverPointParam === 0 ?
      crossOverPointParam : this.getRandomCrossOverPoint();

    offspring[0] = new Array<string>(this.genes.length);
    offspring[1] = new Array<string>(this.genes.length);

    for (let i = 0; i < parentGenes.length; i++) {
        if (i >= crossOverPoint) {
            offspring[0][i] = parentGenes[i];
            offspring[1][i] = this.genes[i];
        } else {
            offspring[0][i] = this.genes[i];
            offspring[1][i] = parentGenes[i];
        }
    }

    const response: IndividualString[] = new Array(2);

    response[0] = IndividualString.createFromGenes(offspring[0]);
    response[0].setFitnessFunction(this.fitnessFunction);

    response[1] = IndividualString.createFromGenes(offspring[1]);
    response[1].setFitnessFunction(this.fitnessFunction);

    return response;
  }

  private getRandomCrossOverPoint(): number {
    return Math.floor(Math.random() * this.genes.length);
  }

}

export default IndividualString;
