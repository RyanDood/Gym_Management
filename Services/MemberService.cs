using Gym_Management.Exceptions;
using Gym_Management.Interfaces;
using Gym_Management.Mappers;
using Gym_Management.Models;
using Gym_Management.Models.DTOs;
using Microsoft.Identity.Client;

namespace Gym_Management.Services
{
    public class MemberService : IMemberAdminService
    {
        private readonly IRepository<int, User> _usersRepository;
        private readonly IRepository<int, Member> _membersRepository;

        public MemberService(IRepository<int, User> usersRepository, IRepository<int, Member> membersRepository)
        {
            _usersRepository = usersRepository;
            _membersRepository = membersRepository;
        }

        public async Task<Member> AddMember(AddNewMemberDTO addNewMemberDTO)
        {
            User user = new ConvertToUser(addNewMemberDTO).GetUser();
            user.isAdmin = true;
            Member member = new ConvertToMember(addNewMemberDTO).GetMember();
            var addedUser = await _usersRepository.Add(user);
            var userID = addedUser.UserID;
            member.UserID = userID;
            var addedMember = await _membersRepository.Add(member);
            return addedMember;
        }

        public async Task<Member> AddMemberUser(AddNewMemberDTO addNewMemberDTO)
        {
            User user = new ConvertToUser(addNewMemberDTO).GetUser();
            user.isAdmin = false;
            Member member = new ConvertToMember(addNewMemberDTO).GetMember();
            var addedUser = await _usersRepository.Add(user);
            var userID = addedUser.UserID;
            member.UserID = userID;
            var addedMember = await _membersRepository.Add(member);
            return addedMember;
        }

        public async Task<Member> DeleteMember(int id)
        {
            var deletedMember = await _membersRepository.Delete(id);
            if (deletedMember == null)
            {
                throw new MemberNotFoundException($"Member ID {id} not found");
            }
            await _usersRepository.Delete(deletedMember.UserID);
            return deletedMember;
        }

        public async  Task<List<Member>> GetAllMembers()
        {
            var allMembers = await _membersRepository.GetAll();
            if (allMembers == null)
            {
                throw new MemberNotFoundException("No Available Members Data");
            }
            return allMembers;
        }

        public async Task<Member> GetMember(int id)
        {
            var foundedMember = await _membersRepository.Get(id);
            if (foundedMember == null)
            {
                throw new MemberNotFoundException($"Member ID {id} not found");
            }
            return foundedMember;
        }

        public async Task<Member> UpdateMember(UpdateMemberDTO updateMemberDTO)
        {
            var foundedMember = await GetMember(updateMemberDTO.MemberID);
            foundedMember.Name = updateMemberDTO.Name;
            foundedMember.Phone = updateMemberDTO.Phone;
            var updatedMember = await _membersRepository.Update(foundedMember);
            return foundedMember;
        }
    }
}
