import logo from './logo.svg';
import './App.css';
import ImageUploader from './component/ImageUploader';
import ImageToText from './component/ImageToText';

function App() {
  return (
    <div className="App">
      <ImageUploader></ImageUploader>
      {/* <ImageToText></ImageToText> */}
    </div>
  );
}

export default App;
