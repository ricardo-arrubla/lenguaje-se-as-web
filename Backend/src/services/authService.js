const jwt = require('jsonwebtoken');
const User = require('../models/User');

class AuthService {
  // Generar JWT
  generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || '7d'
    });
  }

  // Registrar nuevo usuario
  async register(userData) {
    const { name, email, password, isDeaf } = userData;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('El email ya está registrado');
    }

    // Crear usuario
    const user = await User.create({
      name,
      email,
      password,
      isDeaf: isDeaf || false
    });

    // Generar token
    const token = this.generateToken(user._id);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isDeaf: user.isDeaf
      },
      token
    };
  }

  // Login
  async login(email, password) {
    // Buscar usuario incluyendo password
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    // Verificar contraseña
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error('Credenciales inválidas');
    }

    // Actualizar racha de días
    user.updateStreak();
    await user.save();

    // Generar token
    const token = this.generateToken(user._id);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isDeaf: user.isDeaf,
        progress: user.progress
      },
      token
    };
  }

  // Obtener usuario por ID
  async getUserById(userId) {
    const user = await User.findById(userId)
      .populate('progress.lessonsCompleted', 'title category level');
    
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    return user;
  }

  // Verificar token
  verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error('Token inválido o expirado');
    }
  }

  // Actualizar perfil
  async updateProfile(userId, updates) {
    const allowedUpdates = ['name', 'avatar', 'isDeaf'];
    const filteredUpdates = {};

    Object.keys(updates).forEach(key => {
      if (allowedUpdates.includes(key)) {
        filteredUpdates[key] = updates[key];
      }
    });

    const user = await User.findByIdAndUpdate(
      userId,
      filteredUpdates,
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    return user;
  }

  // Cambiar contraseña
  async changePassword(userId, currentPassword, newPassword) {
    const user = await User.findById(userId).select('+password');
    
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Verificar contraseña actual
    const isValid = await user.comparePassword(currentPassword);
    if (!isValid) {
      throw new Error('Contraseña actual incorrecta');
    }

    // Actualizar contraseña
    user.password = newPassword;
    await user.save();

    return { message: 'Contraseña actualizada exitosamente' };
  }
}

module.exports = new AuthService();