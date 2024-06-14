using Gym_Management.Models;
using Gym_Management.Models.DTOs;

namespace Gym_Management.Mappers
{
    public class ConvertToMember
    {
        Member member;
        public ConvertToMember(AddNewMemberDTO addNewMemberDTO)
        {
            member = new Member();
            member.Name = addNewMemberDTO.Name;
            member.Phone = addNewMemberDTO.Phone;
        }

        public Member GetMember()
        {
            return member;
        }
    }
}
