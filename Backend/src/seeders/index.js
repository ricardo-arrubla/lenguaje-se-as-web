require('dotenv').config();
const connectDB = require('../config/database');
const seedLessons = require('./lessonSeeder');
const User = require('../models/User');

const seedDatabase = async () => {
  try {
    // Conectar a la base de datos
    await connectDB();

    console.log('🌱 Iniciando seeding de la base de datos...\n');

    // Crear usuario admin por defecto
    const adminExists = await User.findOne({ email: 'admin@lsc.com' });
    
    if (!adminExists) {
      await User.create({
        name: 'Administrador',
        email: 'admin@lsc.com',
        password: 'Admin123!',
        role: 'admin',
        isDeaf: false
      });
      console.log('✅ Usuario admin creado (email: admin@lsc.com, password: Admin123!)');
    } else {
      console.log('ℹ️  Usuario admin ya existe');
    }

    // Crear usuario de prueba
    const testUserExists = await User.findOne({ email: 'usuario@test.com' });
    
    if (!testUserExists) {
      await User.create({
        name: 'Usuario Prueba',
        email: 'usuario@test.com',
        password: 'Test123!',
        role: 'usuario',
        isDeaf: true
      });
      console.log('✅ Usuario de prueba creado (email: usuario@test.com, password: Test123!)');
    } else {
      console.log('ℹ️  Usuario de prueba ya existe');
    }

    // Crear lecciones
    await seedLessons();

    console.log('\n🎉 Seeding completado exitosamente!');
    console.log('\n📝 Credenciales de acceso:');
    console.log('   Admin: admin@lsc.com / Admin123!');
    console.log('   Usuario: usuario@test.com / Test123!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error en seeding:', error);
    process.exit(1);
  }
};

seedDatabase();