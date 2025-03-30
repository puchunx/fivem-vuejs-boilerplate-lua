<h1 align="center">FiveM Vue.js and Lua Boilerplate</h1>

<div align="center">
A simple and extendable Vue.js (TypeScript) boilerplate for FiveM script with NUI
</div>

<div align="center">

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/project-error/pe-utils/master/LICENSE)

</div>

This repository is a basic boilerplate for getting started
with Vue.js in NUI. It contains several helpful utilities and
is bootstrapped using vite. It is for both browser
and in-game based development workflows.

This version of the boilerplate is meant for the CfxLua runtime.

## Requirements

- [Node > v18.3](https://nodejs.org/en/)
- [pnpm](https://pnpm.io/installation) (Preferred but not required)

_A basic understanding of the modern web development workflow. If you don't
know this yet, Vue.js might not be for you just yet._

## Getting Started

First clone the repository or use the template option and place
it within your `resources` folder

### Installation

_The boilerplate was made using `pnpm` but is still compatible with
`npm`._

Install dependencies by navigating to the `web` folder within
a terminal of your choice and type `pnpm i` or `npm i`.

## Features

This boilerplate comes with some utilities and examples to work off of.

### Lua Utils

**SendVueMessage**

This is a small wrapper for dispatching NUI messages. This is designed
to be used with the `useNuiEvent` Vue composable.

Signature

```lua
---@param action string The action you wish to target
---@param data any The data you wish to send along with this action
SendVueMessage(action, data)
```

Usage

```lua
SendVueMessage('setVisible', true)
```

**debugPrint**

A debug printing utility that is dependent on a convar,
if the convar is set this will print out to the console.

The convar is dependent on the name given to the resource.
It follows this format `YOUR_RESOURCE_NAME-debugMode`

To turn on debugMode add `setr YOUR_RESOURCE_NAME-debugMode 1` to
your server.cfg or use the `setr` console command instead.

Signature (Replicates `print`)

```lua
---@param ... any[] The arguments you wish to send
debugPrint(...)
```

Usage

```lua
debugPrint('wow cool string to print', true, someOtherVar)
```

### Vue.js Utils

Signatures are not included for these utilities as the type definitions
are sufficient enough.

**useNuiEvent**

This is a custom Vue composable that is designed to intercept and handle
messages dispatched by the game scripts. This is the primary
way of creating passive listeners.

_Note: For now handlers can only be registered a single time. I haven't
come across a personal usecase for a cascading event system_

**Usage**

```html
<script setup lang="ts">
  import { ref } from "vue";

  const state = ref("");

  useNuiEvent<string>("myAction", (data) => {
    // the first argument to the handler function
    // is the data argument sent using SendVueMessage

    // do whatever logic u want here
    state.value = data;
  });
</script>

<template>
  <div>
    <h1>Some component</h1>
    <p>{{ state }}</p>
  </div>
</template>
```

**fetchNui**

This is a simple NUI focused wrapper around the standard `fetch` API.
This is the main way to accomplish active NUI data fetching
or to trigger NUI callbacks in the game scripts.

When using this, you must always at least callback using `{}`
in the gamescripts.

_This can be heavily customized to your use case_

**Usage**

```ts
// First argument is the callback event name.
fetchNui<ReturnData>("getClientData")
  .then((retData) => {
    console.log("Got return data from client scripts:");
    console.dir(retData);
    setClientData(retData);
  })
  .catch((e) => {
    console.error("Setting mock data due to error", e);
    setClientData({ x: 500, y: 300, z: 200 });
  });
```

**debugData**

This is a function allowing for mocking dispatched game script
actions in a browser environment. It will trigger `useNuiEvent` handlers
as if they were dispatched by the game scripts. **It will only fire if the current
environment is a regular browser and not CEF**

**Usage**

```ts
// This will target the useNuiEvent hooks registered with `setVisible`
// and pass them the data of `true`
debugData([
  {
    action: "setVisible",
    data: true,
  },
]);
```

**Misc Utils**

These are small but useful included utilities.

- `isEnvBrowser()` - Will return a boolean indicating if the current
  environment is a regular browser. (Useful for logic in development)

## Development Workflow

This boilerplate was designed with development workflow in mind.
It includes some helpful scripts to accomplish that.

**Hot Builds In-Game**

When developing in-game, you can use the hot build system by
running the `start:game` script. This is essentially the start
script but it writes to disk. Meaning all that is required is a
resource restart to update the game script

**Usage**

```sh
# pnpm
pnpm dev:game
# npm
npm run dev:game
```

**Production Builds**

When you are done with development phase for your resource. You
must create a production build that is optimized and minimized.

You can do this by running the following:

```sh
pnpm build
npm run build
```

## Acknowledgements

This project was inspired by the following repositories:

- [fivem-react-boilerplate-lua](https://github.com/project-error/fivem-react-boilerplate-lua) - FiveM React and Lua Boilerplate
