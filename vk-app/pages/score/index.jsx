import React from 'react';
import styles from './style.module.scss';
import Container from '../../components/Container';
import { Button } from 'primereact/button';
import Stars from '../../components/Stars/index'
import { useRouter } from 'next/router';

const Result = ({ userPoints, maxPoints, id }) => {
    const router = useRouter();

    let userResult
    { userPoints >= maxPoints * 0.5 ? userResult = 1 : userResult = 0 }

    return (
        <Container>
            <button 
                className={styles.out}
                onClick={() => router.push(`/userTests`)}
            >
                <i className="pi pi-times"></i>
            </button>
            <button 
                className={styles.buttonCup}
                onClick={() => router.push(`/completedTest?id=${id}`)}
            >
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
                    label='Таблица лидеров'
                    onClick={() => router.push(`/completedTest?id=${id}`)}
                />
            </div>
        </Container>
    )
}

export async function getServerSideProps({query}){
    const id = query.id;

    return {
        props: {
            id,
            userPoints: 30,
            maxPoints: 50
        }
    }
}

export default Result;