import styles from './Image.module.css'
function Image(props){

    
return(
<img className={styles.mainimage} alt={props.alt? props.alt : 'NMN Visuals Blog'} src={props.image} width={props.width} height={props.height} style={{objectPosition:props.position}}></img>)
}

export default Image;