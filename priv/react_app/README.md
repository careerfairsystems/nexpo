##

Setup Prettier-eslint

### VS Code
1.  Install [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
2. Create (or update) a .vscode folder containing settings.json
3. Add the following
```JSON
{
// Format a file on save. A formatter must be available, the file must not be auto-saved, and editor must not be shutting down.
"editor.formatOnSave": true,
// Enable/disable default JavaScript formatter (For Prettier)
"javascript.format.enable": false,
// Use 'prettier-eslint' instead of 'prettier'. Other settings will only be fallbacks in case they could not be inferred from eslint rules.
"prettier.eslintIntegration": true
}
```
### Atom
1. Install [Prettier](https://atom.io/packages/prettier-atom)
2. Go to settings and check "eslint-integration"
3. (Optional) Turn on format on save in settings

## Flow

### Vs Code
1.  Install [Flow Language Support](https://marketplace.visualstudio.com/items?itemName=flowtype.flow-for-vscode)
2.  Create a .vscode folder containing settings.json
3.  Add:
   ```JSON
{
    "flow.useNPMPackagedFlow": true,
    "flow.runOnAllFiles": true
}
```

### Atom
1. Visit [Flow]( https://flow.org/en/docs/editors/atom/)
