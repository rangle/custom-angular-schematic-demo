import { chain, Rule, SchematicContext, SchematicsException, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';


const printSourceRootRule = (projectName: string) => {
  return (tree: Tree, context: SchematicContext) => {
    const workspaceConfigBuffer = tree.read('angular.json');
    if ( !workspaceConfigBuffer ) {
      throw new SchematicsException('Not an Angular CLI workspace');
    }
    const projectSrcRoot = JSON.parse(workspaceConfigBuffer.toString())?.projects[projectName]?.sourceRoot;
    context.logger.info(`📝 printing project '${projectName}' source root is '${projectSrcRoot}'`);
    return tree;
  };
}

const addJestToDependencyRule = () => {
  return (tree: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask('jest'));
    return tree;
  };
}

const addTestScriptsRule = () => {
  return (tree: Tree, _context: SchematicContext) => {
    const packageJsonBuffer = tree.read('package.json');
    if(!packageJsonBuffer) {
      throw new SchematicsException('Package.json is not found');
    }
    const json = JSON.parse(packageJsonBuffer.toString());
    json.scripts.test = 'jest';
    tree.overwrite('package.json', JSON.stringify(json, null, 2));
    return tree;
  };
}

export function addLib(_options: any): Rule {
  const { project } = _options;
  return chain([
    printSourceRootRule(project),
    addTestScriptsRule(),
    addJestToDependencyRule(),
  ]);
}
