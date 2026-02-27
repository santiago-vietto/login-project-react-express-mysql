# Proyecto de Login

### Descripción

Proyecto web full stack con autenticación.

---

### Tecnologías iplementadas

- **Database:** MySQL  
- **Backend:** Node.js, Express, Prisma  
- **Frontend:** React  

---

## Database 

### Instalación de MySQL Server (Ubuntu) y creación de DB.

1) Instalación y comandos de arranque/estado/detección.

```bash
sudo apt update
sudo apt install mysql-server -y

sudo systemctl start mysql
sudo systemctl status mysql
sudo systemctl stop mysql
```

2) Configuración y prueba usuario root con contraseña.

```bash
sudo mysql

ALTER USER 'root'@'localhost'
IDENTIFIED WITH mysql_native_password
BY 'root';

FLUSH PRIVILEGES;

exit;

mysql -u root -p

(Password: root)
```

3) Creación de base de datos, y creación de usuario y contraseña para la la misma.

```bash
mysql -u root -p

CREATE DATABASE mysqlloginproject;
exit;

mysql -u root -p

CREATE USER 'loginuser'@'localhost' IDENTIFIED BY 'LoginPass123!';
GRANT ALL PRIVILEGES ON mysqlloginproject.* TO 'loginuser'@'localhost';
FLUSH PRIVILEGES;
exit;
```

## Backend 

### Instalación y configuración del servicio

1) Instalación de dependencias y ejecución del servicio.

```bash
cd backend
npm install

npm run dev
```

2) Estructura de archivo .env en directorio backend/

```bash
PORT=

FRONTEND_URL=

DATABASE_URL=
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_NAME=
DATABASE_HOST=
DATABASE_PORT=

JWT=
```

## Frontend

### Instalación del servicio

1) Instalación de dependencias y ejecución del servicio.

```bash
cd frontend
npm install

npm run dev
```