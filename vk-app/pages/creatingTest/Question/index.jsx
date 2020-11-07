import React, {useState} from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import styles from './styles.module.scss';
import AnswerItem from './answerItem';

const Question = ({question, index, setTest, showAnswers}) => {

    const [description, setDescription] = useState(question.description);
    const [answers, setAnswers] = useState(question.answers);
    const [correctIndex, setCorrectIndex] = useState(answers.findIndex(el => el.is_correct));

    const addAnswer = () => {
        setAnswers([...answers, {
            description: '',
            is_correct: false
        }])
    }

    const saveAnswer = () => {
        let _answers = answers.map((el, i) => {
            if(i === correctIndex)
                el.is_correct = true
            else
                el.is_correct = false;
            return el;
        })

        setTest({
            description,
            type: 'single',
            answers: _answers
        })
    }

    return (
        <React.Fragment>
            <header className='p-d-flex p-jc-between p-ai-center'>
                <Button 
                    icon='pi pi-list' 
                    className='p-button-text p-button-secondary p-button-rounded' 
                    onClick={showAnswers}
                />
            </header>
            <h3>Вопрос {index}</h3>
            <label htmlFor="description" className={styles.label}>Введите вопрос</label>
            <InputText 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                className={styles.input}
            />
            <h3>Ответы</h3>
            <ul className={styles.answersList}>
                {answers.map((el, i) => 
                    <AnswerItem
                        key={i}
                        el={el}
                        i={i}
                        answers={answers}
                        setAnswers={setAnswers}
                        correctIndex={correctIndex}
                        setCorrectIndex={setCorrectIndex}
                    />
                )}
            </ul>
            <Button 
                icon='pi pi-plus' 
                label='Добавить ответ'
                onClick={addAnswer}
            />
            <Button
                label='Сохранить вопрос'
                onClick={saveAnswer}
                className={styles.blockButton}
            />
        </React.Fragment>
    )
}

export default Question;