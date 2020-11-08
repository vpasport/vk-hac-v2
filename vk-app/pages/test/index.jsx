import React, {useState} from 'react';
import { Button } from 'primereact/button';
import Container from '../../components/Container';
import { ProgressBar } from 'primereact/progressbar';
import styles from './style.module.scss';
import Answers from './_Answers';
import { useRouter } from 'next/router';
import fetcher from '../../helpers/fetcher';

export default function Home({startedQuestions, id}) {
  const router = useRouter();

  const [ questions, setQuestions ] = useState(startedQuestions);
  const [ activeIndex, setActiveIndex ] = useState(0);
  
  const question = questions[activeIndex];

  const setActiveAnswer = (answerIndex) => {
    const _questions = [...questions];
    _questions[activeIndex].activeIndex = answerIndex;
    setQuestions(_questions)
  }

  const sendData = async () => {
    const answerIndexes = questions.map(el => ({question_id: el.id, answer_options_id: el.activeIndex, user_id: 5}));

    let sendResponse = await fetcher(`http://192.168.43.15:3001/test/answers`, {
      method: 'POST',
      body: {answers: answerIndexes}
    })
    sendResponse = await sendResponse.json();

    if(sendResponse.isSuccess)
      router.push(`/score?id=${id}`)
    else
      console.log('error')
    
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

export async function getServerSideProps({query}) {
  const id = query.id;

  let startedQuestions = await fetcher(`http://192.168.43.15:3001/test/${id}`);
  startedQuestions = await startedQuestions.json();
  startedQuestions = startedQuestions.result.questions.map(el => (el.activeIndex = null, el));

  return {
    props: {
      startedQuestions,
      id
    }
  };
}