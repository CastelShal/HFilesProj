using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Diagnostics;
using Microsoft.EntityFrameworkCore;
using NuGet.Versioning;
using HFilesBackend.Models;
using System.IO;
using System.ComponentModel.DataAnnotations;

namespace HFilesBackend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("file_upload")]
    public class FileController : ControllerBase
    {
        // GET: FileController
        private string[] AllowedExtensions = [".pdf", ".jpg", ".jpeg", ".png", ".webp"];
        private readonly string uploadDir;
        private readonly IHostEnvironment _env;
        private readonly UserContext _userCtx;
        public FileController(IHostEnvironment env, UserContext userContext)
        {
            _env = env;
            _userCtx = userContext;
            uploadDir = Path.Combine(_env.ContentRootPath, "uploads");
        }

        [HttpPost]
        public async Task<ActionResult> Index([FromForm] DocumentUploadModel documentUpload)
        {
            if (validateFile(documentUpload.Document))
            {
                User user = ExtractUserFromCookie();
                if (user == null)
                {
                    return Unauthorized();
                }

                string uniqueFileName = GetUniqueFileName(documentUpload.Document.FileName);
                if (!Directory.Exists(uploadDir))
                {
                    Directory.CreateDirectory(uploadDir);
                }
                var filePath = Path.Combine(uploadDir, uniqueFileName);
                var fileStream = new FileStream(filePath, FileMode.Create);
                await documentUpload.Document.CopyToAsync(fileStream);
                fileStream.Close();

                var doc = new Document();
                doc.DocumentName = documentUpload.DocumentName;
                doc.DocumentPath = uniqueFileName;
                doc.DocumentType = documentUpload.DocumentType;

                user.Documents.Add(doc);
                await _userCtx.SaveChangesAsync();
                return Created("", new { message = "Document uploaded successfully", documentId = doc.DocumentId, documentName = doc.DocumentName });
            }
            else
            {
                return UnprocessableEntity();
            }
        }


        [HttpDelete("{documentId}")]
        public async Task<ActionResult> Delete(int documentId)
        {
            User user = ExtractUserFromCookie();
            if (user == null)
            {
            return Unauthorized();
            }

            var fileRef = user.Documents.FirstOrDefault(doc => doc.DocumentId == documentId);
            if (fileRef != null)
            {
                var filePath = Path.Combine(uploadDir, fileRef.DocumentPath);
                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                    user.Documents.Remove(fileRef);
                    await _userCtx.SaveChangesAsync();
                }
            }
            return Ok();
        }
        private string GetUniqueFileName(string fileName)
        {
            fileName = Path.GetFileName(fileName);
            return Path.GetFileNameWithoutExtension(fileName)
                   + "_"
                   + Guid.NewGuid().ToString().Substring(0, 4)
                   + Path.GetExtension(fileName);
        }

        private bool validateFile(IFormFile File)
        {
            Console.WriteLine(Path.GetExtension(File.FileName));
            return AllowedExtensions.Contains(Path.GetExtension(File.FileName));
        }
        private User ExtractUserFromCookie()
        {
            var uid = int.Parse(
                HttpContext.User.Claims.First(
                claim => claim.Type == ClaimTypes.PrimarySid)
                .Value
        );
            var user = _userCtx.Users.Include(u => u.Documents).First(u => u.UserId == uid);
            return user;
        }
    }
}
