export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p {...props} className={'text-[12.5px] font-body font-medium text-status-red-text mt-1.5 ' + className}>
            {message}
        </p>
    ) : null;
}
