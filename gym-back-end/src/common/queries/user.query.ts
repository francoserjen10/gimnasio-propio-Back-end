const userQueries = {
    insertUser: 'INSERT INTO usuario (nombre, apellido, numero_telefono, fecha_nacimiento, dni, email, contraseña, rol_id, contacto_de_emergencia, dirección) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    // insertImage => Hacer un insert de las imagenes
    checkIfExist: 'SELECT * FROM usuario WHERE nombre = ? AND apellido = ? AND numero_telefono = ? AND fecha_nacimiento = ? AND dni = ? AND email = ? AND contacto_de_emergencia = ? AND dirección = ?',
    selectAll: 'SELECT * FROM usuario',
    selectByEmail: 'SELECT * FROM usuario WHERE email = ?'
}

export default userQueries;