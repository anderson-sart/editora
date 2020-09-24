import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container'
import LinkIcon from '@material-ui/icons/Link';
const List = (props) => {
  const { repos } = props;
  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });
 function DescConteudo({ id }){
  switch (id) {
    case 1:
      return 'Livros';
    case 2:
      return 'Cursos';
    case 3:
      return 'Videoaulas';
    case 4:
      return 'Banca';
    case 5:
        return 'Audiobooks';  
    default:
      return id;
  }
 }
 function LivroClick({ id }){
  const Url = 'https://bookplay.com.br/conteudo/'+id;

   return (
    <a href={Url} target="CodLivro" rel="noopener" color="inherit">  
        <LinkIcon />
    </a>);
 }
  const classes = useStyles();
  if (!repos || repos.length === 0) return <p>Sem resposta da consulta, desculpa.</p>;
  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Cod Livro</StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>
                  <StyledTableCell align="right">Cod Conteudo</StyledTableCell>
                  <StyledTableCell align="right">Nome</StyledTableCell>
                  
                </TableRow>
              </TableHead>
              <TableBody>
      {repos.map((repo) => {
        return (
          <StyledTableRow key={repo.CodLivro}>
          <StyledTableCell component="th" scope="row">
            {repo.CodLivro}
          </StyledTableCell>
          <StyledTableCell align="right">
            <LivroClick key={repo.CodLivro} id={repo.CodLivro} />
          </StyledTableCell>
          <StyledTableCell align="right"><DescConteudo key={repo.CodConteudo} id={repo.CodConteudo} /></StyledTableCell>
          <StyledTableCell align="right">{repo.Nome}</StyledTableCell>
          
        </StyledTableRow>

        );

      })}
              </TableBody>
            </Table>
        </TableContainer>
      </Container>
    </React.Fragment>
  );
};
export default List;