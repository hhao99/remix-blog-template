import { Link } from '@remix-run/react'
export default function Button({props,children}) {
    return (
        <button className='btn btn-primary' {...props}>
            {children}
        </button>
    )
}