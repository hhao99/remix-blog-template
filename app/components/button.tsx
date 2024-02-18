
export default function Button({props,children}) {
    return (
        <button className='ml-2 btn btn-neutral' {...props}>
            {children}
        </button>
    )
}

export function Button_small({props,children}) {
    return (
        <button className='ml-2 btn btn-sm btn-circle'>
            {children}
        </button>
    )
}