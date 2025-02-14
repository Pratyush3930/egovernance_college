using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend_egov.Models
{
    public class RateModel
    {
        [Key]
        public int Id { get; set; }
        public int DemandTypeModelId { get; set; }
        [Column(TypeName = "decimal(10,2)")]
        public decimal RatePerUnit { get; set; }
        [ForeignKey("DemandTypeModelId")]
        public virtual DemandTypeModel? DemandTypeModel { get; set; }  //virtual to support lazy loading 
    }
}
