import React from 'react';
import styles from '../style.module.scss';
import Container from '../../../components/Container';
import { Button } from 'primereact/button';
import Dots from '../../../components/DotsProgress/index';

const Page0 = ({ setSecondPage }) => {
    return (
        <Container>
            <div className={styles.total}>
                <h2>Расскажи о себе</h2>
                <img src="./img/monster_1.png" alt='monster' className={styles.monster} />
                
                <Dots dotsLength={3} activeDot={2} />
                <Button
                    className={styles.button}
                    label='Вернуться'
                    onClick={() => setSecondPage(1)}
                />
                <Button
                    className={styles.button}
                    label='Продолжить'
                    onClick={() => setSecondPage(3)}
                />
            </div>

        </Container>
    )
}

export default Page0;