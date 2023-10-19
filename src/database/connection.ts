import { Sequelize } from 'sequelize';
import { User } from './models/user.model';
// TODO: ADD DB NAME TO ENV
/* if ((!DB_NAME, !DB_USER_NAME, !DB_NAME))
	throw new BadRequestError("Env variables are not presented on db connection"); */

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './my_db.sqlite',
});

export async function connectDB() {
  try {
    console.info('trying to connect DB...');
    await sequelize.authenticate();
    await sequelize.sync();

    console.info('✨ db sequelize connected successfully');
  } catch (error) {
    console.error('an error occurred while trying to connect to db');
    console.error(error);
  }
}

export async function clearDB() {
  try {
    console.info('clearing tables...');
    await User.truncate();
    console.info('tables cleared');
  } catch (error) {
    console.error('an error occurred while trying to clear db tables');
    console.error(error);
  }
}

export async function closeDB() {
  try {
    console.info('closing db');
    await sequelize.close();
    console.info('dn is closed');
  } catch (error) {
    console.info('an error occurred while trying to close db');
    console.error(error);
  }
}
