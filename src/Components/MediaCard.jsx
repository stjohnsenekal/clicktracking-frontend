import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  positive: {
    maxWidth: 400,
    margin: "auto",
    transition: "0.3s",
      boxShadow: "0 8px 40px -12px #05850b",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  negative: {
    maxWidth: 400,
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px #850505",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  media: {
    height: 400,
  },
});

export default function MediaCard(props) {
  const classes = useStyles();

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'React POST Request Example' }) 
  }

  const process = (action) => {
    requestOptions.body = JSON.stringify({ name: props.name, action });

    fetch('http://127.0.0.1:3001/update', requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));
  }

  const severityClass = props.score >= 0 ? classes.positive : classes.negative;

  return (
    <Card className={severityClass}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.url}
          title={props.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.project}
          </Typography>
          <Typography gutterBottom variant="h6" component="h4">
            Developer: {props.name}
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            {props.info}
          </Typography>
          
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={() => {
            props.onChange(!props.staleData);
            process("bug");
          }}>
          Report Bug
        </Button>
        <Button size="small" color="primary" onClick={() => {
            props.onChange(!props.staleData);
            process("validate");
          }}>
          Validate
        </Button>
        <Button size="small" color="primary">
          Total score {props.score}
        </Button>
      </CardActions>
    </Card>
  );
}