# Installs UPX

This action installs [upx](https://upx.github.io/) which drastically decreases the size of executables.
It runs on all operating systems types offered by GitHub.

## Usage

```yaml
jobs:
  release:
    steps:
    - name: Install UPX
      uses: samyfodil/upx-action@v1
```

## Releasing and publishing

To release this Action:

- Bump version in `package.json`
- `npm update`
- `npm run all`
- `git commit -am <version>`
- `git tag -sm <version> <version>`
- `git push --follow-tags`
