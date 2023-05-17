import styles from "./Icon.module.css"

export const IconBag = () => {
  return (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={styles.icon}
        viewBox="0 0 32 32"
        fill="none"
    >
        <path d="M10 9C10 9 10 3 16 3C22 3 22 9 22 9M5 9V29H27V9H5Z" 
        stroke="black" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"/>
        
    </svg>
  )
}
