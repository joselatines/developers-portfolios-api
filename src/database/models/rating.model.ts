import { DataTypes, UUID } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { sequelize } from '../connection';
import { Portfolio } from './portfolio.model';
import { User } from './user.model';

export interface RatingsDocument {
  rating: number;
  portfolio_id: number;
  user_id: number;
}

export const Ratings = sequelize.define('Ratings', {
  id: {
    type: UUID,
    defaultValue: uuidv4(),
    primaryKey: true,
  },
  rating: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  portfolio_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: Portfolio,
      key: 'id',
    },
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
});
