import React, {useState} from 'react';
import Container from '../../components/Container';
import Question from './Question';
import QuestionsList from './QuestionsList';

const CreatingTest = () => {

    const [visibleQuestion, setVisibleQuestion] = useState(false);
    const [activeQuestion, setActiveQuestion] = useState(null);
    const [index, setIndex] = useState(null);
    const [test, setTest] = useState({
        theme_id: 1,
        name: '',
        description: '',
        author: 5,
        questions: []
    })

    const showQuestion = (index) => {
        setActiveQuestion({...test.questions[index]});
        setVisibleQuestion(true);
        setIndex(index);
    }

    const updateTest = (question) => {
        const _test = {...test}
        _test.questions[index] = question;
        setTest(_test);
        setVisibleQuestion(false);
    }

    const showAnswers = () => {
        setVisibleQuestion(false);
    }

    const addQuestion = () => {
        const _test = {...test};
        _test.questions = [..._test.questions, {
            description: '',
            type: 'single',
            answers: []
        }];
        setTest(_test);
        setActiveQuestion({..._test.questions[_test.questions.length - 1]});
        setVisibleQuestion(true);
        setIndex(_test.questions.length - 1);
    }

    return (
        <Container>
            {visibleQuestion ? 
                <Question 
                    index={index + 1}
                    question={activeQuestion}
                    setTest={updateTest}
                    showAnswers={showAnswers}
                />
            :
                <QuestionsList 
                    test={test}
                    setTest={(test) => setTest({...test})}
                    showQuestion={(index) => showQuestion(index)}
                    addQuestion={addQuestion}
                />
            }
        </Container>
    )
}

export default CreatingTest;