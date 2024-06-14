using Gym_Management.Context;
using Gym_Management.Interfaces;
using Gym_Management.Models;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Model;

namespace Gym_Management.Repositories
{
    public class UserRepository : IRepository<int, User>
    {
        private readonly GymManagementContext _gymManagementContext;
        private readonly ILogger<UserRepository> _loggerUserRepository;

        public UserRepository(GymManagementContext gymManagementContext, ILogger<UserRepository> loggerUserRepository)
        {
            _gymManagementContext = gymManagementContext;
            _loggerUserRepository = loggerUserRepository;
        }

        public async Task<User> Add(User item)
        {
            _gymManagementContext.Users.Add(item);
            await _gymManagementContext.SaveChangesAsync();
            _loggerUserRepository.LogInformation($"Added New User : {item.Email}");
            return item;
        }

        public async Task<User?> Delete(int key)
        {
            var foundedUser = await Get(key);
            if (foundedUser == null)
            {
                _loggerUserRepository.LogInformation($"User Not Found");
                return null;
            }
            else
            {
                _gymManagementContext.Users.Remove(foundedUser);
                await _gymManagementContext.SaveChangesAsync();
                _loggerUserRepository.LogInformation($"User Deleted : {foundedUser.Email}");
                return foundedUser;
            }
        }

        public async Task<User?> Get(int key)
        {
            var foundedUser = await _gymManagementContext.Users.FirstOrDefaultAsync(user => user.UserID == key);
            if (foundedUser == null)
            {
                _loggerUserRepository.LogInformation($"User Not Found");
                return null;
            }
            else
            {
                _loggerUserRepository.LogInformation($"Founded User : {foundedUser.Email}");
                return foundedUser;
            }
        }

        public async Task<List<User>?> GetAll()
        {
            var allUsers = await _gymManagementContext.Users.ToListAsync();
            if (allUsers.Count == 0)
            {
                _loggerUserRepository.LogInformation("No Users Returned");
                return null;
            }
            else
            {
                _loggerUserRepository.LogInformation("All Users Returned");
                return allUsers;
            }
        }

        public async Task<User> Update(User item)
        {
            _gymManagementContext.Entry<User>(item).State = EntityState.Modified;
            await _gymManagementContext.SaveChangesAsync();
            _loggerUserRepository.LogInformation($"Updated User : {item.Email}");
            return item;
        }
    }
}
