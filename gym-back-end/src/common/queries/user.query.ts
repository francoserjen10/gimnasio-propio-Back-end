const userQueries = {
insertUser: 'INSERT INTO usuario (nombre, apellido, numero_telefono, fecha_nacimiento, dni, email, contraseña, rol_id) values (?, ?, ?, ?, ?, ?, ?, ?)',
// insertImage => Hacer un insert de las imagenes
}

export default userQueries;