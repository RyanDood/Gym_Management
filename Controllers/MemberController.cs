using Gym_Management.Exceptions;
using Gym_Management.Interfaces;
using Gym_Management.Models;
using Gym_Management.Models.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Gym_Management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MemberController : ControllerBase
    {
        private readonly IMemberAdminService _memberService;

        public MemberController(IMemberAdminService memberService)
        {
            _memberService = memberService;
        }

        [Route("GetAllMembers")]
        [HttpGet]
        public async Task<ActionResult<List<Member>>> GetAllMembers()
        {
            try
            {
                return await _memberService.GetAllMembers();
            }
            catch (MemberNotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

        [Route("GetMember")]
        [HttpGet]
        public async Task<ActionResult<Member>> GetMember(int memberID)
        {
            try
            {
                return await _memberService.GetMember(memberID);
            }
            catch (MemberNotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

        [Route("AddMemberAdmin")]
        [HttpPost]
        public async Task<ActionResult<Member>> AddMember(AddNewMemberDTO addNewMemberDTO)
        {
            try
            {
                return await _memberService.AddMember(addNewMemberDTO);
            }
            catch (MemberNotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

        [Route("AddMemberUser")]
        [HttpPost]
        public async Task<ActionResult<Member>> AddMemberUser(AddNewMemberDTO addNewMemberDTO)
        {
            try
            {
                return await _memberService.AddMemberUser(addNewMemberDTO);
            }
            catch (MemberNotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

        [Route("UpdateMember")]
        [HttpPut]
        public async Task<ActionResult<Member>> UpdateMember(UpdateMemberDTO updateMemberDTO)
        {
            try
            {
                return await _memberService.UpdateMember(updateMemberDTO);
            }
            catch (MemberNotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

        [Route("DeleteMember")]
        [HttpDelete]
        public async Task<ActionResult<Member>> DeleteMember(int memberID)
        {
            try
            {
                return await _memberService.DeleteMember(memberID);
            }
            catch (MemberNotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

    }
}
