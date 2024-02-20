
export default function Button({type,props,children}) {
    const styles = type === 'smalll'?'ml-2 btn btn-sm btn-circle'
        : 'ml-2 btn btn-neutral'
    return (
        <button className={styles} {...props}>
            {children}
        </button>
    )
}
