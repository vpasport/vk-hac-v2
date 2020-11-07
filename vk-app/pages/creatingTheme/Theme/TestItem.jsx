import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import styles from './style.module.scss';

const TestItem = ({ el, i, blocks, setBlocks }) => {

    const [attachment, setAttachment] = useState(el.attachment)

    return (
        <li className={styles.answersList__item}>
            <label htmlFor="attachment" className={styles.label}>Введите текст</label>
            {el.type === 'text' ?
                <InputTextarea
                    value={attachment}
                    onChange={(e) => setAttachment(e.target.value)}
                    onBlur={() => setBlocks((blocks[i].attachment = attachment, [...blocks]))}
                    autoResize
                    className={styles.input}
                />
                :
                <InputText
                    value={attachment}
                    onChange={(e) => setAttachment(e.target.value)}
                    onBlur={() => setBlocks((blocks[i].attachment = attachment, [...blocks]))}
                    className={styles.input}
                />
            }
        </li>
    )
}

export default TestItem;