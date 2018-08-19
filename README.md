# <https://moody.io>

This site builds with jekyll and is hosted on github pages.

## Building

```
bundle install
bundle exec jekyll build
```

Serving locally

```
bundle exec jekyll serve --watch
```
>This will serve the site at <http://127.0.0.1:4000/>. Jekyll will watch for changes in pages and the assets directory and rebuild the site if found. Manually refresh your browser to see the changes.

Serving locally with gulp
```
gulp
```

>This will run gulp tasks for compiling less etc and serve the site using `jekyll serve`. It should auto-open your browser to <http://localhost:4000/>. Your browser will auto refresh when *any* changes are made, including changes to the less files.
