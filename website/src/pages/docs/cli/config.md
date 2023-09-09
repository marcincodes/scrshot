---
title: Config - CLI
description: Scrshot intro
layout: ~/layouts/DocLayout.astro
---

# Scrshot Config

### `url`

The URL address where we can reach our application. 
- In case it's a web application it should be a standard URL with host and port. 
- In the case of mobile applications it should be application deep link schema name

Website Example

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

Mobile Example

```json
{
  "url": "expo-with-router",
  "dest": "public",
  "screenshots": {
    "homepage": {
      "path": "/"
    }
  }
}
```





### `dest`

Path where Scrshot will store the screenshots. Be aware it could overwrite already existing images.




### `viewport` (optional)

Manage how your website is displayed. You can change how browser rendering your website. 

#### `width`

Set browser viewport width

Default: 1920px

#### `height`

Set browser viewport height

Default: 1080px





### `auth` (optional) (web only)

Scrshot is capable of pass auth. It's using ahead of time defined cookie jar that contain auth token and all necessary information to authenticate user. On the first run `auth.json` file is created and it's used for subsequent runs.

What makes Scrshot authentication agnostic is architecture where we CLI doesn't need to support every steps. It needs to know first step of authentication process and the last step where authentication is succeed.

#### `url` (optional)

URL where your authentication server can be reached. If left blank url will be inherited from root config. Use this only in
case where your authentication url is different than your application url.

#### `path`

Authentication first step path 

#### `success`

After successful authentication CLI will save user cookies and move to other steps of collecting screenshots.

##### `url` (optional)

URL where success authentication can be reached. If left blank url will be inherited from root config. Use this only in
case where your authentication success url is different than your application url.

##### `path`

Authentication success path





### `screenshots`

Object with screenshots that Scrshot CLI should take. It's composed of key that is screenshot name and object of screenshot information. You need to define at least one screenshot.

#### `url` (optional)

URL where screenshot can be reached. If left blank url will be inherited from root config. Use this only in
case where your screenshot url is different than your application url.

#### `path`

Screenshot path

#### `skip`

You can skip creating screenshot 

#### `auth`

When auth is defined it will be applied to every requested path. Some path can be disabled in your application after authentication. This option will ensure that path is visiting without authentication.

#### `wait`

Path could load additional resource or setup application and that can take some time. You can set time between loading path and taking screenshot. To parse time [this library](https://github.com/vercel/ms) is used.
<br /><br />


```
{
"screenshots": {
  "homepage": {
    "auth": false,
    "path": "/"
  },
  "login-form": {
    "auth": false,
    "path": "/login"
  },
  "posts-list": {
    "path": "/dashboard"
  },
  "posts-create": {
    "path": "/editor/clig2d23u0003r5b6voj6hivw",
    "wait": "2s"
  },
  "settings": {
    "path": "/dashboard/settings"
  }
}
}
```



### `android` (optional)

When you want to test android build of your mobile application.

#### `dest`

Path where Scrshot will store screenshots. It overrides root `dest` property

#### `paths`

On Android [Detox](https://wix.github.io/Detox) needs two apps to make e2e testing properly. One `assembleRelease` and second `assembleAndroidTest`.

##### `app`

Release version of your Android application

##### `test`

Test version of your Android application

#### `device`

Local device you will run your tests on


### `ios` (optional)

When you want to make screenshots on iOS Detox require [`applesimutils`](https://github.com/wix/AppleSimulatorUtils) to testing through your mobile application

#### `dest`

Path where Scrshot will store screenshots. It overrides root `dest` property

#### `path`

Release version of your Android application

#### `device`

Local device you will run your tests on






### `output` (optional)

You can make your screenshots look better by manipulating it's output. Thanks to these properties you can make rounded border, add background and more.

#### `space`

Create space between screenshot and corners of the image. It's like CSS [`padding`](https://developer.mozilla.org/en-US/docs/Web/CSS/padding) property and behaves the same:

- 1 value - gives space to the 4 sides at once
- 2 values - gives space to 2 sides (top, bottom) and 2 sides (right, left)
- 3 values - gives space to top, 2 sides (left, right) and bottom
- 4 values - gives space to top right bottom and left

#### `background`

Manipulate background under screenshot images

##### `border`

Manipulate border of the background

###### `style`

Define border style. Only `solid` is supported

###### `width`

Define border width

###### `color`

Define border color

###### `radius`

Define border radius

##### `gradient`

Fill background with gradient

- Using manual positions:

```json
  "gradient": {
    "0": "skyblue",
    "100": "teal"
  }
```

where object key is value where gradient should start and object value is a color

- Using equally divided positions:

```json
  "gradient": ["skyblue", "teal"]
```

where `gradient` is a array of colors that are equally divided


#### `screenshot`

Manipulate screenshot that is taken of your web application or mobile application

##### `border`

Manipulate border of the background

###### `style`

Define border style. Only `solid` is supported

###### `width`

Define border width

###### `color`

Define border color

###### `radius`

Define border radius

