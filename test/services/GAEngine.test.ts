import IndividualBitMatrix from '../../src/models/IndividualBitMatrix';
import { Matrix } from '../../src/models/Matrix';
import GAEngine from '../../src/services/GAEngine';

describe('genetic algorithm engine', () => {
  it('can run an engine', async () => {
    expect.hasAssertions();

    const GAResponse = GAEngine.run();
    const fittest = GAResponse.fittest; // population.getFittest(10);

    expect(GAResponse !== null).toBe(true);
    /*
    expect(fittest[0].getFitness(fittest[0])).toBeGreaterThanOrEqual(
      fittest[1].getFitness(fittest[1]),
    );
    */
    expect(GAResponse.epochs).toBe(300);
  });
});
