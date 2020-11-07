import React, { useState } from 'react';
import styles from './styles.module.scss';
import { RadioButton } from 'primereact/radiobutton';
import { InputText } from 'primereact/inputtext';

const answerItem = ({i, correctIndex, setCorrectIndex, el, answers, setAnswers}) => {

    const [description, setDescription] = useState(el.description);

    return (
        <li className={styles.answersList__item}>
            <RadioButton
                value={i}
                name='answers'
                checked={i === correctIndex}
                onChange={() => setCorrectIndex(i)}
            />
            <div className={styles.answersList__info}>
                <label
                    htmlFor={`answer${i}`}
                    className={styles.label}
                >
                    Вариант {i + 1}
                </label>
                <InputText
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={styles.input}
                    onBlur={() => setAnswers((answers[i].description = description, [...answers]))}
                />
            </div>
        </li>
    )
}

export default answerItem;