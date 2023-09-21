import styles from './Preview.module.css'
import RenderEditor from './RenderEditor';
function PreviewComponent(props){
const final = props.data;

const GooglePreview = ({ value }) => {
    const { metaTitle, metaDesc } = value;
  
    return (<><h2>Google Search Engine Preview</h2>
      <div className={styles['google-preview-container']}>
        
        <div className={styles['google-preview-title']}>{metaTitle}</div>
        <div className={styles['google-preview-url']}>blog.nmnvisuals.com</div>
        <div className={styles['google-preview-description']}>{metaDesc}</div>
      </div></>
    );
  };
    return <div>
        <GooglePreview value={final}/>
        <h2>Blog Preview</h2>
<article className={styles.post_holder}>
<div className={styles.spacer}></div>
<img className={styles.featured} src={final.img} alt={final.title}/>
        <h1 className={styles.ptitle}>{final.title}</h1>
        
        <div className={styles.content}>
        
        <div className={styles.content} dangerouslySetInnerHTML={{__html:final.content}}></div>
       
           
        <RenderEditor isJSON={true} renderFrontEndOnly={true} postData={props?.postData}  onChange={(e)=>{}}/>
            
            </div>
        
       



    </article>

    </div>
}

export default PreviewComponent;