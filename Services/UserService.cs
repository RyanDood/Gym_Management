using Gym_Management.Exceptions;
using Gym_Management.Interfaces;
using Gym_Management.Mappers;
using Gym_Management.Models;
using Gym_Management.Models.DTOs;
using System.Linq.Expressions;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Model;

namespace Gym_Management.Services
{
    public class UserService : IUserAdminService
    {
        private readonly IRepository<int, User> _usersRepository;
        private readonly IRepository<int, Member> _membersRepository;

        public UserService(IRepository<int, User> usersRepository, IRepository<int, Member> membersRepository)
        {
            _usersRepository = usersRepository;
            _membersRepository = membersRepository;
        }

        public async Task<LoginUserDTO> LoginUser(LoginUserDTO loginUserDTO)
        {
            var allUsers = await _usersRepository.GetAll();
            var foundedUser = allUsers.FirstOrDefault(user => user.UserName == loginUserDTO.UserName);
            if (foundedUser == null)
            {
                throw new UserNameNotFoundException($"UserName {loginUserDTO.UserName} not found");
            }
            if(foundedUser.Password != loginUserDTO.Password)
            {
                throw new PasswordMismatchException("Incorrect Password Entered");  
            }
            return loginUserDTO;

        }
    }
}
