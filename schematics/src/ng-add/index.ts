import { chain, schematic, Rule } from '@angular-devkit/schematics';

export function ngAdd(_options: any): Rule {
  return chain([
        schematic('add-lib', _options),
  ]);
}
