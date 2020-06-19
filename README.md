This extension is moved to [VSpaceCode]( https://github.com/VSpaceCode/VSpaceCode) to benefit a larger community. This extension will no longer receive any update.

### Migration
If you are currently using this extension, you can uninstall this extension `spacecode` and install `VSpaceCode`

If you have any custom bindings/settings in the `settings.json`, you can also move them by renaming the key after the installation of `VSpaceCode`.

`spacecode.checkVimConfig` -> `vspacecode.checkVimConfig`

`spacecode.bindings` -> `vspacecode.bindings`

`spacecode.bindingOverrides` -> `vspacecode.bindingOverrides`

#### Vim Users
Update the command name in `settings.json` from `spacecode.space` to `vspacecode.space` like as follow
```json
"vim.normalModeKeyBindingsNonRecursive": [
  {
    "before": ["<space>"],
    "commands": ["vspacecode.space"]
  }
],
"vim.visualModeKeyBindingsNonRecursive": [
  {
    "before": ["<space>"],
    "commands": ["vspacecode.space"]
  }
]
```
#### Non-Vim Users
Update the command name in `keybindings.json` from `spacecode.space` to `vspacecode.space` like as follow
```json
{
  "key": "alt+space",
  "command": "vspacecode.space",
  "when": "editorTextFocus"
}
```
