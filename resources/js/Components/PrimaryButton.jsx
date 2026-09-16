export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            disabled={disabled}
            className={
                'w-full min-h-touch inline-flex items-center justify-center gap-2 rounded-btn bg-action-blue px-4 py-2.5 ' +
                'text-[13.5px] font-body font-bold text-white transition-colors hover:bg-action-blue-dark ' +
                'focus:outline-none focus:ring-2 focus:ring-action-blue focus:ring-offset-2 ' +
                (disabled ? 'opacity-50 cursor-not-allowed ' : '') +
                className
            }
        >
            {children}
        </button>
    );
}
