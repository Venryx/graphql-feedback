# GraphQL Feedback

Feedback (proposals + issues + roadmap) solution built using ReactJS, MobX, and GraphQL (Postgraphile/PostgreSQL).

Note: Library is not very modulized at this point; that is, it requires many specific libraries to already be in use in the parent project. Because of this, it's not yet recommended for use in third-party projects.

### Installation

```
npm install graphql-feedback --save-exact
```

The `--save-exact` flag is recommended, since this package uses [Explicit Versioning](https://medium.com/sapioit/why-having-3-numbers-in-the-version-name-is-bad-92fc1f6bc73c) (`Release.Breaking.FeatureOrFix`) rather than SemVer (`Breaking.Feature.Fix`).

To let npm increment `FeatureOrFix` (recommended), prepend "`~`" to its version in `package.json`. (for `Breaking`, prepend "`^`")

> Note: If you have this package symlinked (eg. `npm link graphql-feedback`) to a local version (eg. for custom modifications), make sure that `mobx-graphlink` is symlinked as well (from both the root project and your local copy of `graphql-feedback`), so they resolve to the same path. If this is forgotten, two instances of `mobx-graphlink` will be loaded, which will trigger a warning, and make `graphql-feedback` unable to function.