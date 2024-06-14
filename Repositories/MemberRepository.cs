using Gym_Management.Context;
using Gym_Management.Interfaces;
using Gym_Management.Models;
using Microsoft.EntityFrameworkCore;

namespace Gym_Management.Repositories
{
    public class MemberRepository : IRepository<int, Member>
    {
        private readonly GymManagementContext _gymManagementContext;
        private readonly ILogger<MemberRepository> _loggerMemberRepository;

        public MemberRepository(GymManagementContext gymManagementContext, ILogger<MemberRepository> loggerMemberRepository)
        {
            _gymManagementContext = gymManagementContext;
            _loggerMemberRepository = loggerMemberRepository;
        }

        public async Task<Member> Add(Member item)
        {
            _gymManagementContext.Members.Add(item);
            await _gymManagementContext.SaveChangesAsync();
            _loggerMemberRepository.LogInformation($"Added New Member : {item.Name}");
            return item;
        }

        public async Task<Member?> Delete(int key)
        {
            var foundedMember = await Get(key);
            if (foundedMember == null)
            {
                _loggerMemberRepository.LogInformation($"Member Not Found");
                return null;
            }
            else
            {
                _gymManagementContext.Members.Remove(foundedMember);
                await _gymManagementContext.SaveChangesAsync();
                _loggerMemberRepository.LogInformation($"Member Deleted : {foundedMember.Name}");
                return foundedMember;
            }
        }

        public async Task<Member?> Get(int key)
        {
            var foundedMember = await _gymManagementContext.Members.FirstOrDefaultAsync(user => user.UserID == key);
            if (foundedMember == null)
            {
                _loggerMemberRepository.LogInformation($"Member Not Found");
                return null;
            }
            else
            {
                _loggerMemberRepository.LogInformation($"Found Member : {foundedMember.Name}");
                return foundedMember;
            }
        }

        public async Task<List<Member>?> GetAll()
        {
            var allMembers = await _gymManagementContext.Members.ToListAsync();
            if (allMembers.Count == 0)
            {
                _loggerMemberRepository.LogInformation("No Members Returned");
                return null;
            }
            else
            {
                _loggerMemberRepository.LogInformation("All Members Returned");
                return allMembers;
            }
        }

        public async Task<Member> Update(Member item)
        {
            _gymManagementContext.Entry<Member>(item).State = EntityState.Modified;
            await _gymManagementContext.SaveChangesAsync();
            _loggerMemberRepository.LogInformation($"Updated Member : {item.Name}");
            return item;
        }
    }
}
