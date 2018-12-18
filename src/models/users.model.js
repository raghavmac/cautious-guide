
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
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
    name: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'users'
  });

  /**
   * Associates
   */
  Users.associate = (models) => {
    Users.hasMany(models.Listings, {
      as: 'listings',
      foreignKey: 'created_by',
      sourceKey: 'id'
    });
    Users.hasMany(models.Applications, {
      as: 'applications',
      foreignKey: 'user_id',
      sourceKey: 'id'
    });
  };

  /**
   * Statistics
   */
  Users.getActiveUsers = function getActiveUsers() {
    return Users.findAll({
      attributes: [
        'id', 'created_at', 'name',
        [sequelize.fn('count', sequelize.col('applications.id')), 'count']
      ],
      include: [
        {
          model: this.sequelize.import('./listings.model.js'),
          attributes: ['name'],
          as: 'listings'
        },
        {
          model: this.sequelize.import('./applications.model.js'),
          attributes: [],
          as: 'applications'
        }
      ],
      group: ['Users.id', 'listings.id'],
      order: [[sequelize.fn('count', sequelize.col('listings.name')), 'DESC']]
    });
  };

  Users.getById = function getById(id) {
    return Users.findOne({ where: { id } });
  };

  return Users;
};
