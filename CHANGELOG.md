# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.4] - 2020-06-19
### Changed
- Update the README with the correct link


## [0.3.3] - 2020-06-19
### Added
- Add a notification on editor start to notify the move to [VSpaceCode](https://github.com/VSpaceCode/VSpaceCode)

## [0.3.2] - 2020-06-15
### Added
- Add a mechanism to override default bindings incrementally.

## [0.3.1] - 2020-06-02
### Added
- Use `<spc> <spc>` to open command menu.
- Use `<spc> /` to find in files like grep.
- Replace `<spc> f f` with quick file open menu.
- Add support to run multiple commands in series.
- Add `<spc> f R` to rename the current file.
- Add `<spc> f o` to open the current doc with other editor.

### Fixed
- Fix the invisible space key in menu by replacing it with open box character `␣`.

### Changed
- Change open file/folder from `<spc> f f` to `<spc> f F`.

## [0.3.0] - 2020-05-24
### Added
- Add a welcome notification to guide user to install the space keybindings.
- Check the user's Vim settings on launch to ensure vim keybindings are set.

### Fixed
- Fix the issue where it cannot be use with Vim command such as `f <spc>` (#3).

### Changed
- Space key bindings are no longer added on installation to fix the bug (#3).


## [0.2.2] - 2020-05-23
### Fixed
- Fix an typo in an import statement that can cause the extension to not load on Linux (@Mazurel)

## [0.2.1] - 2020-05-19
### Changed
- Use `D` to run without debugging instead of `r`.
- Move format document action to file menu with `=` key.

## [0.2.0] - 2020-05-17
### Added
- Align the descriptions of the menu items.
- Add more actions in the window section.
### Changed
- Change the key bindings in the window section.

## [0.1.0] - 2020-05-17
### Changed
- Use one key binding to bind `space` key instead of four.

## [0.0.1] - 2020-05-16
### Added
- Initial release.
- Add an action menu triggered by space key that contains most of the basic common commands in the SPC menu.