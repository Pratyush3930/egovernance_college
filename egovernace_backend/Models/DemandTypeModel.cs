using System.ComponentModel.DataAnnotations;

namespace backend_egov.Models
{
    public class DemandTypeModel
    {
        [Key]
        public int Id { get; set; }
        public required string Type { get; set; }
    }
}
