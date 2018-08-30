module.exports = (sequelize, Sequelize) => {
	const Role = sequelize.define('role', {
		authority: {
				type: Sequelize.STRING//, unique: true
		}	
	});
	return Role;
}