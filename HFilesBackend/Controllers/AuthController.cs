using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MySql.Data.MySqlClient;
using Org.BouncyCastle.Bcpg;
using HFilesBackend.Lib;
using HFilesBackend.Models;

namespace HFilesBackend.Controllers
{
    [Route("auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserContext _context;
        private readonly IPasswordHelper _hasher;

        public AuthController(UserContext context, IPasswordHelper helper)
        {
            _context = context;
            _hasher = helper;
        }

        [HttpGet("logout")]
        public async Task<ActionResult<string>> Logout()
        {
            await HttpContext.SignOutAsync();
            return Ok();
        }

        [HttpPost("login")]
        public async Task<ActionResult<User>> Login([FromBody] UserLoginModel LoginData)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == LoginData.Email);
            if (user == null)
            {
                return Unauthorized();
            }
            if (_hasher.VerifyPassword(user, user.PasswordHash, LoginData.Password))
            {
                SetCookies(user.UserId);
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost("signup")]
        public async Task<ActionResult<User>> SignUp([FromBody] UserSignupModel UserData)
        {
            var user = new User();
            user.Name = UserData.Name;
            user.Email = UserData.Email;
            user.Gender = UserData.Gender;
            user.PhoneNo = UserData.PhoneNo;
            user.PasswordHash = _hasher.HashPassword(user, UserData.Password);

            try
            {
                await _context.AddAsync(user);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                return BadRequest(new {errorType = "DUPLICATE_EMAIL"});
            }
            SetCookies(user.UserId);
            return Created("/", UserData);
        }

        private void SetCookies(int uid)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.PrimarySid, uid.ToString())
            };
            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            var principal = new ClaimsPrincipal(claimsIdentity);
            HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);
        }
    }
}