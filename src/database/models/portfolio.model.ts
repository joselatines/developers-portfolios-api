import { DataTypes, UUID, UUIDV4 } from 'sequelize';
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
  images: string[];
  created_by: number;
  website_link: string;
  type: IPortfolioType;
  title: string;
  description?: string;
}

export const Portfolio = sequelize.define(
  'Portfolio',
  {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    images: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.INTEGER,
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
  },
  {
    timestamps: false,
  },
);

Portfolio.belongsTo(User, { foreignKey: 'created_by' }); // A Portfolio belongs to one user
Portfolio.hasMany(Ratings, { foreignKey: 'portfolio_id' }); // A Portfolio has many ratings
