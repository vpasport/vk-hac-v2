import React from 'react';
import { Button } from 'primereact/button';
import Container from '../components/Container';
import { ProgressBar } from 'primereact/progressbar';
import styles from './test/style.module.scss';

export default function Home() {
  return (
    <Container>
      <div className=''>
        <header>
          <div className='p-d-flex p-jc-between p-ai-center'>
            <Button icon='pi pi-arrow-left' className='p-button-text p-button-rounded'/>
            <Button icon='pi pi-times' className='p-button-text p-button-rounded'/>
          </div>
          <ProgressBar value={15} showValue={false}/>
          <span className={['p-d-flex', 'p-jc-end', styles.progress].join(' ')}>1/5</span>
        </header>
        <div className={styles.content}>
          1234
        </div>
        <div className='p-d-flex p-jc-between p-ai-center'>
          <Button className={['p-button-secondary', styles.button].join(' ')} label='Назад' />
          <Button className={styles.button} label='Следующий'/>
        </div>
      </div>
    </Container>
  )
}
