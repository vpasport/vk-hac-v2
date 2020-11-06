import React, {useState} from 'react';
import { Button } from 'primereact/button';
import Container from '../components/Container';
import { ProgressBar } from 'primereact/progressbar';
import styles from './test/style.module.scss';
import Answers from './test/_Answers';
import { useRouter } from 'next/router';

export default function Home({startedQuestions}) {
  const router = useRouter();

  const [ questions, setQuestions ] = useState(startedQuestions);
  const [ activeIndex, setActiveIndex ] = useState(0);

  console.log(questions)
  
  const question = questions[activeIndex];

  const setActiveAnswer = (answerIndex) => {
    const _questions = [...questions];
    _questions[activeIndex].activeIndex = answerIndex;
    setQuestions(_questions)
  }

  const sendData = () => {
    const answerIndexes = questions.map(el => ({id: el.id, answerId: el.activeIndex}));
    router.push('/completedTest')
  }

  return (
    <Container>
      <div>
        <header>
          <div className='p-d-flex p-jc-between p-ai-center'>
            <Button icon='pi pi-arrow-left' className='p-button-text p-button-rounded' />
            <Button icon='pi pi-times' className='p-button-text p-button-rounded' />
          </div>
          <ProgressBar value={100 / questions.length * (activeIndex + 1)} showValue={false} />
          <span className={['p-d-flex', 'p-jc-end', styles.progress].join(' ')}>
            {activeIndex + 1}/{questions.length}
          </span>
        </header>
        <div className={styles.content}>
        <h2>{question.description}</h2>
          <Answers 
            answers={question.answers} 
            activeIndex={question.activeIndex} 
            setActiveIndex={(i) => setActiveAnswer(i)}
          />
        </div>
        <div className='p-d-flex p-jc-between p-ai-center'>
          <Button 
            className={['p-button-secondary', styles.button].join(' ')} label='Назад' 
            disabled={activeIndex === 0}
            onClick={() => setActiveIndex(activeIndex - 1)}
          />
          {activeIndex === questions.length - 1 ? 
            <Button 
              className={[styles.button, 'p-button-success'].join(' ')} 
              label='Отправить'
              onClick={sendData}
            />
          :
            <Button 
              className={styles.button} 
              label='Следующий'
              onClick={() => setActiveIndex(activeIndex + 1)}
            />
          }
        </div>
      </div>
    </Container>
  )
}

export async function getServerSideProps(context) {
  const startedQuestions = [
    {
      id: 1,
      type: 'single',
      description: 'Как меня зовет',
      answers: [
        {
          id: 1,
          description: 'Маркиз',
        }
      ]
    },
    {
      id: 2,
      type: 'single',
      description: 'Как зовут мокриза букова',
      answers: [
        {
          id: 2,
          description: 'Макс'
        },
        {
          id: 3,
          description: 'Букав'
        }
      ]
    }
  ].map(el => (el.activeIndex = null, el))

  return {
    props: {
      startedQuestions
    }
  };
}