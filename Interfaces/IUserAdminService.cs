using Gym_Management.Models;
using Gym_Management.Models.DTOs;

namespace Gym_Management.Interfaces
{
    public interface IUserAdminService
    {
        public Task<List<User>> GetAllUsers();
        public Task<User> GetUser(int id);
        public Task<User> DeleteUser(int id);
    }
}
