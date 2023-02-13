# Custom Angular Schematics for Libraries

This is a demo repository for the blog post "How to Use Custom Schematics to Supercharge Developer Experience".

## Get Started

- Clone this repository
- Change to the `schematics` folder and run `npm install`
- Run `npm run build` to build the schematics, or run `npm run dev` to build the schematics on watch mode
- Run `npm link` in the `schematics` folder
- Change to the `demo-app` folder and run `npm install`
- Once the installation is complete, also run `npm link ds-schematics` to link the custom schematics to the demo app so that you can test the custom schematics on an Angular project

## Test Schematics on Demo App

## Test the `Component` Command

- Run `ng g ds-schematics:component --name=checkbox` to generate a standalone checkbox component

```bash
CREATE src/app/checkbox/checkbox.component.scss (0 bytes)
CREATE src/app/checkbox/checkbox.component.html (0 bytes)
CREATE src/app/checkbox/checkbox.component.spec.ts (613 bytes)
CREATE src/app/checkbox/checkbox.component.ts (263 bytes)
UPDATE src/app/app.module.ts (484 bytes)
```

## Test the `ng add` Command

- Run `ng g ds-schematics:ng-add`
- This command updates the npm script `test: jest` and install Jest as dependency

## FAQ

Q: I saw this error `An unhandled exception occurred: Collection "ds-schematics" cannot be resolved.` when I'm running the schematics commands

A: Run `npm link ds-schematics` in the `demo-app` folder again and should resolve this issue.
