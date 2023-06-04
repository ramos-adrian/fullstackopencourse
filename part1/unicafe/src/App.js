import {useState} from "react";

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({name, value}) => {
    return (<>
        <td>{name}</td>
        <td>{value}</td>
    </>)
}

const Statistics = ({goodRates, neutralRates, badRates}) => {
    const all = goodRates + neutralRates + badRates
    const average = (goodRates - badRates) / all
    const positive = goodRates / all * 100
    if (all === 0) return <div>No feedback given</div>
    return (<table>
            <tbody>
            <tr>
                <StatisticLine name={'Good'} value={goodRates}/>
            </tr>
            <tr>
                <StatisticLine name={'Neutral'} value={neutralRates}/>
            </tr>
            <tr>
                <StatisticLine name={'Bad'} value={badRates}/>
            </tr>
            <tr>
                <StatisticLine name={'All'} value={all}/>
            </tr>
            <tr>
                <StatisticLine name={'Average'} value={average}/>
            </tr>
            <tr>
                <StatisticLine name={'Positive'} value={positive + ' %'}/>
            </tr>
            </tbody>
        </table>)
}

function App() {
    const [goodRates, setGoodRates] = useState(0)
    const [neutralRates, setNeutralRates] = useState(0)
    const [badRates, setBadRates] = useState(0)

    return (<div>
        <h1>Give Feedback</h1>
        <Button text={'Good'} onClick={() => setGoodRates(goodRates + 1)}/>
        <Button text={'Neutral'} onClick={() => setNeutralRates(neutralRates + 1)}/>
        <Button text={'Bad'} onClick={() => setBadRates(badRates + 1)}/>
        <h1>Statistics</h1>
        <Statistics goodRates={goodRates} neutralRates={neutralRates} badRates={badRates}/>
    </div>)
}

export default App;
