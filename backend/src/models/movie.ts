import { DataTypes, Model } from 'sequelize';
import database from '../config/dbConfig';

interface MovieAttributes {
    id: string;
    title: string;
    poster?: string;
    year?: number;
    description?: string;
    type?: string;
    thumbsUp: number;
    thumbsDown: number;
    likedBy: string[];
    dislikedBy: string[];
}

class Movie extends Model<MovieAttributes> implements MovieAttributes {
    declare id: string;
    declare title: string;
    declare poster?: string;
    declare year?: number;
    declare description?: string;
    declare type?: string;
    declare thumbsUp: number;
    declare thumbsDown: number;
    declare likedBy: string[];
    declare dislikedBy: string[];
}

Movie.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        poster: {
            type: DataTypes.STRING,
        },
        year: {
            type: DataTypes.INTEGER,
        },
        description: {
            type: DataTypes.TEXT,
        },
        type: {
            type: DataTypes.STRING,
        },
        thumbsUp: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        thumbsDown: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        likedBy: {
            type: DataTypes.JSON,
            defaultValue: [],
        },
        dislikedBy: {
            type: DataTypes.JSON,
            defaultValue: [],
        },
    },
    {
        sequelize: database,
        modelName: 'Movie',
        timestamps: false,
        freezeTableName: true,
    }
);

export default Movie;