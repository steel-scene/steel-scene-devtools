import { keyframes } from 'typestyle'

export namespace animations {
  export const fadeIn = keyframes({
    from: {
      opacity: 0
    },
    to: {
      opacity: 1
    }
  })
}