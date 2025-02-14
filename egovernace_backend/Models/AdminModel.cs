using System.ComponentModel.DataAnnotations;

namespace backend_egov.Models
{
    public class AdminModel
    {
        [Key]
        public int Id { get; set; }
        public required string Username { get; set; }
        public required string Password { get; set; }
    }
}
