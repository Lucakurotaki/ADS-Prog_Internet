import { useState } from 'react';
import './App.css';
import { Button } from './components/Button';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { InputControl } from './components/InputControl';
import { Result } from './components/Result';

function App() {
  const [bmi, setBmi] = useState(0);
  const [name, setName] = useState('');
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);

  const onChangeSetName = (event: any) => {
    setName(event.target.value)
  }

  const onChangeSetWeight = (event: any) => {
    setWeight(event.target.value)
  }

  const onChangeSetHeight = (event: any) => {
    setHeight(event.target.value)
  }

  const calculateBmi = (weight: number, height: number) => {
    const result = weight / (height * height);

    setBmi(result);
  }

  const onClick = () => {
    calculateBmi(weight, height);
    console.log(bmi);
  }

  return (
    <div id="container">
      <Header />

      <main>
        <h2>Type your data</h2>

        <form action="#">
          <InputControl label='Name: ' value={name} type='string' onChangeCallback={onChangeSetName} placeHolder='Type your name...' />

          <InputControl label='Weight: ' value={weight} type='number' onChangeCallback={onChangeSetWeight} placeHolder='Type your weight...' />

          <InputControl label='Height: ' value={height} type='number' onChangeCallback={onChangeSetHeight} placeHolder='Type your height...' />

          <Button label='Calculate' onClickCallback={onClick} />
        </form>

        <Result bmi={bmi} />

      </main>

      <Footer />
    </div>
  );
}

export default App;
