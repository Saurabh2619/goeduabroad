import styles from './Button.module.css'
function Button(props){


    return(<a onClick={props.onClick} className={styles.btn} href={props.href} target={props.target ? props.target : '_self'}>{props.text}</a>)
}

export default Button;