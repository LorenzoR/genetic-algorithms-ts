import Individual from './Individual';

class Population<T extends Individual> {
  private size: number;

  private individuals: Individual[];

  public constructor(individuals: Individual[]) {
    this.individuals = individuals;
    this.size = individuals ? individuals.length : 0;
  }

  public getSize(): number {
    return this.size;
  }

  public setIndividuals(individuals: Individual[]) {
    this.individuals = individuals;
  }

  public createRandomPopulation(individual: Individual, size: number) {
    this.size = size;
    this.individuals = [];

    for (let i = 0; i < this.size; i++) {
      this.individuals.push(individual.createRandom());
    }
  }

  public setFittest(count: number): void {
    this.individuals = this.getFittest(count);
    this.size = this.individuals.length;
  }

  public getFittest(count: number): Individual[] {
    return this.sortByFittest().slice(0, Math.min(count, this.size));
  }

  private sortByFittest(): Individual[] {
    this.individuals.sort((a: Individual, b: Individual) => {
      return b.getFitness() - a.getFitness();
    })

    return this.individuals;
  }

  public crossOver(): Individual[] {
    const afterCrossover = [];

    for (let i = 0; i < this.size; i += 2) {
        if (this.size > (i + 2)) {
            const offspring = this.individuals[i].crossOver(this.individuals[i+1], null);
            afterCrossover.push(this.individuals[i]);
            afterCrossover.push(this.individuals[i+1]);
            afterCrossover.push(offspring[0]);
            afterCrossover.push(offspring[1]);
        } else {
            afterCrossover.push(this.individuals[i]);
        }
    }

    this.individuals = afterCrossover;
    this.size = afterCrossover.length;
    
    return afterCrossover;
  }

  public mutate(mutationProbability: number): Individual[] {
      const afterMutation = [];

      for (let i = 0; i < this.size; i++) {
          afterMutation.push(this.individuals[i].mutate(mutationProbability));
      }

      this.individuals = afterMutation;

      return afterMutation;
  }
}

export default Population;