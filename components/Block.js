import styles from './Block.module.css'

function Block(props){
    const CustomTag = `h${props.heading ? props.heading : "2"}`
    

    return(
        <>
        <div id="Main" className={styles.block}>
       {props.title && props.title.length > 0  ? <CustomTag>{props.title}</CustomTag>:''}
       {props.description && props.description.length > 0 ?  <p>{props.description}</p>:''}</div>
        </>
    )
}
export default Block;