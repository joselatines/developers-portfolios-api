import { DataTypes } from 'sequelize';
import { User } from './user.model';
import { Ratings } from './rating.model';
import { sequelize } from '../connection';

const PORTFOLIO_TYPES = {
  backend: 'backend',
  frontend: 'frontend',
  fullstack: 'fullstack',
  mobile: 'mobile',
  software: 'software',
} as const;

type IPortfolioType = keyof typeof PORTFOLIO_TYPES;

export interface PortfolioDocument {
  thumbnail: string;
  created_by: number;
  website_link: string;
  type: IPortfolioType;
  title: string;
  description?: string;
  id: string;
}

export const Portfolio = sequelize.define('Portfolio', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  thumbnail: {
    type: DataTypes.TEXT, // Updated data type
    allowNull: false,
    defaultValue:
			'https://tonsofthanks.com/wp-content/uploads/2023/08/Funny-Dog-at-Work-Meme.jpg',
  },
  created_by: {
    type: DataTypes.UUID, // Assuming User id is UUID
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  website_link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  github_link: {
    type: DataTypes.STRING,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [Object.values(PORTFOLIO_TYPES)],
    },
    defaultValue: 'frontend',
  },
});

Portfolio.belongsTo(User, { foreignKey: 'created_by' }); // A Portfolio belongs to one user
Portfolio.hasMany(Ratings, { foreignKey: 'portfolio_id' }); // A Portfolio has many ratings
