const { default: Collection } = require('@discordjs/collection')

/**
 * @typedef CooldownObject
 * @property {number} time Time when cooldown runs out
 * @property {Timeout} timeout Timeout
 * @property {boolean} createdMessage Whether or not they user has already been told about cooldown
 */

module.exports = (makeMsg = (time) => `You're on cooldown, try again in ${(time / 1000).toFixed(0)}s`) => {
  /**
   * @type {Collection<string, CooldownObject>}
   */
  const cooldowns = new Collection()

  return (ctx) => {
    if (!ctx.command.cooldown) return true

    const id = `${ctx.message.author.id}-${ctx.command.command}`
    const currentCooldown = cooldowns.get(id)

    if (currentCooldown) {
      if (currentCooldown.createdMessage) return
      const timeRemaining = currentCooldown.time - Date.now()

      currentCooldown.createdMessage = true
      setTimeout(() => {
        currentCooldown.createdMessage = false
      }, 2000)
      ctx.error(makeMsg(timeRemaining))
      return
    }

    ctx.invokeCooldown = () => {
      cooldowns.set(id, {
        time: Date.now() + ctx.command.cooldown,
        timeout: setTimeout(() => {
          cooldowns.delete(id)
        }, ctx.command.cooldown)
      })
    }

    return true
  }
}
