# components-kit

## to use stencil.js component
- config `outputTargets` in `stencil.config.ts` for your particular needs ([https://stenciljs.com/docs/output-targets](https://stenciljs.com/docs/output-targets))
- run `npm install` in `stencil-components` folder
- run `npm build` in `stencil-components` folder

## to use stencil.js component in the React.js app
- run `npm install` in `component-library-react` folder
- run `npm build` in `stencil-components` folder if you have not run it already
- run `npm link` in `stencil-components` folder 
- run `npm link stencil-components` in `component-library-react`folder 
- run `npm build` in `component-library-react` folder
- run `npm link` in `component-library-react` folder
- run `npm link component-library-react` in React.js app module
- import custom component in your app:
```aidl
import {StencilInput} from "component-library-react";
```
Read more about use of stencil.js components in React.js app on [https://stenciljs.com/docs/react](https://stenciljs.com/docs/react)