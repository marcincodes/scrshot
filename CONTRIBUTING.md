## Publishing packages

```bash
yarn changeset
```

normal release

```bash
yarn changeset version
```

```bash
yarn changeset publish
```


or snapshot release

```bash
yarn changeset version --snapshot dev
```

```bash
yarn changeset publish --tag dev
```

## Packages aliases

- `build`
- `cli`
- `conf` (config)
- `core`
- `react`
- `react-native`

You can use `yarn [package alias] [command]` to have faster access to package command. Examples doesn't have aliases.
