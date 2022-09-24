interface ResultProps{
    bmi: number;
}

export function Result({bmi}: ResultProps){
    return(
        <section id="result">BMI: <span>{bmi.toFixed(2)}</span> </section>
    )
}