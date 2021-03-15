import logo from './logo.svg';
import './App.css';
import MediaCard from './Components/MediaCard';
import Grid from '@material-ui/core/Grid';
import { useState, useEffect } from 'react';

function App() {

  const [developers, setDevelopers] = useState([]);
  const [staleData, setStaleData] = useState(false);

  function handleChange(newValue) {
    setStaleData(newValue);
  }

  useEffect(() => {
    fetch('http://127.0.0.1:3001/developers')
        .then(res => res.json())
        .then(data => {
          setDevelopers(data)
          console.log("data receieved: ", data)
        })
        .catch(console.log);
  }, [staleData])
  

  return (
    <div className="App">
      <header className="App-header">
        <h2>PROJECT MONITORING DASHBOARD</h2>
      <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
            >
              {developers.map( developer =>
                 <MediaCard 
                    url={developer.image} 
                    name={developer.name}
                    project={developer.project}
                    info={developer.info}
                    score={developer.score}
                    staleData={staleData}
                    onChange={handleChange}
                  />
              )}
        </Grid>
      </header>
    </div>
  );
}

export default App;
