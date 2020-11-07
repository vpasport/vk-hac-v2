import React from 'react';
import { AutoComplete } from 'primereact/autocomplete';
import styles from '../style.module.scss';
import Container from '../../../components/Container';
import { Button } from 'primereact/button';
import Dots from '../../../components/DotsProgress/index';

const Page1 = ({setSecondPage}) => {
    return (
        <Container>
            <div className={styles.total}>
                <h4>Давай надем твою корпорацию!</h4>
                <span className='text'>Город</span>

                <span className='text'>Корпорация</span>
                <Dots dotsLength={3} activeDot={1} />
                <Button 
                    className={styles.button} 
                    label='Продолжить'
                    onClick={() => setSecondPage(2)}
                />
            </div>
            
        </Container>
    )
}

export default Page1;