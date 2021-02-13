import { CommandContext } from "discord-rose/dist/structures/CommandContext";

declare module 'discord-rose/dist/typings/lib' {
  interface CommandOptions {
    /**
     * Amount of time in milliseconds to allow between each command
     */
    cooldown?: number
  }

  interface CommandContext {
    invokeCooldown: () => void
  }
}

declare const _default: (makeMsg?: (time: number) => string) => (ctx: CommandContext) => boolean

export default _default