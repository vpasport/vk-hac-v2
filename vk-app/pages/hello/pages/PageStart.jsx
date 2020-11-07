import React from 'react';
import styles from '../style.module.scss';
import Container from '../../../components/Container';
import { Button } from 'primereact/button';
import Dots from '../../../components/DotsProgress/index';
import { Dropdown } from 'primereact/dropdown';

const Page0 = ({ setSecondPage, userStatus, setUserStatus }) => {

    const dropdownItems = [
        {label: 'Сотрудник', value: 'user'},
        {label: 'Директор', value: 'admin'}
    ]

    return (
        <Container>
            <div className={styles.total}>
                <h2>Привет!</h2>
                <img src="./img/monster_1.png" alt='monster' className={styles.monster} />
                <span className={styles.startingText}>
                    Я монстрик Лимпо! <br/>
                    Добро пожаловать в корпорацию монстров! Давай познакомимся поближе.
                </span>
                <Dropdown
                    value={userStatus}
                    options={dropdownItems} 
                    placeholder='Выберите ваш путь' 
                    className={styles.startingDropdown}
                    onChange={(e) => setUserStatus(e.value)}
                />
                <div className={styles.dots}>
                    <Dots 
                        dotsLength={3} 
                        activeDot={0} 
                    />
                </div>
                <Button
                    className={styles.button}
                    label='Продолжить'
                    onClick={() => setSecondPage( userStatus === 'user' ? 'UserCorporation' : 'AdminCorporation')}
                />
            </div>

        </Container>
    )
}

export default Page0;