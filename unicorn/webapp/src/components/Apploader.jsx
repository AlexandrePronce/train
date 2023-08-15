import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { ProviderWrapper } from 'contexts/unicornsContext';

const AppLoader = () => {
  return (
    <ProviderWrapper>
      < Router>
        <App />
      </Router>
      </ProviderWrapper>
   
  );
};

export default AppLoader;