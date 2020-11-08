import React from 'react';
import styles from './menu/style.module.scss';
import Container from '../components/Container'
import { Button } from 'primereact/button';
import { useRouter } from 'next/router';
import fetcher from '../helpers/fetcher';
import { Toast } from 'primereact/toast';

const Menu = ({ compamyName = 'Gribnaya ferma' }) => {

    const router = useRouter();
    const isAdmin = true;
    let toast;

    const sendMessage = async () => {
        let sendResponse = await fetcher(`http://192.168.43.15:3001/user/remind`, {
            method: 'POST',
            body: {
                company_id: 1
            }
        })
        sendResponse = await sendResponse.json();

        if(sendResponse.isSuccess){
            toast.show({
                severity: 'success',
                summary: 'Успешно',
                detail: 'Рассылка отправлена'
            })
        }
    }

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
                    onClick={() => router.push(isAdmin ? '/allTestsAdmin' : 'userTests')}
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
                            onClick={() => router.push('/leaderboard')}
                        />
                        <Button
                            className={styles.buttonFive}
                            label='Напомнить о прохождении теста'
                            onClick={sendMessage}
                        />
                    </>
                    : <Button
                        className={styles.buttonSix}
                        label='Рейтинг'
                    />
                }
            </div>
            <Toast ref={(el) => toast = el} position='bottom-left' style={{width: 'calc(100% - 20px)'}}/>
        </Container>
    )
}

export default Menu;