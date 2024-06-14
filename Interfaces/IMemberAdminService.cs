using Gym_Management.Models;
using Gym_Management.Models.DTOs;

namespace Gym_Management.Interfaces
{
    public interface IMemberAdminService:IMemberUserService
    {
        public Task<List<Member>> GetAllMembers();
        public Task<Member> AddMember(AddNewMemberDTO addNewMemberDTO);
        public Task<Member> DeleteMember(int id);
    }
}
