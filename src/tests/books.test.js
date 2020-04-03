import { getListPage } from '../core/data/books';

describe('Books use cases', () => {
  it('generate list pages 2a to 4a', () => {
    const pages = getListPage([2, 'a'], [4, 'a']);
    expect(pages).toEqual(['2a', '2b', '3a', '3b', '4a']);
  });

  it('generate list pages 2b to 4a', () => {
    const pages = getListPage([2, 'b'], [4, 'a']);
    expect(pages).toEqual(['2b', '3a', '3b', '4a']);
  });

  it('generate list pages 2b to 4b', () => {
    const pages = getListPage([2, 'b'], [4, 'b']);
    expect(pages).toEqual(['2b', '3a', '3b', '4a', '4b']);
  });

  it('generate list pages 2a to 4b', () => {
    const pages = getListPage([2, 'a'], [4, 'b']);
    expect(pages).toEqual(['2a', '2b', '3a', '3b', '4a', '4b']);
  });
});
