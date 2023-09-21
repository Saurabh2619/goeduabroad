import styles from './Follow.module.css'

function Follow(props){

    return(<div className={styles.follow + " " +(props.isFooter? styles.footer:'')}>
        <h2>Follow Me On</h2>
        <div className={styles.logos}>

           <a aria-label='Instagram Icon' href="https://instagram.com/officialnmn"> <img alt='Instagram Icon' width={"44px"} height={"44px"} src="/insta.svg"/></a>
           <a aria-label='Facebook Icon' href="https://facebook.com/personalnmn"> <img alt='Facebook Icon' width={"44px"} height={"44px"} src="/fb.svg"/></a>
           <a aria-label='LinkedIn Icon' href="https://linkedin.com/in/naman-sharma-3993b1184/"> <img alt='LinkedIn Icon' width={"44px"} height={"44px"} src="/lnk.svg"/></a>
           <a aria-label='YouTube Icon' href="https://www.youtube.com/@nmnvisuals"> <img alt='YouTube Icon' width={"44px"} height={"44px"} src="/ytb.svg"/></a>
           <a aria-label='Twitter Icon' href="https://twitter.com/officialnmn"> <img alt='Twitter Icon' width={"44px"} height={"44px"} src="/twt.svg"/></a>
           <a aria-label='CodePen Icon' href="https://codepen.io/officialnmn"> <img alt='CodePen Icon' width={"44px"} height={"44px"} src="/cdp.svg"/></a>
        </div>
    </div>)
}

export default Follow;