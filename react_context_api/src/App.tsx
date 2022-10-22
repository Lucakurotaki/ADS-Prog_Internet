import {Heading} from './components/Heading';
import {Section} from './components/Section';
import './App.css';

function App() {
  return (
    <Section>
      <Heading>Título</Heading>
      <Section>
        <Heading>Heading nível 1</Heading>
        <Heading>Heading nível 1</Heading>
        <Heading>Heading nível 1</Heading>
        <Heading>Heading nível 1</Heading>
        <Heading>Heading nível 1</Heading>
        <Heading>Heading nível 1</Heading>
        <Section>
          <Heading>Heading nível 2</Heading>
          <Heading>Heading nível 2</Heading>
          <Heading>Heading nível 2</Heading>
          <Heading>Heading nível 2</Heading>
          <Section>
            <Heading>Heading nível 3</Heading>
            <Heading>Heading nível 3</Heading>
            <Heading>Heading nível 3</Heading>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}

export default App;
