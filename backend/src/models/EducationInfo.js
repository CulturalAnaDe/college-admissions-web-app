module.exports = (sequelize, DataTypes) => {
    return sequelize.define('EducationInfo', {
        baseClass: {
            type: DataTypes.INTEGER,
            defaultValue: 9
        },
        honorsCertificate: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        graduationYear: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        educationLanguage: {
            type: DataTypes.ENUM('ru', 'kz'),
            allowNull: false
        }
    });
};