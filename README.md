# Scrshot - create up-to-date application screenshots

## Demo

https://github.com/Perfect7M/scrshot/assets/5896181/695ee9ef-422f-40c3-8542-15c58e35139e

## How does it works?

A developer uses a Scrshot component called ScrshotArea on the page where we need a screenshot. This way it's marking an area for that screenshot.

Next, it defines the config application URL, pages, background, rounded corners, etc.
Finally, run the `scrshot dev` command that will take screenshots for all defined pages and save them in the destination folder.

Then use them in your docs. When someone changes e.g., button text changes will be reflected on the screenshot automatically!


## Usage

0. Install dependency

Using npm:

```bash
npm install  @scrshot/cli @scrshot/react @scrshot/build --save-dev
```

Using yarn:

```bash
yarn add @scrshot/cli @scrshot/react @scrshot/build --dev
```

```bash
pnpm install  @scrshot/cli @scrshot/react @scrshot/build --save-dev
```


1. Add config file to project
Create a `.scrshotrc` config in root. Fill it with information about your project. 

```json
{
  "url": "http://127.0.0.1:5173",
  "dest": "src/assets",
  "screenshots": {
    "homepage": {
      "path": "/"
    }
  },
}
```

Find more about [config](https://scrshot.dev/docs/cli/config/)

2. Add a `ScrshotArea` component to the page. 
This component marks a spot for the screenshot. Everything that is **visually** inside the component will be on a screenshot.

```jsx
<div>
  This won't be on a screenshot
  <ScrshotArea>
    <div>This will be on screenshot</div>
  </ScrshotArea>
</div>
```

Find more about [components](https://scrshot.dev/docs/components/)

3. Run `scrshot dev`
```bash
npm run scrshot dev
```

Validate and develop on your screenshots

Find more about [CLI](https://scrshot.dev/docs/cli/dev/)

4. Remove components form production build

Import the proper plugin for your bundler system to get rid of scrshot components at build time

```js
// webpack.config.js
import Scrshot from '@scrshot/build/webpack'

module.exports = {
  plugins: [
    Scrshot()
  ],
}
```

Find more about [build](https://scrshot.dev/docs/build/)

## License

You can use it in your projects freely, even commercial ones. But every modifications must be disclosed at the same license.
