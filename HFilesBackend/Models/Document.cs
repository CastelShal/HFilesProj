using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace HFilesBackend.Models;

public class Document
{
    [Key]
    public int DocumentId { get; set; }
    [Required]
    public string DocumentName { get; set; }
    [Required]
    public string DocumentType { get; set; }
    [Required]
    public string DocumentPath { get; set; }
    [Newtonsoft.Json.JsonIgnore]
    [System.Text.Json.Serialization.JsonIgnore]
    public User User { get; set; }
}

public class DocumentUploadModel
{
    [Required]
    public string DocumentName { get; set; }
    [Required]
    public string DocumentType { get; set; }
    public IFormFile Document { get; set; }
}
