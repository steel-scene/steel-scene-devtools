import { percent, px } from 'csx';
import { style } from 'typestyle';

export namespace flex {
    export const containerFull = style({
        display: 'flex',
        width: percent(100),
        justifyContent: 'space-around',
        $nest: {
            '> *': {
                flexShrink: 0,
                marginLeft: px(10),
                marginRight: px(10),
            }
        }
    });

    export const itemFill = style({
        flexGrow: 1, 
        flexBasis: 'auto'
    });

    export const vertical = style({
        flexDirection: 'column'
    });
}
