using Gym_Management.Models;
using Gym_Management.Models.DTOs;

namespace Gym_Management.Mappers
{
    public class ConvertToUser
    {
        User user;

        public ConvertToUser(AddNewMemberDTO addNewMemberDTO)
        {
            user = new User();
            user.UserName = addNewMemberDTO.UserName;
            user.Password = addNewMemberDTO.Password;
            user.Email = addNewMemberDTO.Email;
        }

        public User GetUser()
        {
            return user;
        }
    }
}
