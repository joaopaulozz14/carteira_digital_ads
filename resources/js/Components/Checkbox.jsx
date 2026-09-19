export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-gray-300 text-action-blue focus:ring-action-blue focus:ring-2 ' +
                className
            }
        />
    );
}
