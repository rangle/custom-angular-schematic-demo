import { strings } from '@angular-devkit/core';
import { apply, chain, externalSchematic, MergeStrategy, mergeWith, move, Rule, SchematicContext, template, Tree, url } from '@angular-devkit/schematics';

export function component(_options: any): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    // put a logger here to see our options
    _context.logger.info(JSON.stringify(_options) + ' params to generate our structure');

    const templateSource = apply(
      url('./files'), [
        template({
        ...strings,
        ..._options
      }),
        move('src/app'),
      ],
    );
    return chain([
      externalSchematic('@schematics/angular', 'component', _options),
      mergeWith(templateSource, MergeStrategy.Overwrite),
    ]);
  }
}
