import mongoose from 'mongoose';
import bcrypt from 'bcrypt'; // Importa bcrypt

const doctorSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    password : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    Celuar : {
        type: String,
        default: null,
        trim: true
    },
    token : {
        type: String,
    },
    confirmado : {
        type: Boolean,
        default: false
    },
});

// Antes de guardar, hashea el password
doctorSchema.pre('save', async function(next) {
    const doctor = this;
    if (doctor.isModified('password')) {
        doctor.password = await bcrypt.hash(doctor.password, 10);
    }
    next();
});

// Método para comparar passwords
doctorSchema.methods.comparePassword = async function(candidatePassword) {
    const isPasswordValid = await bcrypt.compare(candidatePassword, this.password);
    console.log('¿La contraseña es válida?', isPasswordValid);
    return isPasswordValid;
};

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;