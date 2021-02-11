# Cooldown Middleware

Cooldown middleware for [discord-rose](https://npmjs.com/package/discord-rose)

## Install

`npm i @discord-rose/cooldown-middleware`

## Usage

Setting CommandOptions`.cooldown` to the amount of time (in milliseconds) to allow in between each command, will automatically add cooldowns.

When doing this, your CommandContext will have `.invokeCooldown()` enabled on it. You run this to invoke the cooldown.

```js
const cooldownMiddleware = require('@discord-rose/cooldown-middleware')

worker.commands
  .middleware(cooldownMiddleware())
  .add({
    cooldown: 60e3, // 60 second cooldown time (in ms)
    command: '!hello',
    exec: (ctx) => {
      ctx.reply('World!')
      ctx.invokeCooldown() // this will invoke the 60 second cooldown
    }
  })
```

## Custom message / time parsing

When using `cooldownMiddleware()` you can pass a function which takes a `number` that is the time that is remaining in a cooldown.

By default this is `You're on cooldown, try again in ${(time / 1000).toFixed(0)}s`, you can see how this might not scale well with over 2ish minutes of cooldown, as it only displays seconds.

Example for creating a custom message:

```js
worker.commands
  .middleware(cooldownMiddleware((time) => { // amount of time left
    return `Try again in ${someTimeParser(time)}`
  }))
```