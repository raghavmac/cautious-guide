
module.exports = (sequelize, DataTypes) => {
  const Listings = sequelize.define('Listings', {
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
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'listings'
  });

  /**
   * Statistics
   */
  Listings.getAllByUser = function getAllByUser(id) {
    return Listings.findAll({ where: { created_by: id } });
  };

  // Model
  return Listings;
};
