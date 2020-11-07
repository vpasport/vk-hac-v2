import React from 'react';
import styles from './style.module.scss';
import Container from '../../components/Container';
import { Button } from 'primereact/button';
import Stars from '../../components/Stars/index'

const Result = ({ userPoints = 70, maxPoints = 100 }) => {
    let userResult
    { userPoints >= maxPoints * 0.5 ? userResult = 1 : userResult = 0 }

    return (
        <Container>
            <button className={styles.out}>
                <i className="pi pi-times"></i>
            </button>
            <button className={styles.buttonCup}>
                <img src='./img/cup.png' alt='cup' className={styles.cup} />
            </button>
            <div className={styles.total}>
                {userResult
                    ? <h4>Поздравляем, Ваш результат</h4>
                    : <h4>Ой, Ваш результат</h4>
                }
                {userResult
                    ? <span className={styles.text}>
                        <span className={styles.goodResult}>{userPoints}</span>/{maxPoints}
                    </span>
                    : <span className={styles.text}>
                    <span className={styles.badResult}>{userPoints}</span>/{maxPoints}
                </span>
                }
                <Stars
                    userPoints={userPoints}
                    maxPoints={maxPoints}
                    className={styles.stars}
                />
                <Button
                    className={styles.button}
                    label='Следующий тест'

                />
            </div>
        </Container>
    )
}

export default Result;