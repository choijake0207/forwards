import React from 'react'
import styles from "../../styles/landing.module.css"

export default function Landing() {

    

  return (
    <div className={styles.landing_page}>

        <header className={styles.landing_header}>
            <div className={styles.logo_container}>
                <img src="./navigation.png" className={styles.logo} alt="logo"/>
                <p className={styles.logo_title}>Forward</p>
            </div>
            <div className={styles.user_portal_links}>
                <button className={styles.sign_up_btn}>Join Today</button>
                <button className={styles.login_btn}>Login</button>
            </div>
        </header>

        <section className={styles.greeting_section}>
            <div className={styles.greeting_text}>
                <p className={styles.primary_text}>
                    Whether it's starting something new or quitting something old...
                    <br></br>
                    <span className={styles.highlight}>habits</span> define us
                </p>
                <p className={styles.secondary_text}>
                    Let's make sure your habits are moving you forward
                </p>
            </div>
            <div className={styles.greeting_image_container}>
                <img src="/mobile.png" className={styles.mobile_demo} alt="laptop_demo"/>
                <img src="laptop.png" className={styles.laptop_demo} alt="mobile_demo"/>
            </div>
        </section>



        <section className={styles.walkthrough_section}>
            <h2>Habit Tracking Made Exceptionally Simple</h2>
            <div className={styles.walkthrough_demos}>

                <div className={`${styles.create_walkthrough} ${styles.hidden}`}>
                    <h3>Create</h3>
                    <div className={styles.dummy_wrap}>
                        <div className={styles.dummy_input}>
                            <p className={styles.dummy_text}>Get Up At 7am</p>
                        </div>
                    </div>
                </div>

                <div className={`${styles.check_in_walkthrough} ${styles.hidden}`}>
                    <h3>Check In</h3>
                    <div className={styles.dummy_wrap}>
                        <div className={styles.dummy_check_card}>
                            <p className={styles.card_title}>Get Up At 7am</p>
                            <p className={`${styles.card_btn} ${styles.check_btn}`}>Check In</p>
                        </div>
                    </div>
                </div>
                
                <div className={`${styles.progress_walkthrough} ${styles.hidden}`}>
                    <h3>View Progress</h3>
                    <div className={styles.dummy_wrap}>
                        <img className={styles.dummy_chart} src="./chart.png"/>
                    </div>
                </div>

            </div>
        </section>

        <section></section>
        <section></section>
        <section></section>
    </div>
  )
}


