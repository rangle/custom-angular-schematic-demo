import { strings, normalize } from '@angular-devkit/core';
import { apply, chain, externalSchematic, MergeStrategy, mergeWith, move, Rule, SchematicContext, template, Tree, url } from '@angular-devkit/schematics';
import { getDefaultSourceRoot, getProject } from '../util/project';

/** When users run the `ng g ds-schematics:component` command, the Angular CLI will execute this `component` function.
 * Generates a standalone component or a component that is part of an ngNodule.
 * Option `project` determines the default path for the component. 
 * For example, if the `project` is set to `my-lib`, the default path will be `projects/my-lib/src/lib`.
*/
export function component(options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info(JSON.stringify(options) + ' params to generate the component');
    const project = getProject(tree, options.project);
    const componentTemplates = options.standalone ? 'standalone-component' : 'component';

    if (options.path === undefined) {
      options.path = getDefaultSourceRoot(project);
    }

    // Create a template source from the ejs template files in the `files` directory.
    // Pass in the options (such as name) to the template function to replace the placeholders with the values from the options.
    // Pass in the strings utility to the template function to convert strings to formats such as dasherize, classify, etc.
    const templateSource = apply(
      url(`./files/${componentTemplates}`), [
        template({
        ...strings,
        ...options
      }),
        // Move the generated files to the designated path when the schematic is applied.
        move(normalize(options.path)),
      ],
    );
    // Chain multiple rules together and execute them one after the other.
    // First the `externalSchematic` method generates a component using the Angular CLI schematic.
    // Then the `mergeWith` method merges the files generated from the templateSource with the files generated from the Angular CLI schematic.
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
