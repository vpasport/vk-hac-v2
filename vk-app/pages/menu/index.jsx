import React from 'react';
import styles from './style.module.scss';
import Container from '../../components/Container';
import { Button } from 'primereact/button';

const Menu = ({ compamyName = 'Gribnaya ferma', groupName = 'grib' }) => {
    return (
        <Container>
            <header className={styles.text}>
                <span className={styles.compamy}>{compamyName}</span> <br />
                <span className={styles.group}>{groupName}</span>
            </header>
            {groupName === 'boss'
                ? <img src="./img/monster_2.png" alt="monster" className={styles.bossImg} />
                : <img src="./img/monster_3.png" alt="monster" className={styles.groupImg} />
            }
            <div className={styles.wrapper}>
                <Button
                    className={`${styles.buttonOne} p-button-warning`}
                    label='Теория'
                />
                <Button
                    className={`${styles.buttonTwo} p-button-warning`}
                    label='Тесты'
                />
                {groupName === 'boss'
                    ? <>
                        <Button
                            className={styles.buttonThree}
                            label='Сотрудники'
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