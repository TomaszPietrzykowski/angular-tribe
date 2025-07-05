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
    const libraryName = options.type === 'data'
        ? 'data'
        : options.type === 'feature'
            ? options.name
            : `${options.type}-${options.name}`;

    const libraryDirectory = options.directory ? `libs/${options.directory}/${libraryName}` : `libs/${libraryName}`


    const importPath = `@angular-tribe/${libraryName}`;

    await libraryGenerator(tree, {
        name: libraryName,
        directory: libraryDirectory,
        tags: `type:${options.type}`,
        style: 'scss',
        buildable: true,
        linter: 'eslint',
        unitTestRunner: UnitTestRunner.Jest,
        importPath: importPath,
        simpleName: true,
        strict: true,
        publishable: false,
        setParserOptionsProject: true,
        skipPackageJson: false
    });

    generateFiles(tree, path.join(__dirname, 'files'), libraryDirectory, options);
    await formatFiles(tree);
}

export default generateLibGenerator;

