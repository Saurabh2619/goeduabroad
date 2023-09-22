import styles from './Card.module.css'


import Link from 'next/link';

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
        <div style={{backgroundImage: "url("+ props.image +")"}} className={styles.image_holder}>

           
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