import './App.css';
import Navbar from './components/navbar/navbar.js';
import About from './components/about/about.js';
import Footer from './components/footer/footer.js';
import WhyAlita from './components/whyalita/whyalita';
function App() {
  return (
    <div className="App">
      <Navbar />
      <About />
      <WhyAlita/>
      <Footer/>
    </div>
  );
}

export default App;
