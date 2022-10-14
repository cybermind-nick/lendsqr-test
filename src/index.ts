import app from './server';
import "reflect-metadata"

app.listen('8080', () => {
  console.log('Listening on Port: 8080');
});
