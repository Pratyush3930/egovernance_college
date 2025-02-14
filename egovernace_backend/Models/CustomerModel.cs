using System.ComponentModel.DataAnnotations;

namespace backend_egov.Models
{
    public class CustomerModel
    {
        [Key]
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string UserName { get; set; }
        public required string Password { get; set; }
        public required string Contact { get; set; }
        public required string Address { get; set; }
        public int BranchId { get; set; }
        //If the foreign key follows EF’s naming convention (NavigationPropertyName + Id), you don’t need the [ForeignKey] attribute at all.
        public  BranchModel? Branch { get; set; }
        public int DemandTypeId { get; set; }
        public  DemandTypeModel? DemandType { get; set; }
    }
}
