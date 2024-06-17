using Gym_Management.Models;
using Gym_Management.Models.DTOs;

namespace Gym_Management.Interfaces
{
    public interface IUserAdminService
    {
        public Task<LoginSucessDTO> LoginUser(LoginUserDTO loginUserDTO);
    }
}
