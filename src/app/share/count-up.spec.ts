import { parseCount } from './count-up';

describe('parseCount', () => {
  it('splits a number and its suffix', () => {
    expect(parseCount('18+')).toEqual({ prefix: '', target: 18, suffix: '+' });
  });

  it('keeps a prefix', () => {
    expect(parseCount('~5 años')).toEqual({ prefix: '~', target: 5, suffix: ' años' });
  });

  it('leaves non-numeric values untouched', () => {
    expect(parseCount('N/A')).toEqual({ prefix: '', target: null, suffix: 'N/A' });
  });
});
