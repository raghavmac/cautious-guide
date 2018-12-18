
module.exports = (sequelize, DataTypes) => {
  const Applications = sequelize.define('Applications', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.fn('now')
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    listing_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'listings',
        key: 'id'
      }
    },
    cover_letter: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'applications'
  });

  /**
   * Associates
   */
  Applications.associate = (models) => {
    Applications.belongsTo(models.Listings, { as: 'listings', foreignKey: 'listing_id' });
  };

  /**
   * Statistics
   */
  Applications.getAllByUser = function getAllByUser(id) {
    return Applications.findAll({
      where: { user_id: id },
      include: [{
        model: this.sequelize.import('./listings.model.js'),
        required: true,
        as: 'listings'
      }]
    });
  };

  return Applications;
};
