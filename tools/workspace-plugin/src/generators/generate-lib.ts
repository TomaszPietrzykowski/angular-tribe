import {
    formatFiles,
    generateFiles,
    Tree,
} from '@nx/devkit';
import { libraryGenerator, UnitTestRunner } from '@nx/angular/generators';
import * as path from 'path';
import { GenerateLibGeneratorSchema } from './schema';

export async function generateLibGenerator(
    tree: Tree,
    options: GenerateLibGeneratorSchema
) {
    const libraryName = options.type === 'feature'
        ? options.name
        : `${options.type}-${options.name}`;

    const libraryDirectory = options.directory ? `libs/${options.directory}/${libraryName}` : `libs/${libraryName}`

    const importPath = `@angular-tribe/${libraryName}`;

    const testRunner = options.skipTests ? UnitTestRunner.None : UnitTestRunner.Jest;


    await libraryGenerator(tree, {
        name: libraryName,
        directory: libraryDirectory,
        tags: `type:${options.type}`,
        style: 'scss',
        buildable: true,
        linter: 'eslint',
        unitTestRunner: testRunner,
        importPath: importPath,
        simpleName: true,
        standalone: true,
        skipModule: true,
        skipTests: options.skipTests,
        flat: true,
        strict: true,
        publishable: false,
        setParserOptionsProject: true,
        skipPackageJson: false
    });

    generateFiles(tree, path.join(__dirname, 'files'), libraryDirectory, options);

    // remove README.md from library by default (consider parametrizing)
    const readmePath = `${libraryDirectory}/README.md`;
    if (tree.exists(readmePath)) {
        tree.delete(readmePath);
    }

    await formatFiles(tree);
}

export default generateLibGenerator;

