import React from 'react';
import styles from '../style.module.scss';
import Container from '../../../components/Container';
import { Button } from 'primereact/button';
import Dots from '../../../components/DotsProgress/index';
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password';

const PageUserAbout = ({ setSecondPage, vkId, setVkId, password, setPassword, checkParams, userStatus }) => {
    return (
        <Container>
            <div className={styles.total}>
                <h2>Расскажи о себе</h2>
                <img src="./img/monster_1.png" alt='monster' className={styles.monster} />
            </div>

            <label htmlFor="vkId" className={styles.label}>Айди ВКонтакте</label>
            <InputText
                value={vkId}
                onChange={(e) => setVkId(e.target.value)}
                id='vkId'
                className={styles.input}
                autoComplete='off'
            />

            <label htmlFor="password" className={styles.label}>Пароль</label>
            <Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id='password'
                className={styles.input}
                promptLabel='Введите пароль'
                weakLabel='Слабый пароль'
                mediumLabel='Хороший пароль'
                strongLabel='Отличный пароль'
                autoComplete='off'
            />

            <Dots dotsLength={3} activeDot={2} />
            <div className={styles.buttons}>
                <Button
                    label='Вернуться'
                    onClick={() => setSecondPage(userStatus === 'user' ? 'UserCorporation' : 'AdminCorporation')}
                    className='p-button-secondary'
                />
                <Button
                    label='Продолжить'
                    onClick={() => checkParams()}
                />
            </div>

        </Container>
    )
}

export default PageUserAbout;