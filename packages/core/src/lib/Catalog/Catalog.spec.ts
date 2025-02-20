import { clear, get, register } from './Catalog';

describe('Catalog', () => {
  beforeEach(() => {
    clear();
  });

  it('should register block', () => {
    const Title = () => null;

    register('Title', {
      component: Title,
    });

    expect(get('Title')).toBeTruthy();
  });

  it('should throw error if block is not registered', () => {
    expect(() => get('Title')).toThrow();
  });
});
