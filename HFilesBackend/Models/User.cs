using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Configuration;
using Microsoft.AspNetCore.Identity;
using Microsoft.DotNet.Scaffolding.Shared.Messaging;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace HFilesBackend.Models;

[Index(nameof(Email), IsUnique = true)]
public class User
{
    [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int UserId { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    [Required]
    public string Gender { get; set; }
    [Required]
    [Phone]
    public string PhoneNo { get; set; }
    [Required]
    public string PasswordHash { get; set; }
    public string? AvatarUrl { get; set; }

    public ICollection<Document> Documents { get; set; }
}

public class UserSignupModel
{
    [Required]
    public string Name { get; set; }
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    [Required]
    public string Gender { get; set; }
    [Required]
    [Phone]
    public string PhoneNo { get; set; }
    [Required]
    [StringLength(20, MinimumLength = 8, ErrorMessage = "Password must be 8-20 characters long")]
    public string Password { get; set; }
}

public class UserLoginModel
{
    [Required]
    public string Email { get; set; }
    [Required]
    [StringLength(20, MinimumLength = 8, ErrorMessage = "Password must be 8-20 characters long")]
    public string Password { get; set; }
}

public class UserUpdateModel
{
    [EmailAddress]
    public string? Email { get; set; }
    public string? Gender { get; set; }
    [Phone]
    public string? PhoneNo { get; set; }
    public string? AvatarUrl { get; set; }
}

public class UserGetDto
{
    public int UserId { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Gender { get; set; }
    public string PhoneNo { get; set; }
    public string? AvatarUrl { get; set; }
}
public class UserGetFilesDto
{
    public int UserId { get; set; }
    public ICollection<Document> Documents { get; set; }
}