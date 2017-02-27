import { percent, px } from 'csx';
import { style } from 'typestyle';

export namespace forms {
    export const textField = style({
        width: percent(100),
        padding: px(5)
    });
}
