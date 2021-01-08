import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css';
import MainContainer from './components/MainContainer';


function App() {
  return (
    <div className="App">
      <Header />
      <MainContainer />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
