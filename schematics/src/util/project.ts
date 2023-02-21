import { Tree, SchematicsException } from "@angular-devkit/schematics";

/** Returns the project object from the angular.json file based on project name
 * @param tree - The virtual file system tree
 * @param projectName - The name of the project
 * @returns The project object from angular.json
 */
export function getProject(tree: Tree, projectName: string) {
  if (!projectName) {
    throw new SchematicsException('Option (project) is required.');
  }
  const workspaceConfigBuffer = tree.read('angular.json');
  if (!workspaceConfigBuffer) {
    throw new SchematicsException('Not an Angular CLI workspace');
  }
  const workspaceConfig = JSON.parse(workspaceConfigBuffer.toString());
  const project = workspaceConfig?.projects[projectName];
  if (!project) {
    throw new SchematicsException('Project is not defined in this workspace');
  }
  return project;
}

/** Returns the default source root for the project 
 * @param project - The project object from angular.json
 * @returns The default source root for the project
*/
export function getDefaultSourceRoot (project: any): string {
  const sourceRoot = project?.sourceRoot || 'src';
  const prefix = project?.prefix || 'app';
  return `${sourceRoot}/${prefix}`;
}

