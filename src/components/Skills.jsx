import { useEffect, useReducer } from 'react';
import axios from 'axios';
import { skillReducer, initialState, actionTypes } from '../reducers/skillReducer';
const [state, dispatch] = useReducer(skillReducer, initialState);

// generateLanguageCountObj関数をコンポーネント外に移動
const generateLanguageCountObj = (allLanguageList) => {
    const notNullLanguageList = allLanguageList.filter(language => language != null);
    const uniqueLanguageList = [...new Set(notNullLanguageList)];

    return uniqueLanguageList.map(item => {
        return {
            language: item,
            count: allLanguageList.filter(language => language === item).length
        }
    });
};

export const Skills = () => {
    const [languageList, setLanguageList] = useState([]);
    
    useEffect(() => {
        dispatch({ type: actionTypes.fetch });
        axios.get('https://api.github.com/users/hukuryo/repos')
            .then((response) => {
                const languageList = response.data.map(res => res.language);
                const countedLanguageList = generateLanguageCountObj(languageList);
                dispatch({ type: actionTypes.success, payload: { languageList: countedLanguageList } });
            })
            .catch(() => {
                dispatch({ type: actionTypes.error });
            });
    }, []);

    return (
        <div id="skills">
            <div className="container">
                <div className="heading">
                    <h2>Skills</h2>
                </div>
                <div className="skills-container">
                    {/* languageListを使用してデータを表示 */}
                </div>
            </div>
        </div>
    );
};
