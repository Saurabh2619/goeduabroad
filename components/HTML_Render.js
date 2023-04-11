import parse from 'html-react-parser'
import styles from './HTML_Render.module.css'

function HTML_Render(props){
    return(<div className={styles.reac} id="htmlrenderer">
    {parse(props.data)}

    
    
    </div>)
}
export default HTML_Render;