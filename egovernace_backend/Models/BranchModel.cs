using System.ComponentModel.DataAnnotations;
using System.Diagnostics;

namespace backend_egov.Models
{
    public class BranchModel
    {
        [Key]
        public int Id { get; set; }
        public required string Name { get; set; }
    }
}
