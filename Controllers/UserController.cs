using Gym_Management.Exceptions;
using Gym_Management.Models.DTOs;
using Gym_Management.Models;
using Gym_Management.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Gym_Management.Interfaces;

namespace Gym_Management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly IUserAdminService _userService;

        public UserController(IUserAdminService userService)
        {
            _userService = userService;
        }

        [Route("Login")]
        [HttpPost]
        public async Task<ActionResult<LoginUserDTO>> Login(LoginUserDTO loginUserDTO)
        {
            try
            {
                return await _userService.LoginUser(loginUserDTO);
            }
            catch (UserNameNotFoundException e)
            {
                return NotFound(e.Message);
            }
            catch (PasswordMismatchException e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
