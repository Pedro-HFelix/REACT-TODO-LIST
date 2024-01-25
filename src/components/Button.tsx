import styles from './Button.module.css';
import svg from "../assets/plus.svg";

export function Button(){
    return (
        <div>
            <button type="submit" className={styles.contentButton}>
                Criar <img src={svg} alt="plus icon" />
            </button>
        </div>
    )
}