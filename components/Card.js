import styles from './Card.module.css'


import Link from 'next/link';

function getCloudinaryResized(fullSizeImageUrl) {
    if (fullSizeImageUrl == undefined) {
      return 'https://winfort.net/wp-content/themes/consultix-1/images/no-image-found-360x260.png';
    }
  
    const cloudinaryPattern = /https?:\/\/res\.cloudinary\.com\/([^/]+)\/image\/upload\/([^/]+)\/([^?]+)/;
    const match = fullSizeImageUrl.match(cloudinaryPattern);
  
    if (!match) {
      console.error('Invalid Cloudinary URL');
      return fullSizeImageUrl;
    }
  
    const cloudName = match[1];
    const transformationParams = 'w_auto,h_300,q_66'; // Updated transformation parameters
    const imagePublicId = match[3];
  
    // Combine the base Cloudinary URL with the transformation parameters and image public ID
    const thumbnailUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${transformationParams}/${imagePublicId}`;
  
    return thumbnailUrl;
  }
function isoDateToWords(isoDate) {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    const dateObj = new Date(isoDate);
    if (isNaN(dateObj)) {
      return "Invalid date";
    }
  
    const day = dateObj.getDate();
    const month = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();
  
    return `${day} ${month} ${year}`;
  }

function Card(props){
    return(
    
    
    <div className={styles.plan_card}><Link href={`/post/${props.slug}`} legacyBehavior><a aria-label={props.title} >
{/* <div className={styles.loader}></div> */}
{props.icons? <div className={styles.icon_holder}>

{props.icons.map((item,index)=>{

return(<img width={36} height={36} alt={item.title} src={item.source} className={styles.icon_inner}/>)

})}

</div>:''}
        <div style={{backgroundImage: "url("+ getCloudinaryResized(props.image) +")"}} className={styles.image_holder}>

           
        </div>

        <div className={styles.content_holder}>




{props?.date ? <p className={styles.date}>{isoDateToWords(props.date)}</p>:''}
<h2>{props.title}</h2>
<span className={styles.perks}>{props.description ? props.description.substring(0,154)+"......" : ''}</span>

</div></a></Link>
    </div>
    
    
    
    )
}
export default Card;