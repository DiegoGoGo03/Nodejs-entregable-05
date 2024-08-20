require('../models');
const sequelize = require('../utils/connection')

const testMigrate = async () => {
  try {
    await sequelize.sync({ force: true })
    console.log('Database reset successful ✅')
    process.exit()
  } catch (error) {
    console.error('Database reset failed ❌', error)
    process.exit(1)
  }
}

testMigrate()