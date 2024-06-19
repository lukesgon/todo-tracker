import './App.css';
import Display from './component/Display/Display';
import CalendarComponent from './component/CalendarComponent/CalendarComponent';
import { useState } from 'react';
import InfoSection from './component/InfoSection/InfoSection';

type dateType = string | null;

function App() {
  const [date, setDate] = useState<dateType>(null);

  function newDate(object: dateType) {
    setDate(object);
  };

  return (
    <section className='app-view'>
      <Display
      className='general-display'
      date={date} />
      <section className='second-section'>
        <CalendarComponent
        className='calendar-component'
        onChange={newDate} />
        <InfoSection
        className='info-section'/>
      </section>
    </section>
  );
}

export default App;
