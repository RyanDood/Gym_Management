using Gym_Management.Models;
using Gym_Management.Models.DTOs;

namespace Gym_Management.Interfaces
{
    public interface IMemberUserService
    {
        public Task<Member> GetMember(int id);
        public Task<Member> UpdateMember(UpdateMemberDTO updateMemberDTO);
    }
}
