import styles from './Section.module.css';

function Section(props){

    return(
        <section className={styles.section + " " + (props.visible ? styles.visible :'') + " " + (props.noMargin ? styles.noMargin : '')}>
            {props.title ? <h1 style={{textAlign:props.align}} className={styles.shead + " " + (props.centered? styles.center : '')+" " +(props.nomargin ? styles.nomargin :'') + " " + (props.small ? styles.small : '')}>{props.title.split(":")[0]}{props.title.split(":")[0].length > 0 ? <br/>:''}<span style={{color:props.color}}>{props.title.split(":")[1]}{props.title.split(":")[2] && props.title.split(":")[2].length > 0 ? <br/>:''}</span>{props.title.split(":")[2]}</h1>:''}
            <div className={styles.container}>{props.children}</div>
        </section>
    )
}

export default Section;