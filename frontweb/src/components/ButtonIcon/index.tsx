

type Props = {
    text : string,
    nameClass: string
    onCLick? : () => void
}

export default function ButtonIcon({text, nameClass, onCLick} : Props) {
    return (
        <div className="btn-icon-container">
            <button className={`btn ${nameClass}`} onClick={onCLick}>{text.toUpperCase()}</button>
        </div>
    )
}