const userDto = (user) => {
  if (!user) return null;

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.isAdmin ? "Administrador" : "Usuario común",
    isAdmin: user.isAdmin,
    team: user.team ? { id: user.team.id, name: user.team.name} : null,
    teamName: user.team?.name || "Sin team",
    createdAt: user.createdAt,
  };
};


const allUsersDto = (users) => {
  if (!users) return [];
  return users.map(userDto);
};


const registerUserDto = ({ username, email, password }) => {
  return {
    username: username.trim(),
    email: email.toLowerCase().trim(),
    password,
  };
};


const loginUserDto = ({ username, password }) => {
  return {
    username: username.trim(),
    password,
  };
};


const updateUserDto = (data) => {
  const dto = {};
  
  if (data.username) dto.username = data.username;
  if (data.email) dto.email = data.email;
  if (data.password) dto.password = data.password; 
  
  return dto;
};

module.exports = {
  userDto,
  allUsersDto,
  registerUserDto,
  loginUserDto,
  updateUserDto,
};