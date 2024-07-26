const userQueries = {
    insertUser: 'INSERT INTO usuario (nombre, apellido, numero_telefono, fecha_nacimiento, dni, email, contraseña, rol_id) values (?, ?, ?, ?, ?, ?, ?, ?)',
    // insertImage => Hacer un insert de las imagenes
    checkIfExist: 'SELECT * FROM usuario WHERE nombre = ? AND apellido = ? AND numero_telefono = ? AND fecha_nacimiento = ? AND dni = ? AND email = ?'
}

export default userQueries;