interface ModalInputProps {
    placeholder: string,
    required: boolean,
    value: any
    changeValue?: (newValue: any) => void
}

export default function ModalInput(props: ModalInputProps) {
    return (
        <input 
            type="text"
            placeholder={props.placeholder}
            required={props.required}
            value={props.value}
            onChange={e => props.changeValue?.(e.target.value)} />
    )
}