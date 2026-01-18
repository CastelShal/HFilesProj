using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HFilesBackend.Models;

namespace HFilesBackend.Controllers
{
    [Route("user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserContext _context;

        public UserController(UserContext context)
        {
            _context = context;
        }

        // GET: api/User/5
        [Authorize]
        [HttpGet()]
        public async Task<ActionResult<UserGetDto>> GetUser()
        {
            var user = await GetUserDetails();
            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [Authorize]
        [HttpGet("files")]
        public async Task<ActionResult<UserGetFilesDto>> GetUserWithFiles()
        {
            var user = await GetUserFiles();
            if (user == null)
            {
                return NotFound();
            }

            return user;
        }


        [HttpPut()]
        public async Task<IActionResult> PutUser([FromBody] UserUpdateModel userDetails)
        {
            User? user = await ExtractUserFromCookie();
            if (user == null)
            {
                return Unauthorized();
            }

            user.Email = userDetails.Email ?? user.Email;
            user.Gender = userDetails.Gender ?? user.Gender;
            user.PhoneNo = userDetails.PhoneNo ?? user.PhoneNo;
            user.AvatarUrl = userDetails.AvatarUrl ?? user.AvatarUrl;
            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<UserGetDto>> PostUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.UserId }, user);
        }
        private async Task<User> ExtractUserFromCookie()
        {
            var uid = int.Parse(
                HttpContext.User.Claims.First(
                claim => claim.Type == ClaimTypes.PrimarySid)
                .Value
        );
            var user = await _context.Users.Include(u => u.Documents).FirstAsync(u => u.UserId == uid);
            return user;
        }
        private async Task<UserGetDto?> GetUserDetails()
        {
            var user = await ExtractUserFromCookie();
            return new UserGetDto
            {
                UserId = user.UserId,
                Name = user.Name,
                Email = user.Email,
                Gender = user.Gender,
                PhoneNo = user.PhoneNo,
                AvatarUrl = user.AvatarUrl
            };
        }
        private async Task<UserGetFilesDto?> GetUserFiles()
        {
            var user = await ExtractUserFromCookie();
            return new UserGetFilesDto
            {
                UserId = user.UserId,
                Documents = user.Documents
            };
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }
    }
}
