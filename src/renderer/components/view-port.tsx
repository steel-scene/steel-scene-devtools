import { percent, px } from 'csx';
import { style } from 'typestyle';

const componentClass = style({
    $nest: {
        iframe: {
            width: percent(100),
            height: px(400)
        }
    }
});

export const ViewPortComponent = {
    data() {
        return { }
    },
    render(h) {
        return (
            <div class={componentClass}>
                <iframe />
            </div>
        );
    }
};
