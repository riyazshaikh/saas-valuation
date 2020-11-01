import TWEEN from '@tweenjs/tween.js';

export default (propName, duration = 500, ease = TWEEN.Easing.Quadratic.Out) => {
    const propNameTween = `${propName}Tween`;

    return {
        data() {
            return {
                [propNameTween]: this[propName],
            };
        },
        watch: {
            // watch when the prop changes and tween the tween prop from old to new
            [propName] : {
                handler(newValue, oldValue = 0) {
                    new TWEEN.Tween({
                        number: oldValue,
                    })
                        .to({
                            number: newValue,
                        }, duration)
                        .easing(ease)
                        .onUpdate(tween => {
                            this[propNameTween] = tween.number;
                        })
                        .start();
    
                    animate();    
                },
                immediate: true
            },
        },
    };
};

function animate() {
    if (TWEEN.update()) {
        requestAnimationFrame(animate);
    }
}
