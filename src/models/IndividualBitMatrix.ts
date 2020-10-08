import Individual from './Individual';
import { Matrix } from './Matrix';

class IndividualBitMatrix extends Individual {
  private genes: Matrix<boolean>;

  private fitnessFunction: (individual: IndividualBitMatrix) => number;

  private fitness: number;

  public constructor(rows: number, cols: number) {
    super();
    this.genes = new Matrix<boolean>(rows, cols);
  }

  public static createFromGenes(genes: Matrix<boolean>): IndividualBitMatrix {
    const matrixSize = genes.getSize();
    const newIndividual = new IndividualBitMatrix(matrixSize.rows, matrixSize.cols);
    newIndividual.setGenes(genes);

    return newIndividual;
  }

  public createRandom(): IndividualBitMatrix {
    const matrixSize = this.genes.getSize();
    const newIndividual = new IndividualBitMatrix(matrixSize.rows, matrixSize.cols);
    const genes = new Matrix<boolean>(matrixSize.rows, matrixSize.cols);

    for (let i = 0; i < matrixSize.rows; i++) {
      for (let j = 0; j < matrixSize.cols; j++) {
        genes.insert(this.getRandomBoolean(), i, j);
      }
    }

    newIndividual.setGenes(genes);
    newIndividual.setFitnessFunction(this.fitnessFunction);

    return newIndividual;
  }

  /*
  public createRandom(): IndividualBitMatrix {
    const matrixSize = this.genes.getSize();

    for (let i = 0; i < matrixSize.rows; i++) {
      for (let j = 0; j < matrixSize.cols; j++) {
        this.genes.insert(this.getRandomBoolean(), i, j);
      }
    }

    return this;
  }
  */

  private getRandomBoolean(): boolean {
    return Math.random() < 0.5;
  }

  public getGenes(): Matrix<boolean> {
    return this.genes;
  }

  public setGenes(genes: Matrix<boolean>): void {
    this.genes = genes;
  }
  
  public getIndividual(): Individual {
    return this;
  }

  public setFitnessFunction(fitnessFunction: (individual: IndividualBitMatrix) => number) {
    this.fitnessFunction = fitnessFunction;
  }

  public getFitness(): number {
    this.fitness = this.fitnessFunction(this);
    return this.fitness;
  }

  public getFitnessBAK(individual: IndividualBitMatrix): number {
    this.fitness = this.fitnessFunction(individual);
    return this.fitness;
  }

  public getFitness2(): number {
    const matrixSize = this.genes.getSize();
    let fitness = 0;

    for (let i = 0; i < matrixSize.rows; i++) {
      for (let j = 0; j < matrixSize.cols; j++) {
        if (this.genes.get(i, j)) {
          fitness += 1;
        }
      }
    }

    return fitness;
  }

  public mutate(mutationProbability = 0.9): Individual {
    const matrixSize = this.genes.getSize();
    // const genesCopy: Matrix<boolean> = JSON.parse(JSON.stringify(this.genes));
    const genesCopy = Object.assign(new Matrix(matrixSize.rows, matrixSize.cols), JSON.parse(JSON.stringify(this.genes)));

    for (let i = 0; i < matrixSize.rows; i++) {
      for (let j = 0; j < matrixSize.cols; j++) {
        if (mutationProbability > Math.random()) {
          // Mutate
          const value = this.genes.get(i, j);
          genesCopy.insert(!value, i, j);
        }
      }
    }

    const mutant = IndividualBitMatrix.createFromGenes(genesCopy);
    mutant.setFitnessFunction(this.fitnessFunction);

    return mutant;
  }

  public crossOver(individual: IndividualBitMatrix, crossOverPointParam: { row: number; col: number } | null): IndividualBitMatrix[] {
    // TODO. Check sizes are the same

    // Single-point crossover
    // const parentGenes = IndividualBitMatrix.createFromGenes(individual.getGenes());
    const matrixSize = this.genes.getSize();
    const parentGenes = individual.getGenes();
    // BitSet[] offspring = new BitSet[2];
    const offspring = new Array(2);
    const crossOverPoint = crossOverPointParam ? crossOverPointParam : this.getRandomCrossOverPoint();

    offspring[0] = new Matrix<boolean>(matrixSize.rows, matrixSize.cols);
    offspring[1] = new Matrix<boolean>(matrixSize.rows, matrixSize.cols);

    for (let i = 0; i < matrixSize.rows; i++) {
      for (let j = 0; j < matrixSize.cols; j++) {
        if (i >= crossOverPoint.row && j >= crossOverPoint.col) {
          // Switch
          offspring[0].insert(parentGenes.get(i, j), i, j);
          offspring[1].insert(this.genes.get(i, j), i, j);
        } else {
          // Same
          offspring[0].insert(this.genes.get(i, j), i, j);
          offspring[1].insert(parentGenes.get(i, j), i, j);
        }
      }
    }

    const response: IndividualBitMatrix[] = new Array(2);

    response[0] = IndividualBitMatrix.createFromGenes(offspring[0]);
    response[0].setFitnessFunction(this.fitnessFunction);

    response[1] = IndividualBitMatrix.createFromGenes(offspring[1]);
    response[1].setFitnessFunction(this.fitnessFunction);

    return response;
}

  private getRandomCrossOverPoint(): { row: number; col: number } {
    const matrixSize = this.genes.getSize();
    return {
      row: Math.floor(Math.random() * matrixSize.rows),
      col: Math.floor(Math.random() * matrixSize.cols),
    }
  }

}

export default IndividualBitMatrix;
