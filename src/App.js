import './App.css';
import Contact from './components/Contact'
import PageHeader from './components/PageHeader'
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';



function App() {
  
  return (
    <div>
      <PageHeader
                title="Phone Book"
                subTitle="New Contact"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
      <Contact />
      
    </div>
  );
}

export default App;
