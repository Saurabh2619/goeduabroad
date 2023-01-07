import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import styles from './DefaultLayout.module.css'

function DefaultLayout(props){

    return <div className={styles.maincont}>
        <Navbar/>
<div className={styles.content}>

    {props.children}
</div>
        <Footer/>
    </div>
}


export default DefaultLayout;