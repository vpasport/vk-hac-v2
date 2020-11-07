import React, {useState} from 'react';
import Container from '../../components/Container';
import ThemesList from './ThemesList';
import Theme from './Theme';

const CreatingTheme = () => {

    const [theme, setTheme] = useState({
        name: '',
        parts: []
    })
    const [activeBlock, setActiveBlock] = useState(null);
    const [index, setIndex] = useState(null);
    const [visibleTheme, setVisibleTheme] = useState(false);

    const showTheme = (i) => {
        setActiveBlock({...theme.parts[i]});
        setVisibleTheme(true);
        setIndex(i)
    }

    const addTheme = () => {
        const _theme = {...theme};
        _theme.parts = [..._theme.parts, {
            name: '',
            part: _theme.parts.length,
            blocks: []
        }]
        setTheme(_theme);
        setActiveBlock({..._theme.parts[_theme.parts.length - 1]});
        setVisibleTheme(true);
        setIndex(_theme.parts.length - 1)
    }

    const updateTheme = (parts) => {
        const _theme = {...theme};
        _theme.parts[index] = parts;
        setTheme(_theme);
        setVisibleTheme(false);
    }

    return (
        <Container>
            {visibleTheme ? 
                <Theme 
                    index={index}
                    part={activeBlock}
                    setTheme={updateTheme}
                    showThemes={() => setVisibleTheme(false)}
                />
            :
                <ThemesList 
                    theme={theme}
                    showTheme={showTheme}
                    addTheme={addTheme}
                    setTheme={(theme) => setTheme({...theme})}
                />
            }
        </Container>
    )
}

export default CreatingTheme;