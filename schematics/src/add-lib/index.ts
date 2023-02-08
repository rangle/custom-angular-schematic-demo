import { chain, Rule, SchematicContext, SchematicsException, Tree } from '@angular-devkit/schematics';

const printSourceRootRule = (projectName: string) => {
  return (tree: Tree, context: SchematicContext) => {
    const workspaceConfigBuffer = tree.read('angular.json');
    if ( !workspaceConfigBuffer ) {
      throw new SchematicsException('Not an Angular CLI workspace');
    }
    const projectSrcRoot = JSON.parse(workspaceConfigBuffer.toString())?.projects[projectName]?.sourceRoot;
    context.logger.info(`printing project ${projectName} source root is ${projectSrcRoot}`);
    return tree;
  };
}

export function addLib(_options: any): Rule {
  const { project } = _options;
  return chain([
    printSourceRootRule(project)
  ]);
}
