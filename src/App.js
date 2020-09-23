import React, { useEffect, useState } from 'react';
import './App.css';
import List from './component/List';
import withListLoading from './component/withListLoading';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
  
function App() {
  const ListLoading = withListLoading(List);
  const [appState, setAppState] = useState({
    loading: false,
    repos: null,
    Url: ''
  });
  const classes = useStyles();
  const [tipo, setTipo] = React.useState('');

  const handleChange = (event) => {
    console.log('handleChange')
    
    setTipo(event.target.value);
    setAppState({ loading: true });

    console.log(tipo+' ** '+event.target.value)
    if(event.target.value > 0){
      appState.Url = 'https://bmain.bookplay.com.br/parceiros/6BB6F620/recrutamento/top10/acessos/'+event.target.value;
    }else{
      appState.Url = 'https://bmain.bookplay.com.br/parceiros/6BB6F620/recrutamento/top10/acessos';
    }
  
    fetch(appState.Url)
      .then((res) => res.json())
      .then((repos) => {
        console.log(repos)
        console.log(repos.success)
        if(repos.success){
          setAppState({ loading: false, repos: repos.data });
        }else{
          setAppState({ loading: false, repos: [] });
        }
      });
  };

  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Seu site
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  useEffect(() => {
    setAppState({ loading: true });
    console.log('useEffect')
    const apiUrl = 'https://bmain.bookplay.com.br/parceiros/6BB6F620/recrutamento/top10/acessos';

    fetch(apiUrl)
      .then((res) => res.json())
      .then((repos) => {
        console.log(repos)
        console.log(repos.success)
        if(repos.success){
          setAppState({ loading: false, repos: repos.data });
        }else{
          setAppState({ loading: false, repos: [] });
        }
      });
  }, [setAppState]);
  return (
    <div className='App'>
      <div className='container'>
        <h1>Anderson Luiz Sartori</h1>
      </div>
      <div className='repo-container'>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-helper-label">Tipos de conteúdo</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={tipo}
          onChange={handleChange}
        >
          <MenuItem value=''>
            <em>Selecione</em>
          </MenuItem>
          <MenuItem value={1}>Livros</MenuItem>
          <MenuItem value={2}>Cursos</MenuItem>
          <MenuItem value={3}>Videoaulas</MenuItem>
          <MenuItem value={4}>Banca</MenuItem>
          <MenuItem value={5}>Audiobooks</MenuItem>

        </Select>
      </FormControl>
        <ListLoading isLoading={appState.loading} repos={appState.repos} />
      </div>
      <footer>
        <Typography variant="body1">Meu rodapé.</Typography>
        <Copyright />
      </footer>
    </div>
  );
}
export default App;
