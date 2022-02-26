import fs from 'fs'
import path from 'path'
import { wrapSource } from '../wrapper';


describe('Wrapper module', () => {
  describe('wrapSource', () => {
    for (const lang of ['js', 'ts']) {
      it('should wrap custom ' + lang + ' worker code inside a Worker class', () => {
        const src = fs.readFileSync(
          path.resolve(__dirname, 'code', 'myworker.js'),
          {encoding:'utf8', flag:'r'}
        );
        const desiredWrappedSrc = fs.readFileSync(
          path.resolve(__dirname, 'code', 'wrapped_result.' + lang),
          {encoding:'utf8', flag:'r'}
        );
        const wrappedSrc = wrapSource(src, lang == 'js' ? undefined : lang)
        expect(wrappedSrc).toEqual(desiredWrappedSrc)
      });
    }
  });
});
