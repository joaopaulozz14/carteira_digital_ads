import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useEffect(() => {
        if (isFocused) {
            (ref ? ref.current : localRef.current)?.focus();
        }
    }, [isFocused, ref]);

    return (
        <input
            {...props}
            type={type}
            className={
                'w-full min-h-touch rounded-input border-0 bg-bg-input px-3.5 py-2.5 text-[14px] font-body text-text-heading ' +
                'placeholder:text-text-secondary focus:ring-2 focus:ring-action-blue focus:bg-white ' +
                'transition-colors ' +
                className
            }
            ref={ref ? ref : localRef}
        />
    );
});
