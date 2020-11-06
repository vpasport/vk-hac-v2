import React from 'react';
import styles from '../style.module.scss';
import Container from '../../../components/Container';
import { Button } from 'primereact/button';
import Dots from '../../../components/DotsProgress/index';

const Page0 = ({setSecondPage}) => {
    return (
        <Container>
            <div className={styles.total}>
                <h2>Привет!</h2>
                <img src="./img/monster_1.png" alt='monster' className={styles.monster} />
                <span>
                    Я монстрик Лимпо! <br />
                    Добро пожаловать в корпорацию монстров!
                </span>
                <Dots dotsLength={3} activeDot={0} />
                <Button 
                    className={styles.button} 
                    label='Продолжить'
                    onClick={() => setSecondPage(1)}
                />
            </div>
            
        </Container>
    )
}

export default Page0;