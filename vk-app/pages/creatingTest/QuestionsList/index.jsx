import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import styles from './style.module.scss';
import fetcher from '../../../helpers/fetcher';

const QuestionsList = ({test, setTest, showQuestion, addQuestion}) => {

    const [name, setName] = useState(test.name);
    const [description, setDescription] = useState(test.description);

    const saveTest = async () => {
        const _test = {...test};
        _test.description = description;
        _test.name = name;

        let result = await fetcher('http://192.168.43.15:3001/test', {
            method: 'POST',
            body: _test
        })
        result = result.json();
        console.log(result)
    }

    return (
        <React.Fragment>
            <header>
                <Button icon='pi pi-arrow-left' className='p-button-text' />
            </header>
            <label htmlFor="name" className='p-mt-3 p-d-block'>Название теста</label>
            <InputText 
                id='name' 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                onBlur={() => setTest((test.name = name, {...test}))}
                className={styles.input}
            />
            <label htmlFor="description" className='p-mt-3 p-d-block'>Описание теста</label>
            <InputTextarea 
                id='description' 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                onBlur={() => setTest((test.description = description, {...test}))}
                className={styles.textarea}
                autoResize
            />
            <h2>Список вопросов</h2>
            <ul className={styles.questionsList}>
                {test.questions.map((el, i) => 
                    <li 
                        className={styles.questionsList__item}
                        onClick={() => showQuestion(i)}
                        key={i}
                    >
                        {el.description}
                    </li>
                )}
            </ul>
            <Button 
                icon='pi pi-plus' 
                label='Добавить вопрос' 
                onClick={addQuestion}
            />
            <Button
                label='Сохранить тест'
                onClick={saveTest}
                className={styles.blockButton}
            />
        </React.Fragment>
    )
}

export default QuestionsList;