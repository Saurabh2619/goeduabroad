import styles from './Tooltip.module.css'

function Tooltip(props){

    return <div className={styles.tooltip}>
{props.children}
        <div className={styles.tipcont}>
            {props.content}
            <span className={styles.arrow}></span>
        </div>
    </div>
}

export default Tooltip;