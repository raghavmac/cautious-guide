
module.exports = (sequelize, DataTypes) => {
  const Teams = sequelize.define('Teams', {
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'companies',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    contact_user: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  }, {
    tableName: 'teams'
  });

  /**
   * Associates
   */
  Teams.associate = (models) => {
    Teams.belongsTo(models.Companies, { as: 'companies', foreignKey: 'company_id' });
  };

  /**
   * Statistics
   */
  Teams.getAllByUser = function getAllByUser(id) {
    return Teams.findAll({
      where: { user_id: id },
      attributes: [
        'companies.id', 'companies.name', 'companies.created_at',
        ['contact_user', 'isContact']
      ],
      include: [{
        model: this.sequelize.import('./companies.model.js'),
        attributes: [],
        as: 'companies',
        required: true
      }],
      raw: true
    });
  };

  // Model
  return Teams;
};