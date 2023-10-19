import app from './app';
import { connectDB } from './database/connection';

const port = process.env.PORT || 5000;
app.listen(port, async () => {
  /* eslint-disable no-console */
  await connectDB();
  console.log(`✨App running: http://localhost:${port}`);
  /* eslint-enable no-console */
});
