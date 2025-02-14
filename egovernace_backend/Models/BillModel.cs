using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend_egov.Models
{
    public class BillModel
    {
        [Key]
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public DateOnly IssueDate { get; set; } = new DateOnly(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day);
        public DateOnly DueDate { get; set; }
        public int UnitsConsumed { get; set; } 
        [Column(TypeName = "decimal(10,2)")]
        public decimal Fine { get; set; }
        [Column(TypeName = "decimal(10,2)")]
        public decimal Discount { get; set; }
        public string Status { get; set; } = "Pending";
        [ForeignKey("CustomerId")]
        public  CustomerModel? Customer { get; set; }
        [Column(TypeName = "decimal(10,2)")]
        public decimal TotalAmount { get; set; }
        //totalamt = unitsconsumed * rate
    }
}
