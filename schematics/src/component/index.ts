import { strings } from '@angular-devkit/core';
import { apply, chain, externalSchematic, MergeStrategy, mergeWith, move, Rule, SchematicContext, SchematicsException, template, Tree, url } from '@angular-devkit/schematics';

export function component(options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info(JSON.stringify(options) + ' params to generate the component');
    const workspaceConfigBuffer = tree.read('angular.json');
    if ( !workspaceConfigBuffer ) {
      throw new SchematicsException('Not an Angular CLI workspace');
    }
    const project = JSON.parse(workspaceConfigBuffer.toString())?.projects[options.project];
    const sourceRoot = project?.sourceRoot;
    const prefix = project?.prefix;
    const defaultRoot = `${sourceRoot}/${prefix}`

    const templateSource = apply(
      url('./files'), [
        template({
        ...strings,
        ...options
      }),
        move(options.path || defaultRoot),
      ],
    );
    return chain([
      externalSchematic('@schematics/angular', 'component', {
        ...options,
        style: 'scss',
        skipImport: false,
      }),
      mergeWith(templateSource, MergeStrategy.Overwrite),
    ]);
  }
}
