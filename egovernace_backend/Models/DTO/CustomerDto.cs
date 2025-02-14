using System.Text.Json.Serialization;

namespace egovernace_backend.Models.DTO
{
    public class CustomerDto
    {
        public required string Name { get; set; }
        public required string UserName { get; set; }
        public required string Password { get; set; }
        public required string Contact { get; set; }
        public required string Address { get; set; }
        public required string BranchName { get; set; }  // Sent as a string
        public required string DemandTypeName { get; set; } // Sent as a string
    }

}
