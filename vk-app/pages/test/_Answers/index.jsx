import React from 'react';
import { RadioButton } from 'primereact/radiobutton';
import styles from './styles.module.scss';

const Answers = ({answers, activeIndex, setActiveIndex}) => {
    return (
        <ul>
            {answers.map((el, i) => 
                <li 
                    key={i} 
                    className={['p-d-flex p-jc-between p-ai-center', styles.item].join(' ')}
                    onClick={() => setActiveIndex(el.id)}
                >
                    <span>{el.description}</span>
                    <RadioButton 
                        value={el.id} 
                        name='answer' 
                        checked={activeIndex === el.id}
                        onChange={(e) => {
                            e.originalEvent.stopPropagation();
                            setActiveIndex(el.id)
                        }}
                    />
                </li>
            )}
        </ul>
    )
}

export default Answers;