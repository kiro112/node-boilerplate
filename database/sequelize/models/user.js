'use strict';

const tableName = 'user';

module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define(tableName, {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updated: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        },
        deleted: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        }
    }, {
        tableName,
        freezeTablename: true,
        timestamps: true,
        paranoid: false,    // true ? soft delete : no     > timestamp related
        deletedAt: 'deleted',
        createdAt: 'created',
        updatedAt: 'updated'
    });

    return Model;
};