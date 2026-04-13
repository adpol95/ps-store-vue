import { z } from 'zod'

let isInitialized = false

export function initZod() {
  if (isInitialized) return
  isInitialized = true

  const maybeSetErrorMap = (z as unknown as { setErrorMap?: unknown }).setErrorMap

  if (typeof maybeSetErrorMap !== 'function') return

  ;(maybeSetErrorMap as Function)((_issue: unknown, ctx: { defaultError: string }) => ctx.defaultError)
}

