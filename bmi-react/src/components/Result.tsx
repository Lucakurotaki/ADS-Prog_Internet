interface ResultProps{
    value: any;
    label: string;
}

export function Result({value, label}: ResultProps){
    return(
        <section id="result">{label}<span>{value}</span> </section>
    )
}