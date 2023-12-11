import { DataTypes, UUID, UUIDV4 } from 'sequelize';
import { sequelize } from '../connection';
import { Portfolio } from './portfolio.model';
import { User } from './user.model';

export interface RatingsDocument {
  rating: number;
  portfolio_id: number;
  rated_by: number;
  comment?: string;
}

export const Ratings = sequelize.define('Ratings', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  rating: {
    type: DataTypes.NUMBER,
    allowNull: false,
    defaultValue: 10,
  },
  portfolio_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Portfolio,
      key: 'id',
    },
  },
  rated_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
});

Ratings.belongsTo(User, { foreignKey: 'rated_by' }); // A Portfolio belongs to one user
