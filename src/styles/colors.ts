import { hsl } from 'csx';

export namespace colors {
  export const background = hsl(0, .5, 1)
  
  export const primary = hsl(195, .9, .35) 
  export const info = primary.lighten(.35, true)  
  export const warning = primary.spin(155) 
  export const danger = primary.spin(120)
  export const success = primary.spin(-50)
  
  export const highlight = background.lighten(.2, true)
  export const touchdown = background.desaturate(1).darken(.02, true)
  export const text = background.invert().lighten(.3, true)
  export const textPlaceholder = text.lighten(.2, true)
  export const border = text.lighten(.5, true)
  export const borderLighter = text.lighten(.8, true)
  export const tabBorder = border.lighten(.1, true)
  export const tabBackground = background
  export const headerBackground = background.desaturate(1).darken(.04)
  export const panelBackground = background.desaturate(1).darken(.06)
  
  export const inspector = 'violet'
}