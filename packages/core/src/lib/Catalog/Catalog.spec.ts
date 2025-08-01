import { clear, get, register, valid } from './Catalog';

describe('Catalog', () => {
  beforeEach(() => {
    clear();
  });

  describe('register', () => {
    it('should register block', () => {
      const Title = () => null;

      register('Title', {
        component: Title,
        props: {},
      });

      expect(get('Title')).toBeTruthy();
    });

    it('should throw error if block is not registered', () => {
      expect(() => get('Title')).toThrow();
    });
  });

  describe('valid', () => {
    it('should return true when all blocks are registered', () => {
      const Title = () => null;
      const Button = () => null;

      register('Title', {
        component: Title,
        props: {},
      });

      register('Button', {
        component: Button,
        props: {},
      });

      expect(valid(['Title', 'Button'])).toBe(true);
    });

    it('should return true for empty array', () => {
      expect(valid([])).toBe(true);
    });

    it('should return false when some blocks are not registered', () => {
      const Title = () => null;

      register('Title', {
        component: Title,
        props: {},
      });

      expect(valid(['Title', 'UnregisteredBlock'])).toBe(false);
    });

    it('should return false when no blocks are registered', () => {
      expect(valid(['UnregisteredBlock1', 'UnregisteredBlock2'])).toBe(false);
    });

    it('should return true for single registered block', () => {
      const Title = () => null;

      register('Title', {
        component: Title,
        props: {},
      });

      expect(valid(['Title'])).toBe(true);
    });

    it('should return false for single unregistered block', () => {
      expect(valid(['UnregisteredBlock'])).toBe(false);
    });
  });
});
