export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label
            {...props}
            className={
                'block text-[12.5px] font-body font-semibold text-text-heading mb-1.5 ' + className
            }
        >
            {value ? value : children}
        </label>
    );
}
