using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend_egov.Models
{
    public class PaymentHistory
    {
        [Key]
        public int Id { get; set; }
        public int BillId { get; set; }
        public DateOnly PaymentDate { get; set; }
        [Column(TypeName = "decimal(10,2)")]
        public decimal AmountPaid { get; set; }
        [ForeignKey("BillId")]
        public BillModel? Bill { get; set; }
    }
}
