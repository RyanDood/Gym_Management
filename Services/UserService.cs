using Gym_Management.Exceptions;
using Gym_Management.Interfaces;
using Gym_Management.Mappers;
using Gym_Management.Models;
using Gym_Management.Models.DTOs;
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

        public Task<User> AddMember(AddNewMemberDTO addNewMemberDTO)
        {
            throw new NotImplementedException();
        }

        public Task<User> DeleteUser(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<User>> GetAllUsers()
        {
            throw new NotImplementedException();
        }

        public Task<User> GetUser(int id)
        {
            throw new NotImplementedException();
        }
    }
}
