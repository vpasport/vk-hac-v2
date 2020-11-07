import React from 'react';
import styles from './menu/style.module.scss';
import Container from '../components/Container'
import { Button } from 'primereact/button';
import { useRouter } from 'next/router';

const Menu = ({ compamyName = 'Gribnaya ferma' }) => {

    const router = useRouter();
    const isAdmin = true;

    return (
        <Container>
            <header className={styles.text}>
                <span className={styles.compamy}>{compamyName}</span> <br />
                <span className={styles.group}>'Грибная фабрика'</span>
            </header>
            {isAdmin
                ? <img src="./img/monster_2.png" alt="monster" className={styles.bossImg} />
                : <img src="./img/monster_3.png" alt="monster" className={styles.groupImg} />
            }
            <div className={styles.wrapper}>
                <Button
                    className={`${styles.buttonOne} p-button-warning`}
                    label='Теория'
                    onClick={() => router.push('/allThemes')}
                />
                <Button
                    className={`${styles.buttonTwo} p-button-warning`}
                    label='Тесты'
                    onClick={() => router.push(isAdmin ? '/allTestsAdmin' : '')}
                />
                {isAdmin
                    ? <>
                        <Button
                            className={styles.buttonThree}
                            label='Сотрудники'
                            onClick={() => router.push('/employees')}
                        />
                        <Button
                            className={styles.buttonFour}
                            label='Рейтинг'
                        />
                        <Button
                            className={styles.buttonFive}
                            label='Напомнить о прохождении теста'
                        />
                    </>
                    : <Button
                        className={styles.buttonSix}
                        label='Рейтинг'
                    />
                }
            </div>
        </Container>
    )
}

export default Menu;