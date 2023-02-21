import { chain, Rule, SchematicContext, SchematicsException, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { getDefaultSourceRoot, getProject } from '../util/project';

const printSourceRootRule = (projectName: string) => {
  return (tree: Tree, context: SchematicContext) => {
    const project = getProject(tree, projectName);
    const projectSrcRoot = getDefaultSourceRoot(project);
    context.logger.info(`📝 printing project '${projectName}' source root is '${projectSrcRoot}'`);
    return tree;
  };
}

const addJestToDependencyRule = () => {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info(`Installing jest as dependency`);
    context.addTask(new NodePackageInstallTask({packageName: 'jest'}));
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
    addJestToDependencyRule(),
    addTestScriptsRule(),
  ]);
}
