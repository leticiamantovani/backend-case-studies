# How to run tests with TypeScript

# To run tests with TypeScript, you need to set up your project with Jest and ts-jest. Here are the steps:

1. **Install Dependencies**: Make sure you have `jest`, `ts-jest`, and `@types/jest` installed in your project. You can do this by running:

   ```bash
   npm install --save-dev jest ts-jest @types/jest
   ```

   - why save on dev? Because these are development dependencies used for testing and not needed in production.

2. **Configure Jest**: Create a `jest.config.js` file in the root of your project with the following content:

   ```javascript    
    const { createDefaultPreset } = require('ts-jest');

    const tsJestTransformCfg = createDefaultPreset().transform;

    /** @type {import("jest").Config} */
    module.exports = {
      preset: 'ts-jest',
      testEnvironment: 'node',
      transform: {
        ...tsJestTransformCfg,
      },
    };
    ```

    - It will be in CommonJS because Jest uses CommonJS by default, but you can also use ES modules if you prefer. Just ensure your `tsconfig.json` is set up to handle ES modules.
    - its preferred to use commonjs because Jest is built on CommonJS, and it ensures compatibility with the Jest ecosystem.

3. **Create a TypeScript Configuration**: Ensure you have a `tsconfig.json` file in your project root. It should look something like this:
