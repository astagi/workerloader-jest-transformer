import fs from 'fs'
import path from 'path'
import { stripImports } from '../stripper';


describe('Stripper module', () => {
  describe('stripImports', () => {
    it('should separate imports and code', () => {
      const src = fs.readFileSync(
        path.resolve(__dirname, 'code', 'myworker.js'),
        {encoding:'utf8', flag:'r'}
      );
      const strippedResult = stripImports(src)
      expect(strippedResult.code).toContain('workerHandler(\'data\')');
      expect(strippedResult.imports[0]).toBe('import workerHandler from \'./handlers\'');
    });
    it('should handle no imports correctly', () => {
      const src = fs.readFileSync(
        path.resolve(__dirname, 'code', 'myworker_noimport.js'),
        {encoding:'utf8', flag:'r'}
      );
      const strippedResult = stripImports(src)
      expect(strippedResult.code).toContain('workerHandler(\'data\')');
      expect(strippedResult.imports.length).toBe(0);
    });
  });
});
