# How to run typescript files

## Install TypeScript

To run TypeScript files, you first need to install TypeScript globally on your system. You can do this using npm (Node Package Manager). Open your terminal and run the following command:

```bash
npm install --save-dev typescript
```

## Create tsconfig.json

You can create a `tsconfig.json` file to configure TypeScript options for your project. This file is optional but recommended. You can create it manually or generate it using the following command:

```bash
npx tsc --init
```

## Compile TypeScript Files

To compile TypeScript files into JavaScript, you can use the TypeScript compiler (`tsc`). If you have a single TypeScript file, you can compile it by running:

```bash
npx tsc
```
- This will compile all `.ts` files in the current directory according to the settings in `tsconfig.json`.
- It will create a folder named `dist` (or the folder specified in your `tsconfig.json`) containing the compiled JavaScript files.

If you want to compile a specific TypeScript file, you can run:

```bash
npx tsc app.ts
```
This will compile `app.ts` into `app.js` in the same directory.

## Run Compiled JavaScript Files

After compiling your TypeScript files, you can run the resulting JavaScript files using Node.js. For example, if you compiled `app.ts` into `app.js`, you can run it with:

```bash
node dist/app.js
```
## Run TypeScript Files Directly

If you want to run TypeScript files directly without compiling them first, you can use `ts-node`, which is a TypeScript execution engine for Node.js. You can install it globally or as a development dependency:

```bash

npm install --save-dev ts-node
```
Then, you can run your TypeScript files directly using:

```bash
npx ts-node app.ts
```

This will execute the TypeScript file without the need for a separate compilation step.


## OUTDIR E ROOTDIR

When compiling TypeScript files, you can specify the output directory for the compiled JavaScript files using the `--outDir` option in your `tsconfig.json` file. For example:

```json
{
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```
This configuration tells TypeScript to place the compiled JavaScript files in the `dist` directory and to treat the `src` directory as the root directory for your TypeScript source files. This helps keep your project organized by separating source files from compiled files.

## INCLUDE E EXCLUDE

You can also specify which files or directories to include or exclude from the compilation process in your `tsconfig.json` file. For example:

```json
{
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```



## Summary

## Whats TSC?

The TypeScript Compiler (TSC) is a command-line tool that compiles TypeScript files into JavaScript. It checks for type errors and converts TypeScript code into clean, readable JavaScript code that can run in any JavaScript environment, such as Node.js or web browsers.

## Whats TS-Node?

`ts-node` is a TypeScript execution engine for Node.js that allows you to run TypeScript files directly without the need for a separate compilation step. It compiles TypeScript code on-the-fly and executes it, making it convenient for development and testing.
